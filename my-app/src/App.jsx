import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;