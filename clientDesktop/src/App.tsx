import { Routes, Route } from "react-router-dom";
import Index from "./views/index";
import Signup from "./views/signup";
import Login from "./views/login";
function App() {
  return (
    <>
      {" "}
      <div className="App text-white">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
