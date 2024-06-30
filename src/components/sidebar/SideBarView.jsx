import { ArrowLeft, ArrowRight, Settings, UserPlus } from "lucide-react";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  Plus,
  Hourglass,
  User,
  UserCog,
  Contact,
  IndianRupee,
  Ban,
} from "lucide-react";
import Cookies from "js-cookie";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SideBarView = ({ collapseState, setCollapsedState }) => {
  const role = Cookies.get("role");
  const adminMenuItems = [
    { to: "/all_members", icon: <User />, name: "All Members" },
    { to: "/add_members", icon: <Plus />, name: "Add Members" },
    {
      to: "/pending_members",
      icon: <Hourglass />,
      name: "Pending Members",
    },
    {
      to: "/suspended_members",
      icon: <Ban />,
      name: "Suspended Members",
    },
    { to: "/all_users", icon: <Contact />, name: "All Users" },
    { to: "/add_users", icon: <UserPlus />, name: "Add Users" },
    { to: "/membership", icon: <IndianRupee />, name: "Membership" },
  ];

  // Menu items for ordinary user
  const ordinaryMenuItems = [
    { to: "/all_members", icon: <User />, name: "All Members" },
    { to: "/add_members", icon: <Plus />, name: "Add Members" },
    {
      to: "/pending_members",
      icon: <Hourglass />,
      name: "Pending Members",
    },
    {
      to: "/suspended_members",
      icon: <Ban />,
      name: "Suspended Members",
    },

    { to: "/membership", icon: <IndianRupee />, name: "Membership" },
  ];

  const menuItems =
    role === "Administrator" ? adminMenuItems : ordinaryMenuItems;
  // const menuItems = adminMenuItems;
  const handleCollapse = () => {
    setCollapsedState(!collapseState);
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile) {
      setCollapsedState(true);
    }
  }, [isMobile, setCollapsedState]);
  return (
    <>
      <StyledCircle
        left={collapseState ? "43px" : "200px"}
        onClick={handleCollapse}
        className="pointer"
        collapsed={collapseState}
      >
        {collapseState ? <ArrowRight /> : <ArrowLeft />}
      </StyledCircle>
      <SideBar collapsed={collapseState}>
        {!collapseState && <Tanzeem>Tanzeem</Tanzeem>}

        <Image collapsed={collapseState}>
          <img
            src="https://i.ibb.co/2Nj3FSt/Whats-App-Image-2024-01-05-at-2-53-45-PM.jpg"
            alt="logo"
            width={collapseState ? "50px" : "120px"}
          />
        </Image>

        {menuItems.map((item, index) => (
          <OverlayTrigger
            key={index}
            placement="bottom"
            overlay={<Tooltip id={`tooltip-${index}`}>{item.name}</Tooltip>}
          >
            <MenuItem to={item.to} collapsed={collapseState}>
              {collapseState ? (
                item.icon
              ) : (
                <>
                  {item.icon}
                  <span>{item.name}</span>
                </>
              )}
            </MenuItem>
          </OverlayTrigger>
        ))}
        <BottomMenuContainer>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>Change Password</Tooltip>}
          >
            <MenuItem to="/changePassword" collapsed={collapseState}>
              {collapseState ? (
                <Settings />
              ) : (
                <>
                  <Settings />
                  <span>Change Password</span>
                </>
              )}
            </MenuItem>
          </OverlayTrigger>
        </BottomMenuContainer>
      </SideBar>
    </>
  );
};

export default SideBarView;

const SideBar = styled.div`
  width: ${(props) =>
    props.collapsed
      ? "4rem"
      : "14rem"}; /* Adjusted width based on collapsed state */
  box-shadow: 1px 2px 4px rgba(62, 62, 62, 0.5);
  position: sticky;
  bottom: 0;
  top: 0;
  position: fixed;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  color: black;
  justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};
  text-decoration: none;
  transition: background-color 0.3s ease;
  margin: 10px;
  border-radius: 4px;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }

  &.active {
    background-color: var(--primary-color);
    color: white;
    /* font-weight: bold; */
  }
`;
const Tanzeem = styled.h1`
  font-family: var(--tanzeem-font);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => (props.collapsed ? "20px" : "0px")};
`;
const StyledCircle = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: ${(props) => (props.collapsed ? "49px" : "49px")};
  left: ${(props) => props.left || "150px"}; /* Dynamic left property */
  z-index: 99;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const BottomMenuContainer = styled.div`
  position: absolute;
  bottom: 0;
`;
