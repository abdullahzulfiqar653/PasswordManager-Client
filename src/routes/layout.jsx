import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import AuthNavbar from "../components/AuthNavbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";
import GeneratePassword from "../components/GeneratePassword";

const Layout = () => {
  const {
    isAuthenticated,
    handleSaveConfirmationModalVisibility,
    handleGeneratePassVisibility,
    showSaveConfirmationModal,
    showGeneratePassModal,
    setGeneratorPassword,
    applyPasswordButton,
  } = useAuth();
  const location = useLocation();
  const noNavbarRoutes = ["/auth/login", "/auth/register"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);
  return (
    <React.Fragment>
      <ToastContainer />
      {showNavbar && (isAuthenticated ? <AuthNavbar /> : <Navbar />)}
      <main>
        <Outlet />
      </main>
      {showSaveConfirmationModal && (
        <ConfirmationModal hideModal={handleSaveConfirmationModalVisibility} />
      )}
      {showGeneratePassModal && (
        <GeneratePassword
          hideModal={handleGeneratePassVisibility}
          setGeneratorPassword={setGeneratorPassword}
          triggerSource={applyPasswordButton}
        />
      )}
    </React.Fragment>
  );
};

export default Layout;
