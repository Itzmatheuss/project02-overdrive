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
import EditUser from "./pages/EditUser";
import EditCompany from "./pages/EditCompany";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signupcomp" element={<SignUpComp />} />
          <Route path="/signupuser" element={<SignUpUser />} />
          <Route path="/company" element={<Company />} />
          <Route path="/company/editcompany/:id" element={<EditCompany />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edituser/:id" element={<EditUser />} />
          <Route path="/action" element={<UsersActions />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
