import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.variant === "primary"
      ? `var(--primary-color)`
      : props.variant === "secondary"
      ? `var(--placeholder-color)`
      : props.variant === "danger"
      ? `var(--danger-color)`
      : props.variant === "edit"
      ? `var(--edit-color)`
      : "white"};
  color: ${(props) =>
    props.variant === "primary"
      ? "white"
      : props.variant === "secondary"
      ? "black"
      : props.variant === "danger"
      ? "white"
      : props.variant === "edit"
      ? "white"
      : "black"};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  ${(props) =>
    props.w100 &&
    css`
      width: 100%;
    `}

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;

const Button = ({ name, onClick, variant, disable = false, w100 = false }) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      disabled={disable}
      w100={w100}
    >
      {name}
    </StyledButton>
  );
};

export default Button;
