import "./App.css";
import ListingContainer from "./components/properties/ListingContainer.jsx";
import Search from "./components/search/Search.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewListingForm from "./components/NewListing/NewListingForm.jsx";
import ListingDetails from "./components/properties/ListingDetails.jsx";
import Update from "./components/properties/Update.jsx";
import NewListing from "./components/NewListing/NewListing.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import Home from "./components/home/Home.jsx";


function App() {
  return (
    <div className="">
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<ListingContainer />} />
          <Route path="/update" element={<Update />} />
          <Route path="/details" element={<ListingDetails />} />
          <Route path="/new" element={<NewListing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
