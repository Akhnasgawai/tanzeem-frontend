import React, { useState } from "react";
import styled from "styled-components";
import SideBarView from "./components/sidebar/SideBarView";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/main.css";
import NavbarView from "./components/navbarview/NavbarView";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AllMembers from "./pages/allMembers/AllMembers";
import AddMembers from "./pages/addMembers/AddMembers";
import AllUsers from "./pages/allUsers/AllUsers";
import AddUsers from "./pages/addUsers/AddUsers";
import PendingMembers from "./pages/pendingMembers/PendingMembers";
import SuspendMembers from "./pages/suspendMembers/SuspendMembers";
import Membership from "./pages/membership/Membership";
import Signin from "./pages/signin/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminRoute from "./routes/ProtectedRoute";
import UserRoute from "./routes/UserRoute"; // Corrected import path
import ProtectedRoute from "./routes/ProtectedRoute";
import Cookies from "js-cookie";
import ChangePassword from "./pages/changePassword/ChangePassword";

function App() {
  const [collapseState, setCollapsedState] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <ToastContainer containerId="1" />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route
            path="*"
            element={
              <DefaultLayout
                collapseState={collapseState}
                setCollapsedState={setCollapsedState}
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const DefaultLayout = ({ collapseState, setCollapsedState }) => {
  const { user } = useAuth();
  const role = Cookies.get("role");
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <div className="d-flex">
      <SideBarView
        collapseState={collapseState}
        setCollapsedState={setCollapsedState}
      />
      <MainLayout collapsed={collapseState}>
        <NavbarView collapseState={collapseState} />
        <ContentContainer>
          <Routes>
            <Route
              path="/all_members"
              element={<ProtectedRoute element={AllMembers} />}
            />
            <Route
              path="/add_members"
              element={<ProtectedRoute element={AddMembers} />}
            />
            {role === "Administrator" && (
              <>
                <Route
                  path="/all_users"
                  element={<ProtectedRoute element={AllUsers} />}
                />
                <Route
                  path="/add_users"
                  element={<ProtectedRoute element={AddUsers} />}
                />
              </>
            )}

            <Route
              path="/pending_members"
              element={<ProtectedRoute element={PendingMembers} />}
            />
            <Route
              path="/suspended_members"
              element={<ProtectedRoute element={SuspendMembers} />}
            />
            <Route
              path="/membership"
              element={<ProtectedRoute element={Membership} />}
            />

            <Route
              path="/changePassword"
              element={<ProtectedRoute element={ChangePassword} />}
            />

            <Route path="*" element={<Navigate to="/signin" replace />} />

            {/* Add other user routes here */}
            {/* <Route path="/" element={<UserRoute element={AllMembers} />} /> */}
          </Routes>
        </ContentContainer>
      </MainLayout>
    </div>
  );
};

export default App;

const MainLayout = styled.div`
  width: calc(
    100% - ${(props) => (props.collapsed ? "4rem" : "14rem")}
  ); /* Adjusted width based on collapsed state */
  margin-left: ${(props) =>
    props.collapsed
      ? "4rem"
      : "14rem"}; /* Adjusted left margin based on collapsed state */
  position: relative;
`;

const ContentContainer = styled.div`
  /* overflow-y: hidden; */
  height: 100vh;
  /* overflow-x: hidden; */
  padding: 9px;
  margin-top: 80px;
`;
