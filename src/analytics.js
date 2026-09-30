/**
 * Minimal GA4 analytics helper.
 * All tracking is anonymous — no user IDs or personal data are sent.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/** Returns true only when gtag is available and we have a Measurement ID. */
function isReady() {
  return typeof window.gtag === "function" && !!MEASUREMENT_ID;
}

/**
 * Track a page view. Call this on every route change.
 * @param {string} path - e.g. "/app" or "/"
 */
export function trackPageView(path) {
  if (!isReady()) return;
  window.gtag("config", MEASUREMENT_ID, {
    page_path: path,
    anonymize_ip: true,
  });
}

/**
 * Track a named event.
 * @param {string} name - e.g. "generate_plan", "apply_plan", "copy_prompt"
 * @param {object} [params] - optional extra params (no PII)
 */
export function trackEvent(name, params = {}) {
  if (!isReady()) return;
  window.gtag("event", name, params);
}
