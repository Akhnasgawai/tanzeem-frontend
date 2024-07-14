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

const Sign_In = () => {
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

        console.log("user role", userRole);
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

  const circleSizes = [100, 20, 140, 50, 20]; // Sizes for each circle

  return (
    <Container>
      <Left>
        <Wrapper>
          <Welcome>Welcome!</Welcome>
          <Logo />
          <Lines>
            Majlise Islah wa Tanzeem is a dedicated organization committed to
            the improvement and organization of our community, fostering unity
            and progress through collective efforts!
          </Lines>
        </Wrapper>
      </Left>

      <Middle>
        <CirclesContainer>
          {circleSizes.map((size, index) => (
            <CirclePair key={index}>
              <WhiteCircle size={size} />
            </CirclePair>
          ))}
        </CirclesContainer>
      </Middle>

      <Right>
        <Card>
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
                      <ScaleLoader
                        color={`var(--secondary-color)`}
                        height={20}
                      />
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
        </Card>
      </Right>
    </Container>
  );
};

export default Sign_In;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Left = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  background: linear-gradient(to right, #96d6c7, #387466);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 90%;
  max-width: 400px;
`;

const Welcome = styled.div`
  font-family: "Playfair Display", serif;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 50px;
  letter-spacing: 0.2rem;
`;

const Logo = styled.div`
  background-image: url("https://i.ibb.co/2Nj3FSt/Whats-App-Image-2024-01-05-at-2-53-45-PM.jpg");
  background-size: cover;
  width: 250px;
  height: 250px;
  margin-bottom: 1rem;
`;

const Lines = styled.div`
  font-family: "Roboto", sans-serif;
  color: var(--primary-color);
  font-size: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  max-width: 50%;
  margin: 0 auto;
`;

const Middle = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CirclesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CirclePair = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin-left: 20%;
`;

const MiddlePair = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  border: 1px solid pink;
`;

const MiddleCircle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: radial-gradient(circle, white 0%, #22473e 100%);
  border-radius: 50%;
  opacity: 0.9;
  margin-left: -120px;
  z-index: 0;
`;

const WhiteCircle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size + 100}px;
  background: radial-gradient(circle, white 0%, white 100%);
  border-radius: 50%;
  opacity: 1;

  z-index: 1;
`;

const ButtonWrapper = styled.div`
  width: 100%;

  button {
    width: 100%; /* Make the button occupy the full width of its parent */
  }
`;
