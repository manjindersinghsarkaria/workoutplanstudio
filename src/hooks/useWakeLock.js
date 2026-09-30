import { useEffect, useRef } from "react";

/**
 * Acquires a Screen Wake Lock while `active` is true.
 * Automatically re-acquires if the page becomes visible again after being hidden
 * (e.g. user switches apps and comes back).
 * Silently no-ops on browsers that don't support the API.
 */
export function useWakeLock(active) {
  const lockRef = useRef(null);

  async function acquire() {
    if (!("wakeLock" in navigator)) return;
    try {
      lockRef.current = await navigator.wakeLock.request("screen");
    } catch {
      // Permission denied or not supported — ignore
    }
  }

  function release() {
    lockRef.current?.release();
    lockRef.current = null;
  }

  useEffect(() => {
    if (!active) { release(); return; }

    acquire();

    // Re-acquire after the page becomes visible again (wake lock is lost on hide)
    function onVisibilityChange() {
      if (document.visibilityState === "visible" && active) acquire();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      release();
    };
  }, [active]);
}
