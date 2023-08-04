import { Routes, Route } from "react-router-dom";
import Index from "./views/index";
function App() {
  return (
    <>
      {" "}
      <div className="App text-white">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
