import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const isTokenValid = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] =
    useState(false);
  const [showGeneratePassModal, setShowGeneratePassModal] = useState(false);
  const [applyPasswordButton, setApplyPasswordButton] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [generatorPassword, setGeneratorPassword] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [openPasswordDeleteModal, setOpenPasswordDeleteModal] = useState("");
  const [openConfirmChangesModal, setOpenConfirmChangesModal] = useState("");
  const [openLogoutModal, setOpenLogoutModal] = useState("");
  const [data, setData] = useState("");
  const [selectPasswordsId, setSelectedPasswordsId] = useState([]);
  const [search, setSearch] = useState("");
  const [folderTitle, setFolderTitle] = useState("");
  const [passSelectedFolderId, setPassSelectedFolderId] = useState(() => {
    return localStorage.getItem("FolderId") || "";
  });

  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
    }
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const signup = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  const handleSaveConfirmationModalVisibility = () => {
    setShowSaveConfirmationModal((prev) => !prev);
  };

  const handleGeneratePassVisibility = (source) => {
    setShowGeneratePassModal((prev) => !prev);
    setApplyPasswordButton(source);
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedFolderId(id);
    setOpenDeleteModal((prev) => !prev);
  };

  const handleCreateFolderModal = () => {
    setOpenCreateFolderModal((prev) => !prev);
  };

  const handleOpenPasswordDeleteModal = () => {
    setOpenPasswordDeleteModal((prev) => !prev);
  };

  const handleConfirmLogoutModal = () => {
    setOpenLogoutModal((prev) => !prev);
  };

  const handleConfirmChangesModal = (formData) => {
    setOpenConfirmChangesModal((prev) => !prev);
    setData(formData);
  };

  const handleFolderSelection = (folder) => {
    setPassSelectedFolderId(folder.id); 
    setFolderTitle(folder.title)
    localStorage.setItem("FolderId", folder.id); 
  };

  const clearFolderSelection = () => {
    setPassSelectedFolderId(""); // Clear the state
    localStorage.removeItem("FolderId"); // Remove it from localStorage
  };

  const toggleSelection = (id) => {
    setSelectedPasswordsId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        login,
        search,
        signup,
        logout,
        isDesktop,
        setSearch,
        folderTitle,
        isAuthenticated,
        openDeleteModal,
        setOpenDeleteModal,
        selectedFolderId,
        generatorPassword,
        setGeneratorPassword,
        handleOpenDeleteModal,
        passSelectedFolderId,
        clearFolderSelection,
        handleFolderSelection,
        setPassSelectedFolderId,
        openCreateFolderModal,
        setOpenCreateFolderModal,
        handleCreateFolderModal,
        toggleSelection,
        selectPasswordsId,
        setSelectedPasswordsId,
        openPasswordDeleteModal,
        setOpenPasswordDeleteModal,
        handleOpenPasswordDeleteModal,
        showGeneratePassModal,
        applyPasswordButton,
        openConfirmChangesModal,
        setOpenConfirmChangesModal,
        handleConfirmChangesModal,
        openLogoutModal,
        setOpenLogoutModal,
        handleConfirmLogoutModal,
        showSaveConfirmationModal,
        handleGeneratePassVisibility,
        handleSaveConfirmationModalVisibility,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
