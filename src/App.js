import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUpComp from "./pages/SignUpComp";
import SignUpCompcopy from "./pages/SignUpCompcopy";
import SignUpUser from "./pages/SignUpUser";
import Company from "./pages/Company";
import Users from "./pages/Users";
import UsersActions from "./actions/UsersActions";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signupcomp" element={<SignUpComp />} />
          <Route path="/signupcompcopy" element={<SignUpCompcopy />} />
          <Route path="/signupuser" element={<SignUpUser />} />
          <Route path="/company" element={<Company />} />
          <Route path="/users" element={<Users />} />
          <Route path="/action" element={<UsersActions />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
