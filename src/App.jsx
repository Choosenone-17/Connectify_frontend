import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import BrandLogin from "./pages/BrandLogin";
import InfluencerLogin from "./pages/InfluencerLogin";
import BrandDashboard from "./pages/BrandDashboard";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import Profile from "./pages/Profile";
import DealPage from "./pages/DealPage";
import Subscription from "./pages/Subscription";
import Analytics from "./pages/Analytics";
import DealsHistory from "./pages/DealsHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import Messages from "./pages/Messages";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

        <Route
          path="/brand-login"
          element={<PageWrapper><BrandLogin /></PageWrapper>}
        />

        <Route
          path="/influencer-login"
          element={<PageWrapper><InfluencerLogin /></PageWrapper>}
        />

        <Route
          path="/subscription"
          element={<PageWrapper><Subscription /></PageWrapper>}
        />

        <Route
          path="/analytics"
          element={<PageWrapper><Analytics /></PageWrapper>}
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />


        <Route
          path="/history"
          element={<PageWrapper><DealsHistory /></PageWrapper>}
        />

        <Route
          path="/brand-dashboard"
          element={
            <ProtectedRoute role="brand">
              <PageWrapper>
                <BrandDashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/influencer-dashboard"
          element={
            <ProtectedRoute role="influencer">
              <PageWrapper>
                <InfluencerDashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Profile />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/deal"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <DealPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;