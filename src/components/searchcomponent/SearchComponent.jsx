import React, { useState } from "react";
import Input from "../input/Input";
import SelectField from "../selectField/SelectField";
import halqa from "../../data/halqa";
import countries from "../../data/countries";
import Button from "../button/Button";
import { State } from "country-state-city";
import { getCodeforCountry } from "../../pages/addMembers/AddMembers";

const SearchComponent = ({ setSearchCriteria, setErrorMsg }) => {
  // Receive setSearchCriteria function
  const [searchFields, setSearchFields] = useState({
    query: "",
    mobile_number: "",
    country: "",
    state: "",
    city: "",
    halqa: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields({
      ...searchFields,
      [name]: value,
    });
  };

  const [states, setStates] = useState([]);
  const handleCountryChange = (selectedOption) => {
    setStates([]);
    const country =
      selectedOption.value.charAt(0).toUpperCase() +
      selectedOption.value.slice(1);
    const countryCode = getCodeforCountry(country);
    const states = State.getStatesOfCountry(countryCode);
    setStates(states);
    setSearchFields((prevMember) => ({
      ...prevMember,
      country: selectedOption.value,
    }));
  };

  const handleStateChange = (selectedOption) => {
    setSearchFields((prevMember) => ({
      ...prevMember,
      state: selectedOption.value,
    }));
  };

  const handleHalqaChange = (selectedOption) => {
    setSearchFields((prevMember) => ({
      ...prevMember,
      halqa: selectedOption.value,
    }));
  };


  const handleSubmit = () => {
    setSearchCriteria(searchFields); // Call setSearchCriteria with updated searchFields
    setErrorMsg("Search Failed: No matching member found!");
  };

  const handleCancel = () => {
    setSearchCriteria({
      query: "",
      mobileNumber: "",
      country: "",
      state: "",
      city: "",
      halqa: "",
      page : 1
    });
    setSearchFields({
      query: "",
      mobileNumber: "",
      country: "",
      state: "",
      city: "",
      halqa: "",
    });
    setErrorMsg("Currently, there are no members!");
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-6">
          <Input
            name="query"
            label="Search By Name, Father Name or Surname"
            placeholder="Search By Name, Surname"
            value={searchFields.query}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            name="mobileNumber"
            label="Mobile Number"
            placeholder="Mobile Number"
            value={searchFields.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3">
          <SelectField
            name="country"
            label="Select Country"
            options={countries}
            value={searchFields.country}
            onChange={handleCountryChange}
          />
        </div>
        <div className="col-md-3">
          <SelectField
            name="state"
            label="Select State"
            options={states
              .map((state) => state.name)
              .map((name) => ({ value: name, label: name }))}
            value={searchFields.state}
            onChange={handleStateChange}
          />
        </div>
        <div className="col-md-3">
          <Input
            name="city"
            label="City"
            placeholder="Enter City"
            value={searchFields.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3">
          <SelectField
            name="halqa"
            label="Select Halqa"
            options={halqa}
            value={searchFields.halqa}
            onChange={handleHalqaChange}
          />
        </div>
      </div>

      <div className="d-flex mt-4 gap-3 justify-content-end mb-4">
        <Button name="Cancel" variant="secondary" onClick={handleCancel} />
        <Button name="Search" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default SearchComponent;
