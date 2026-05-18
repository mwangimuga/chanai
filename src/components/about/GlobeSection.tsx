import { useEffect, useRef, useState } from "react";

// Kigali, Rwanda
const KIGALI = { lat: -1.9536, lng: 30.0606 };

const GlobeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [textureReady, setTextureReady] = useState(false);

  // Defer heavy imports until near viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const container = containerRef.current;
    const wrap = canvasWrapRef.current;
    if (!container || !wrap) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [THREE, gsapMod] = await Promise.all([
        import("three"),
        import("@/lib/gsap"),
      ]);
      if (disposed) return;
      const { gsap, ScrollTrigger } = gsapMod;

      const EARTH_R = 2;

      const latLngToVec3 = (lat: number, lng: number, r: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      };

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        38,
        wrap.clientWidth / wrap.clientHeight,
        0.01,
        1000
      );
      camera.position.set(0, 0, 7.2);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      wrap.appendChild(renderer.domElement);

      // Lighting — cinematic key + cool rim
      scene.add(new THREE.AmbientLight(0x4a6db5, 0.45));
      const sun = new THREE.DirectionalLight(0xffffff, 1.4);
      sun.position.set(5, 3, 5);
      scene.add(sun);
      const rim = new THREE.PointLight(0x00aaff, 1.2, 50);
      rim.position.set(-5, -2, -3);
      scene.add(rim);

      // Earth group (so we orbit it under the camera)
      const earthGroup = new THREE.Group();
      scene.add(earthGroup);

      // Sphere — high segments for clean horizon at zoom
      const geo = new THREE.SphereGeometry(EARTH_R, 128, 128);
      const mat = new THREE.MeshPhongMaterial({
        color: 0x0a2548,
        shininess: 18,
        specular: 0x1a3a6a,
      });
      const earth = new THREE.Mesh(geo, mat);
      earthGroup.add(earth);

      // Texture — high res, crossOrigin
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = "anonymous";
      let earthTex: THREE.Texture | null = null;
      loader.load(
        "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_8k.jpg",
        (tex) => {
          if (disposed) {
            tex.dispose();
            return;
          }
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          earthTex = tex;
          mat.map = tex;
          mat.color.set(0xffffff);
          mat.needsUpdate = true;
          setTextureReady(true);
        },
        undefined,
        () => {
          // Fallback to 4k if 8k blocked
          loader.load(
            "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
            (tex2) => {
              if (disposed) {
                tex2.dispose();
                return;
              }
              tex2.colorSpace = THREE.SRGBColorSpace;
              tex2.anisotropy = renderer.capabilities.getMaxAnisotropy();
              earthTex = tex2;
              mat.map = tex2;
              mat.color.set(0xffffff);
              mat.needsUpdate = true;
              setTextureReady(true);
            }
          );
        }
      );

      // Soft atmosphere halo
      const atmoGeo = new THREE.SphereGeometry(EARTH_R * 1.06, 64, 64);
      const atmoMat = new THREE.MeshBasicMaterial({
        color: 0x3aa2ff,
        transparent: true,
        opacity: 0.13,
        side: THREE.BackSide,
      });
      const atmo = new THREE.Mesh(atmoGeo, atmoMat);
      earthGroup.add(atmo);

      // Kigali marker
      const markerPos = latLngToVec3(KIGALI.lat, KIGALI.lng, EARTH_R + 0.005);
      const surfaceNormal = markerPos.clone().normalize();

      const markerGroup = new THREE.Group();
      markerGroup.position.copy(markerPos);
      // Orient marker so +Z points outward from sphere
      markerGroup.lookAt(markerPos.clone().multiplyScalar(2));
      earthGroup.add(markerGroup);

      // Pin dot
      const dotGeo = new THREE.SphereGeometry(0.018, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      markerGroup.add(dot);

      // Pulsing rings (lying on tangent plane)
      const ringGeo = new THREE.RingGeometry(0.025, 0.04, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      markerGroup.add(ring);

      const ring2Mat = ringMat.clone();
      const ring2 = new THREE.Mesh(ringGeo, ring2Mat);
      markerGroup.add(ring2);

      // Vertical beam
      const beamLen = 0.35;
      const beamGeo = new THREE.CylinderGeometry(0.004, 0.004, beamLen, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.65,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      // Orient cylinder along surface normal: cylinder default axis is +Y
      beam.position.copy(surfaceNormal.clone().multiplyScalar(beamLen / 2));
      const up = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, surfaceNormal);
      beam.quaternion.copy(quat);
      markerGroup.add(beam);

      // Stars
      const starGeo = new THREE.BufferGeometry();
      const starCount = 2000;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const r = 60 + Math.random() * 40;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        starPos[i * 3 + 2] = r * Math.cos(phi);
      }
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xbcd4ff,
        size: 0.12,
        transparent: true,
        opacity: 0.85,
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // Initial rotation — show Atlantic / Africa visible
      const startRotY = -Math.PI * 0.4;
      const startRotX = 0;
      earthGroup.rotation.y = startRotY;
      earthGroup.rotation.x = startRotX;

      // ========== Animation state ==========
      let raf = 0;
      let isVisible = true;
      const clock = new THREE.Clock();

      // Compute target rotation that places Kigali at the camera-facing point (0, 0, R)
      // For a point at lat/lng on a sphere rotated by (rotX about X) then (rotY about Y),
      // we want: R(rotY) * R(rotX) * basePos = (0, 0, R).
      // Simpler: pick rotY = -(lng + 180) deg + 90 deg adjustment, rotX = lat (in radians)
      // Derivation matches our latLngToVec3 convention:
      //   base.x = -R sin(phi) cos(theta), base.y = R cos(phi), base.z = R sin(phi) sin(theta)
      // After rotY: we need theta_eff so x'=0, z'=R sin(phi). Then rotX brings y to 0.
      const targetRotY = -((KIGALI.lng + 180) * Math.PI) / 180 + Math.PI / 2;
      const targetRotX = (KIGALI.lat * Math.PI) / 180; // tilt up so latitude faces camera

      // Smoothed values driven by scroll progress (0..1)
      const state = {
        rotY: startRotY,
        rotX: startRotX,
        camZ: 7.2,
        groupX: 0,
        groupY: 0,
        atmoOpacity: 0.13,
      };
      const target = { ...state };

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const animate = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        // Smooth toward targets
        const k = 0.09;
        state.rotY = lerp(state.rotY, target.rotY, k);
        state.rotX = lerp(state.rotX, target.rotX, k);
        state.camZ = lerp(state.camZ, target.camZ, k);
        state.groupX = lerp(state.groupX, target.groupX, k);
        state.groupY = lerp(state.groupY, target.groupY, k);
        state.atmoOpacity = lerp(state.atmoOpacity, target.atmoOpacity, k);

        // Auto-rotate only when fully zoomed out (intro)
        const intro = target.camZ > 6.8 ? 1 : 0;
        earthGroup.rotation.y = state.rotY + (intro ? t * 0.04 : 0);
        earthGroup.rotation.x = state.rotX;
        earthGroup.position.x = state.groupX;
        earthGroup.position.y = state.groupY + (intro ? Math.sin(t * 0.6) * 0.04 : 0);

        camera.position.z = state.camZ;
        camera.lookAt(0, 0, 0);

        atmoMat.opacity = state.atmoOpacity;
        stars.rotation.y += dt * 0.005;

        // Marker pulse (visible from phase 2 onward)
        const pulse1 = (Math.sin(t * 2.2) + 1) * 0.5; // 0..1
        const pulse2 = (Math.sin(t * 2.2 + Math.PI) + 1) * 0.5;
        const showMarker = target.camZ < 6.5 ? 1 : 0;
        ring.scale.setScalar(1 + pulse1 * 1.8);
        ringMat.opacity = (1 - pulse1) * 0.9 * showMarker;
        ring2.scale.setScalar(1 + pulse2 * 2.6);
        ring2Mat.opacity = (1 - pulse2) * 0.7 * showMarker;
        dotMat.opacity = showMarker;
        beamMat.opacity = 0.65 * showMarker;
        markerGroup.visible = showMarker > 0.01;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };

      const startLoop = () => {
        if (!raf) {
          clock.getDelta(); // reset delta
          animate();
        }
      };
      const stopLoop = () => {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };
      startLoop();

      // Pause when off screen
      const visibilityIO = new IntersectionObserver(
        (entries) => {
          isVisible = entries.some((e) => e.isIntersecting);
          if (isVisible) startLoop();
          else stopLoop();
        },
        { rootMargin: "100px 0px" }
      );
      visibilityIO.observe(container);

      const onResize = () => {
        if (!wrap) return;
        camera.aspect = wrap.clientWidth / wrap.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // ========== Scroll choreography ==========
      // 5 phases across the section. Each phase = 20% of scroll progress.
      // P1 (0.00-0.20): Earth wide, slow auto-spin.            cam=7.2
      // P2 (0.20-0.40): Rotate to face Africa, push in.         cam=5.4
      // P3 (0.40-0.60): Africa centered, push to East Africa.   cam=4.0
      // P4 (0.60-0.80): Tilt latitude, zoom over Rwanda.        cam=2.8
      // P5 (0.80-1.00): Final cinematic zoom to Kigali pin.     cam=2.18
      const easeInOut = (x: number) =>
        x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

      const phaseValue = (
        p: number,
        start: number,
        end: number,
        from: number,
        to: number
      ) => {
        if (p <= start) return from;
        if (p >= end) return to;
        const t = easeInOut((p - start) / (end - start));
        return from + (to - from) * t;
      };

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Rotation: stays at start through P1, then transitions across P2-P4 to target
          target.rotY = phaseValue(p, 0.18, 0.78, startRotY, targetRotY);
          target.rotX = phaseValue(p, 0.55, 0.92, 0, targetRotX);

          // Zoom curve through phases
          if (p < 0.2) target.camZ = 7.2;
          else if (p < 0.4) target.camZ = phaseValue(p, 0.2, 0.4, 7.2, 5.4);
          else if (p < 0.6) target.camZ = phaseValue(p, 0.4, 0.6, 5.4, 4.0);
          else if (p < 0.8) target.camZ = phaseValue(p, 0.6, 0.8, 4.0, 2.8);
          else target.camZ = phaseValue(p, 0.8, 1.0, 2.8, 2.18);

          // Atmosphere fades as we get close (would otherwise look like fog)
          target.atmoOpacity = phaseValue(p, 0.6, 0.95, 0.13, 0.04);

          // Slight horizontal nudge so marker sits left of text on final phase
          target.groupX = phaseValue(p, 0.85, 1.0, 0, 0);
        },
      });

      // ========== Phase text (no-overlap) ==========
      // We assign each phase a time window with explicit fade-in / fade-out.
      // Only one phase is visible at any time because windows do not overlap.
      const phases = Array.from(
        container.querySelectorAll<HTMLDivElement>("[data-phase]")
      );
      const phaseTriggers: Array<{ kill: () => void }> = [];
      const PHASE_WINDOWS: Array<[number, number]> = [
        [0.02, 0.18], // P1
        [0.22, 0.38], // P2
        [0.42, 0.58], // P3
        [0.62, 0.78], // P4
        [0.82, 0.98], // P5
      ];

      // Force-hide everything initially
      gsap.set(phases, { opacity: 0, y: 24 });

      phases.forEach((el) => {
        const idx = parseInt(el.dataset.phase || "1", 10) - 1;
        const win = PHASE_WINDOWS[idx];
        if (!win) return;
        const [s, e] = win;
        const st = ScrollTrigger.create({
          trigger: container,
          start: `top+=${s * 100}% top`,
          end: `top+=${e * 100}% top`,
          onEnter: () =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              overwrite: true,
            }),
          onLeave: () =>
            gsap.to(el, {
              opacity: 0,
              y: -24,
              duration: 0.45,
              ease: "power2.in",
              overwrite: true,
            }),
          onEnterBack: () =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(el, {
              opacity: 0,
              y: 24,
              duration: 0.45,
              ease: "power2.in",
              overwrite: true,
            }),
        });
        phaseTriggers.push(st);
      });

      // Refresh once layout settles
      requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanup = () => {
        stopLoop();
        window.removeEventListener("resize", onResize);
        visibilityIO.disconnect();
        trigger.kill();
        phaseTriggers.forEach((t) => t.kill());
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        atmoGeo.dispose();
        atmoMat.dispose();
        dotGeo.dispose();
        dotMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        ring2Mat.dispose();
        beamGeo.dispose();
        beamMat.dispose();
        starGeo.dispose();
        starMat.dispose();
        earthTex?.dispose();
        if (wrap.contains(renderer.domElement))
          wrap.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [shouldLoad]);

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] bg-[hsl(var(--navy-deep))]"
    >
      {/* Pinned cinematic stage */}
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--navy-deep))] via-[hsl(var(--navy))] to-[hsl(var(--navy-deep))]" />
        <div className="absolute inset-0 mesh-bg opacity-40" />

        {/* WebGL canvas */}
        <div ref={canvasWrapRef} className="absolute inset-0" />

        {/* Loading state */}
        {(!shouldLoad || !textureReady) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Rendering Earth
              </p>
            </div>
          </div>
        )}

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,hsl(var(--navy-deep))_95%)]" />

        {/* Phase overlays — each absolutely positioned in the SAME slot, mutually exclusive */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top caption stack */}
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 text-center">
            {/* Phase 1 */}
            <div
              data-phase="1"
              className="absolute inset-x-0 top-0 will-change-transform"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary mb-3">
                Chapter 01 · The Origin
              </p>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-4">
                <span className="text-white">A Story That Begins</span>
                <br />
                <span className="text-electric-gradient">on a Single Hill.</span>
              </h2>
              <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base">
                Scroll to journey from the stars to a small office in Kigali —
                where ChanAI Tech was founded.
              </p>
            </div>

            {/* Phase 2 */}
            <div
              data-phase="2"
              className="absolute inset-x-0 top-0 will-change-transform"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary mb-3">
                Chapter 02 · The Continent
              </p>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-4 text-white">
                Africa.
                <span className="text-electric-gradient"> Rising.</span>
              </h2>
              <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base">
                A continent of 1.4 billion ambitions — and the fastest-growing
                market for technology talent on the planet.
              </p>
            </div>

            {/* Phase 3 */}
            <div
              data-phase="3"
              className="absolute inset-x-0 top-0 will-change-transform"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary mb-3">
                Chapter 03 · East Africa
              </p>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-4 text-white">
                The Region <span className="text-electric-gradient">Building Tomorrow.</span>
              </h2>
              <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base">
                From Nairobi to Dar es Salaam — East Africa is engineering the
                next wave of AI-first companies.
              </p>
            </div>

            {/* Phase 4 */}
            <div
              data-phase="4"
              className="absolute inset-x-0 top-0 will-change-transform"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary mb-3">
                Chapter 04 · Rwanda
              </p>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-4 text-white">
                The Land of <span className="text-electric-gradient">a Thousand Hills.</span>
              </h2>
              <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base">
                Africa's cleanest, safest, and most digitally-ambitious nation —
                and our home.
              </p>
            </div>

            {/* Phase 5 */}
            <div
              data-phase="5"
              className="absolute inset-x-0 top-0 will-change-transform"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary mb-3">
                Chapter 05 · Kigali
              </p>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-4 text-white">
                <span className="text-electric-gradient">ChanAI Tech.</span>
                <br />
                Headquartered Here.
              </h2>
              <p className="text-white/75 max-w-xl mx-auto text-sm md:text-base">
                Kigali, Rwanda. -1.9536° S, 30.0606° E. Where world-class
                AI &amp; QA engineering meets the soul of a continent.
              </p>
            </div>
          </div>

          {/* Bottom HUD — coordinates that update with the journey (purely decorative) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
            <div className="flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.35em] text-white/50">
              <span className="w-8 h-px bg-white/20" />
              <span>Earth → Africa → Rwanda → Kigali</span>
              <span className="w-8 h-px bg-white/20" />
            </div>
          </div>
        </div>

        {/* Scroll cue (intro only) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 animate-float">
          Scroll ↓
        </div>
      </div>
    </section>
  );
};

export default GlobeSection;
