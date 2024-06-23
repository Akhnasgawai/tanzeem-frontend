import React, { useState } from "react";
import Input from "../../components/input/Input";
import styled from "styled-components";
import Button from "../../components/button/Button";
import SelectField from "../../components/selectField/SelectField";
import UserTypes from "../../data/userTypes";
import axios from "axios";
import Bubbles from "react-loading";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [signinCredentials, setSigninCredentials] = useState({
    email: "",
    password: "",
    group: UserTypes[1].value,
  });
  const [signinAnimation, setSigninAnimation] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setSigninAnimation(false);
    const { name, value } = e.target;
    setSigninCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setSigninAnimation(false);
    setSigninCredentials((prevCredentials) => ({
      ...prevCredentials,
      group: selectedOption.value,
    }));
  };

  const areAllValuesFilled = () => {
    if (signinCredentials.email !== "" && signinCredentials.password !== "")
      return true;
    else if (signinCredentials.email === "") {
      toast.error("Please Enter the Email!", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar: false,
        theme: "colored",
        containerId: "1",
      });
    } else if (signinCredentials.password === "") {
      toast.error("Please Enter the Password!", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar: false,
        theme: "colored",
        containerId: "1",
      });
    }
  };

  const handleSignIn = async () => {
    if (areAllValuesFilled()) {
      setSigninAnimation(true);
      try {
        const response = await axios.post(
          "https://tanzeem-backend-dev.onrender.com/login/",
          signinCredentials
        );
        const { access, refresh } = response.data;

        // // Set cookies
        // Cookies.set("accessToken", access, { expires: 1 }); // 1 day
        // Cookies.set("refreshToken", refresh, { expires: 7 }); // 7 days

        // Decode the access token to get user information
        const decodedToken = jwtDecode(access);
        const userRole = decodedToken.role;
        const userName = decodedToken.name;
        const email = decodedToken.email;

        // Set additional cookies
        Cookies.set("username", userName);
        Cookies.set("role", userRole);
        Cookies.set("email", email);

        // Log in the user in the context
        login(userRole, access, refresh);

        toast.success("You are successfully logged in!", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          closeButton: true,
          hideProgressBar: false,
          theme: "colored",
          containerId: "1",
        });

        console.log("user role", userRole)
        // Navigate to the appropriate route based on the role
        if (userRole === "Administrator" || "Ordinary User") {
          navigate("/all_members");
        } else {
          navigate("/");
        }
      } catch (error) {
        const signinError = error.response.data.errors;
        toast.error(signinError, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          closeButton: true,
          hideProgressBar: false,
          theme: "colored",
          containerId: "1",
        });
        setSigninAnimation(false);
      }
    }
  };

  return (
    <Background>
      <Overlay />
      <Center>
        <div className="row mb-2">
          <div className="col">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={signinCredentials.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={signinCredentials.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <SelectField
              options={UserTypes}
              name="group"
              label="Type of User"
              value={signinCredentials.group}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        <div className="row mb-2 p-0">
          <div className="col-md-12">
            <ButtonWrapper>
              <Button
                name={
                  signinAnimation ? (
                    <ScaleLoader color={`var(--secondary-color)`} height={20} />
                  ) : (
                    "Sign In"
                  )
                }
                variant="primary"
                onClick={handleSignIn}
                disable={signinAnimation ? true : false}
              />
            </ButtonWrapper>
          </div>
        </div>
      </Center>
    </Background>
  );
};

export default Signin;

const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Overlay = styled.div`
  background-image: url("https://i.ibb.co/2Nj3FSt/Whats-App-Image-2024-01-05-at-2-53-45-PM.jpg");
  background-size: object-fit;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2; /* Adjust opacity here for lightness */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Center = styled.div`
  width: 20rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* Ensure this is above the overlay */
`;

const ButtonWrapper = styled.div`
  width: 100%;

  button {
    width: 100%; /* Make the button occupy the full width of its parent */
  }
`;
