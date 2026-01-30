import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClubDashboard from "./pages/ClubDashboard";
// Existing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import UserDashboard from "./pages/UserDashboard";
import EventAIChatbot from "./pages/EventAiChatbot";

import ClubLogin from "./pages/ClubLogin";
import ClubSignup from "./pages/ClubSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import ForgotPasswordFlow from "./pages/ForgotPassword";
import PostEvent from "./pages/PostEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* User Routes */}
        
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/profile" element={<UserDashboard />} />
        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clubs" element={<Clubs />} />

        {/* Club Routes */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club-signup" element={<ClubSignup />} />
        <Route path="/post-event" element={<PostEvent />} />
        <Route path="/club-dashboard" element={<ClubDashboard />} />


      </Routes>
      <EventAIChatbot/>
    </BrowserRouter>
  );
}

export default App;
