import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Percentage from "./pages/topics/Percentage";
import ProfitLoss from "./pages/topics/ProfitLoss";
import TimeWork from "./pages/topics/TimeWork";
import SpeedDistance from "./pages/topics/SpeedDistance";
import Ratio from "./pages/topics/Ratio";
import NumberSeries from "./pages/topics/NumberSeries";
import Ages from "./pages/topics/Ages";
import SimpleInterest from "./pages/topics/SimpleInterest";
import Probability from "./pages/topics/Probability";
import Average from "./pages/topics/Average";
function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/topic/percentage" element={<Percentage />} />
              <Route path="/topic/profit-loss" element={<ProfitLoss />} />
              <Route path="/topic/time-work" element={<TimeWork />} />
              <Route path="/topic/speed-distance" element={<SpeedDistance />} />
              <Route path="/topic/ratio" element={<Ratio />} />
              <Route path="/topic/number-series" element={<NumberSeries />} />
              <Route path="/topic/ages" element={<Ages />} />
              <Route path="/topic/simple-interest" element={<SimpleInterest />} />
              <Route path="/topic/probability" element={<Probability />} />
              <Route path="/topic/average" element={<Average />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;