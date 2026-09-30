import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import App from "./App.jsx";
import LandingPage from "./components/pages/LandingPage.jsx";
import PrivacyPolicyPage from "./components/pages/PrivacyPolicyPage.jsx";
import GuidePage from "./components/pages/GuidePage.jsx";
import FaqPage from "./components/pages/FaqPage.jsx";
import SamplePlansPage from "./components/pages/SamplePlansPage.jsx";
import BlogIndexPage from "./components/pages/BlogIndexPage.jsx";
import BlogPostPage from "./components/pages/BlogPostPage.jsx";
import PlanTemplatesIndexPage from "./components/pages/PlanTemplatesIndexPage.jsx";
import PlanTemplatePage from "./components/pages/PlanTemplatePage.jsx";
import OneRmCalculatorPage from "./components/pages/OneRmCalculatorPage.jsx";
import RestTimerPage from "./components/pages/RestTimerPage.jsx";
import VolumeCalculatorPage from "./components/pages/VolumeCalculatorPage.jsx";
import GearPage from "./components/pages/GearPage.jsx";
import BmiCalculatorPage from "./components/pages/BmiCalculatorPage.jsx";
import CalorieCalculatorPage from "./components/pages/CalorieCalculatorPage.jsx";
import { trackPageView } from "./analytics.js";

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

export default function Router() {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/sample-plans" element={<SamplePlansPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/plans" element={<PlanTemplatesIndexPage />} />
        <Route path="/plans/:slug" element={<PlanTemplatePage />} />
        <Route path="/gear" element={<GearPage />} />
        <Route path="/tools/bmi-calculator" element={<BmiCalculatorPage />} />
        <Route path="/tools/calorie-calculator" element={<CalorieCalculatorPage />} />
        <Route path="/tools/1rm-calculator" element={<OneRmCalculatorPage />} />
        <Route path="/tools/rest-timer" element={<RestTimerPage />} />
        <Route path="/tools/volume-calculator" element={<VolumeCalculatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
