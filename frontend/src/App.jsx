import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";

import ClubLogin from "./pages/ClubLogin";
import ClubSignup from "./pages/ClubSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clubs" element={<Clubs />} />

        {/* Club Routes */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club-signup" element={<ClubSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
