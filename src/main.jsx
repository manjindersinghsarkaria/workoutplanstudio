import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Unregister all old service workers first (one-time cleanup)
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length > 0) {
        console.log('[SW] Cleaning up old service workers');
        registrations.forEach((registration) => {
          registration.unregister();
        });
      }
    });

    // Register new service worker with cache buster
    const swUrl = `/sw.js?v=${Date.now()}`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("[SW] Service Worker registered successfully");
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch((error) => {
        console.error("[SW] Service Worker registration failed:", error);
      });
  });
}
