import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddEditTour from "./pages/AddEditTour";
import { gapi } from "gapi-script";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";


gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: "728527815522-gl8ksiegj2k6mb8bpv30i9mi4nd66q8j.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addTour" element={<AddEditTour />} />
          <Route path="/editTour/:id" element={<AddEditTour />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
