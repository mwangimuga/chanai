import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores window scroll position on route change.
 * Honors in-page anchors (e.g. /services#ai-agents) by scrolling to the
 * matching element after the new route mounts.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Defer until the new page has rendered so the anchor exists.
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, behavior: "auto" });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
