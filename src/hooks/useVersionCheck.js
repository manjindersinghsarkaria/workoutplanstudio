import { useState, useEffect } from "react";
import { APP_VERSION, getChangesSince } from "@/changelog";

const STORAGE_KEY = "mgc_last_seen_version";

/**
 * Hook to check if the user has seen the latest version.
 * Uses localStorage to persist the last-seen version.
 * Returns: { hasNewVersion, newChanges, markAsSeen }
 */
export function useVersionCheck() {
  const [hasNewVersion, setHasNewVersion] = useState(false);
  const [newChanges, setNewChanges] = useState([]);

  useEffect(() => {
    try {
      const lastSeenVersion = localStorage.getItem(STORAGE_KEY);

      console.log("[useVersionCheck] Current version:", APP_VERSION);
      console.log("[useVersionCheck] Last seen version:", lastSeenVersion);

      if (!lastSeenVersion || lastSeenVersion !== APP_VERSION) {
        const changes = getChangesSince(lastSeenVersion);
        if (changes.length > 0) {
          setHasNewVersion(true);
          setNewChanges(changes);
          console.log("[useVersionCheck] New version detected, changes:", changes.length);
        }
      }
    } catch (err) {
      console.error("[useVersionCheck] Error checking version:", err);
    }
  }, []);

  function markAsSeen() {
    try {
      localStorage.setItem(STORAGE_KEY, APP_VERSION);
      setHasNewVersion(false);
      console.log("[useVersionCheck] Marked version as seen:", APP_VERSION);
    } catch (err) {
      console.error("[useVersionCheck] Error marking version as seen:", err);
    }
  }

  return {
    hasNewVersion,
    newChanges,
    markAsSeen,
    currentVersion: APP_VERSION,
  };
}
