import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "chanai_session_id";

const getSessionId = (): string => {
  if (typeof window === "undefined") return "ssr";
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
};

export const trackPageview = async (path: string) => {
  try {
    await supabase.from("analytics_events").insert({
      event_type: "pageview",
      page_path: path,
      session_id: getSessionId(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
  } catch {
    /* swallow */
  }
};

export const trackClick = async (label: string, path?: string) => {
  try {
    await supabase.from("analytics_events").insert({
      event_type: "click",
      page_path: path ?? window.location.pathname,
      label,
      session_id: getSessionId(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
  } catch {
    /* swallow */
  }
};
