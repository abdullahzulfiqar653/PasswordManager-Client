import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import { useAuth } from "../AuthContext";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AddPassword from "../pages/dashboard/AddPassword";
import FoldersList from "../pages/dashboard/FoldersList";
import PasswordFolder from "../pages/dashboard/PasswordFolder";

const AppRoutes = () => {
  const { isDesktop } = useAuth();

  return (
    <Routes>
       <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
       
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/dashboard/add"
          element={<ProtectedRoute element={<AddPassword />} />}
        />
        <Route
          path="/dashboard/edit/:id"
          element={<ProtectedRoute element={<AddPassword />} />}
        />
        {isDesktop ? (
          <Route
            path="/dashboard/folders"
            element={<ProtectedRoute element={<Dashboard />} />}
          >
            <Route
              path=":folderId"
              element={<ProtectedRoute element={<PasswordFolder />} />}
            />
          </Route>
        ) : (
          <>
            <Route
              path="/dashboard/folders"
              element={<ProtectedRoute element={<FoldersList />} />}
            />
            <Route
              path="/dashboard/folders/:folderId"
              element={
                <section className="container">
                  <PasswordFolder />
                </section>
              }
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
