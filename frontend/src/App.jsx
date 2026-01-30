import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// New pages
import Landing from "./pages/Landing";
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
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />

        {/* Club Routes */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club-signup" element={<ClubSignup />} />
        <Route path="/post-event" element={<PostEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
