import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopicDetail from "./pages/TopicDetail";
function App() {
  return (
    <div>
      <BrowserRouter>
      <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh'}}>
      <Navbar/>
      <div style={{ flex: 1}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/topic/:topicId" element={<TopicDetail/>}/>
        </Routes>
      </div>
        <Footer/>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;