import React from "react";
import Select from "react-select";
import styled from "styled-components";
import Input from "../input/Input";

const Label = styled.label`
  display: block;
  margin-bottom: 0.1rem;
  color: var(--text-color);
  font-weight: 550;
  color: black;
  font-size: 15px;
  /* Add any additional styling here */
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: `var(--placeholder-color)`,
    borderRadius: "5px",
    border: "none",
    boxShadow: "none",
    fontSize: "13px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? `var(--primary-color)` : "#fff",
    color: state.isSelected ? "#fff" : "#000",
    "&:hover": {
      backgroundColor: `var(--secondary-color)`,
      color: "#000000",
    },
  }),
};

const SelectField = ({ options, value, label, onChange, name, disabled }) => {
  const selectedOption =
    (!disabled && options.find((option) => option.value === value)) || null;

  return (
    <div>
      <Label>{label}</Label>
      {disabled ? (
        <Input
          type="text"
          value={value}
          disabled
        />
      ) : (
        <Select
          options={options}
          value={selectedOption}
          name={name}
          onChange={onChange}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#28a745", // Color of the selected option
            },
          })}
        />
      )}
    </div>
  );
};

export default SelectField;
