import React, { useState } from "react";
import styled from "styled-components";

const Sign_In = () => {
  const circleSizes = [20, 160, 150, 140, 30, 150, 10]; // Sizes for each circle
  const whiteSizes = [20, 150, 200, 90, 80, 70, 60, 30, 70, 50, 40];

  return (
    <Container>
      <Left>
        <Wrapper>
          <Welcome>Welcome!</Welcome>
          <Logo></Logo>
          <Lines>
            Majlise Islah wa Tanzeem is a dedicated organization committed to
            the improvement and organization of our community, fostering unity
            and progress through collective efforts!
          </Lines>
        </Wrapper>
      </Left>
      <CirclesContainer>
        {circleSizes.map((size, index) => (
          <CircleGroup key={index}>
            <MiddleCircle size={size} />
            {whiteSizes.map((whiteSize, idx) => (
              <WhiteCircle key={idx} size={whiteSize} />
            ))}
          </CircleGroup>
        ))}
      </CirclesContainer>

      <Right>
        <Card></Card>
      </Right>
    </Container>
  );
};

export default Sign_In;

const ButtonWrapper = styled.div`
  width: 100%;

  button {
    width: 100%; /* Make the button occupy the full width of its parent */
  }
`;

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

const CirclesContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px; /* Space between the circle groups */
`;

const CircleGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LightCircle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: radial-gradient(circle, white 0%, #96d6c7 100%);
  border-radius: 50%;
  opacity: 0.9;
  z-index: 1;
`;

const MiddleCircle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: radial-gradient(circle, white 0%, #387466 100%);
  border-radius: 50%;
  opacity: 0.9;
  z-index: 1;
`;

const WhiteCircle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
