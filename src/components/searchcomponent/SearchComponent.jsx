import React, { useState } from "react";
import Input from "../input/Input";
import SelectField from "../selectField/SelectField";
import halqa from "../../data/halqa";
import countries from "../../data/countries";
import Button from "../button/Button";
import { State } from "country-state-city";
import { getCodeforCountry } from "../../pages/addMembers/AddMembers";
import { DownloadIcon } from "lucide-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast, ToastContainer } from "react-toastify";

const SearchComponent = ({ setSearchCriteria, setErrorMsg, status }) => {
  const axiosPrivate = useAxiosPrivate();

  const [searchFields, setSearchFields] = useState({
    query: "",
    mobileNumber: "",
    country: "",
    state: "",
    city: "",
    halqa: "",
    member_id: "",
  });
  const [states, setStates] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields({
      ...searchFields,
      [name]: value,
    });
  };

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
    // Call the API with search criteria
    setSearchCriteria({
      ...searchFields,
      page: 1, // Reset page to 1 on new search
    });
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
      page: 1,
      member_id: "",
    });
    setSearchFields({
      query: "",
      mobileNumber: "",
      country: "",
      state: "",
      city: "",
      halqa: "",
      member_id: "",
    });
    setErrorMsg("Currently, there are no members!");
  };

  const handleDownload = async () => {
    let toastId;
  
    try {
      const queryParams = new URLSearchParams({
        ...searchFields,
        status, // Include status in the query parameters
      }).toString();

  
      toastId = toast.loading("Downloading... Please wait.", {
        position: "bottom-right",
        autoClose: false,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar: true,
        theme: "colored",
      });
  
      const response = await axiosPrivate.get(
        `/download_member_list?${queryParams}`,
        {
          responseType: "blob", // important for downloading files
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "member_list.xlsx");
      document.body.appendChild(link);
      link.click();
  
      // Update the toast to success
      toast.update(toastId, {
        render: "Download completed successfully!",
        type: "success", // Use "success" directly
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Download failed", error);
      setErrorMsg("Failed to download the member list.");
  
      // Update the toast to show an error
      toast.update(toastId, {
        render: "Failed to download the member list.",
        type: "error", // Use "error" directly
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar: true,
      });
    }
  };
  
  return (
    <div>
     <ToastContainer/>
      <div className="row">
        <div className="col-md-4 mb-3">
          <Input
            name="query"
            label="Search By Name, Father Name or Surname"
            placeholder="Search By Name, Surname"
            value={searchFields.query}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <Input
            name="mobileNumber"
            label="Search By Mobile Number"
            placeholder="Mobile Number"
            type="Number"
            value={searchFields.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <Input
            name="member_id"
            label="Search By Member ID"
            placeholder="Member ID"
            value={searchFields.member_id}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <SelectField
            name="country"
            label="Select Country"
            options={countries}
            value={searchFields.country}
            onChange={handleCountryChange}
          />
        </div>
        <div className="col-md-3 mb-3">
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
        <div className="col-md-3 mb-3">
          <Input
            name="city"
            label="City"
            placeholder="Enter City"
            value={searchFields.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <SelectField
            name="halqa"
            label="Select Halqa"
            options={halqa}
            value={searchFields.halqa}
            onChange={handleHalqaChange}
          />
        </div>
      </div>

      <div className="d-flex mt-4 gap-3 justify-content-end align-items-center mb-4">
        <div className="cursor">
          <DownloadIcon color="#326f61" size={24} onClick={handleDownload} />
        </div>

        <Button name="Cancel" variant="secondary" onClick={handleCancel} />
        <Button name="Search" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default SearchComponent;
