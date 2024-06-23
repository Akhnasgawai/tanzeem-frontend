import { LogOutIcon } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LogoutModal from "../modal/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const NavbarView = ({ collapseState }) => {
  const location = useLocation();
  const { logout } = useAuth();

  let currentContent = "";

  if (location.pathname === "/membership") {
    currentContent = "Membership";
  } else if (location.pathname === "/all_members") {
    currentContent = "All Members";
  } else if (location.pathname === "/add_members") {
    currentContent = "Add Members";
  } else if (location.pathname === "/all_users") {
    currentContent = "All Users";
  } else if (location.pathname === "/add_users") {
    currentContent = "Add Users";
  } else if (location.pathname === "/pending_members") {
    currentContent = "Pending Members";
  } else if (location.pathname === "/suspended_members") {
    currentContent = "Suspended Members";
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
    toast.warning("You have been logged out!", {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      hideProgressBar: false,
      theme: "colored",
      containerId: "1",
    });
  };
  return (
    <>
      <StyledNavBar
        className="navbar-container navbar "
        collapsed={collapseState}
      >
        <h2 className="px-3 fw-bold">{currentContent}</h2>
        <Logout
          collapsed={collapseState}
          onClick={handleOpenModal}
          className="pointer"
        >
          <LogOutIcon />
        </Logout>
      </StyledNavBar>

      {isModalOpen && (
        <LogoutModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default NavbarView;

const StyledNavBar = styled.div`
  position: fixed;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  height: 65px;
  width: calc(100% - ${(props) => (props.collapsed ? "4.1rem" : "14rem")});
  align-items: center;
  display: flex;
  justify-content: space-between;
  z-index: 9;
  font-weight: bold;
  font-size: 25px;
`;

const Logout = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;
