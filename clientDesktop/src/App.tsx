import { Routes, Route } from "react-router-dom";
import Index from "./views/index";
import Profile from "./views/profile";
import Signup from "./views/signup";
import Login from "./views/login";
import UserPage from "./views/userPage";
import PostThread from "./views/postThread";
function App() {
  return (
    <>
      {" "}
      <div className="App text-white">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postThread" element={<PostThread />} />
          <Route path="/user">
            <Route path=":username" element={<UserPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
