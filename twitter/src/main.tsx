import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { GlobalStyle } from "./globalReset.ts";

import App from "./components/feed/App.tsx";
import ReadPost from "./components/readPost/ReadPost.tsx";
import UserProfile from "./components/userProfile/UserProfile.tsx";
import ProtectRoute from "./components/protectedRoutes/ProtectRoutes.tsx";
import Registration from "./components/Registration/Registration.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <App />
            </ProtectRoute>
          }
        />
        <Route
          path="/:username/status/:userId/:postId"
          element={
            <ProtectRoute>
              <ReadPost />
            </ProtectRoute>
          }
        />
        <Route
          path="/:username/:userId/profile"
          element={
            <ProtectRoute>
              <UserProfile />
            </ProtectRoute>
          }
        />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
    <GlobalStyle />
  </StrictMode>
);
