import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import SelectField from "../../components/selectField/SelectField";
import Button from "../../components/button/Button";
import halqa from "../../data/halqa";
import countries from "../../data/countries";
import MemberTypes from "../../data/memberTypes";
import { State } from "country-state-city";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { BeatLoader } from "react-spinners";

const AddMembers = () => {
  const axiosPrivate = useAxiosPrivate();
  const today = new Date().toISOString().split("T")[0];
  const [member, setMember] = useState({
    name: "",
    surname: "",
    father_name: "",
    date_of_birth: today,
    place_of_birth: "",
    email: null,
    mobile_number: "",
    whatsapp_number: "",
    member_type: "Ordinary Member",
    qualification: "",
    joining_date: today,
    profession: "",
    permanent_address: "",
    permanent_halqa: "",
    permanent_city: "",
    permanent_state: "",
    permanent_country: "",
    current_address: "",
    current_halqa: "",
    current_city: "",
    current_state: "",
    current_country: "",
    image_file: "",
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleMemberTypeChange = (selectedOption) => {
    setMember((prevMember) => ({
      ...prevMember,
      member_type: selectedOption.value,
    }));
  };

  const CheckErrors = (member) => {
    if (member.name === "") {
      setError(true);
      setErrorMsg("Please Enter Name");
      return true;
    }
    //  else if (member.surname === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Surname");
    //   return true;
    // } else if (member.father_name === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Father Name");
    //   return true;
    // } else if (member.date_of_birth === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Date of Birth");
    //   return true;
    // } else if (member.image_file === "") {
    //   setError(true);
    //   setErrorMsg("Please Upload Image!");
    //   return true;
    // } else if (member.place_of_birth === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Place of Birth");
    //   return true;
    // } else if (member.joining_date === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Joining Date");
    //   return true;
    // } else if (member.mobile_number === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Mobile Number");
    //   return true;
    // } else if (member.whatsapp_number === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Whatsapp Number ");
    //   return true;
    // }
    else if (member.member_type === "") {
      //   setError(true);
      //   setErrorMsg("Please Choose Member Type");
      //   return true;
    }
    //else if (member.qualification === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Qualification");
    //   return true;
    // } else if (member.profession === "") {
    //   setError(true);
    //   setErrorMsg("Please Enter Profession");
    //   return true;
    // }
    else if (member.permanent_country === "") {
      setError(true);
      setErrorMsg("Please Choose Permanent Country");
      return true;
    } else if (member.permanent_state === "") {
      setError(true);
      setErrorMsg("Please Choose Permanent State");
      return true;
    } else if (member.permanent_city === "") {
      setError(true);
      setErrorMsg("Please Choose Permanent City");
      return true;
    } else if (member.permanent_halqa === "") {
      setError(true);
      setErrorMsg("Please Choose Permanent Halqa");
      return true;
    } else if (member.permanent_address === "") {
      setError(true);
      setErrorMsg("Please Enter Permanent Address");
      return true;
    } else if (member.current_country === "") {
      setError(true);
      setErrorMsg("Please Choose Current Country");
      return true;
    } else if (member.current_state === "") {
      setError(true);
      setErrorMsg("Please Choose Current State");
      return true;
    } else if (member.current_city === "") {
      setError(true);
      setErrorMsg("Please Choose Current City");
      return true;
    } else if (member.current_halqa === "") {
      setError(true);
      setErrorMsg("Please Choose Current Halqa");
      return true;
    } else if (member.current_address === "") {
      setError(true);
      setErrorMsg("Please Enter Current Address");
      return true;
    }

    // Return false if there are no errors
    return false;
  };

  useEffect(() => {
    if (error === true) {
      toast.error(`${errorMsg}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        closeButton: false,
        theme: "colored",
        containerId: "1",
      });
    }
  }, [error, errorMsg]);

  const addMember = async (data) => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(`/add_member/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal,
      });
      console.log("response", response);
      return response;
    } catch (error) {
      // Error handling logic
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors;
        for (const [, value] of Object.entries(errors)) {
          const firstErrorMessage = value[0];
          console.log(firstErrorMessage, "first error");
          throw new Error(firstErrorMessage); // Throw an error if there are validation errors
        }
      } else {
        console.error(error);
        throw new Error("An error occurred while adding the member."); // Throw a generic error for other types of errors
      }
    } finally {
      controller.abort(); // Always abort the request when finished
    }
  };

  const handleSubmit = async () => {
    if (!CheckErrors(member)) {
      try {
        setLoading(true);
        await addMember(member);
        handleCancel();
        toast.success(`Success: New member added!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          closeButton: false,
          theme: "colored",
          containerId: "1",
        });
      } catch (error) {
        console.error(error.message); // Log the error message
        // Handle the error (e.g., display an error message to the user)
        toast.error(`Error: ${error.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          closeButton: false,
          theme: "colored",
          containerId: "1",
        });
      } finally {
        setLoading(false); // Set loading to false after the API call is completed
      }
    } else {
      setTimeout(() => {
        setError(false);
      }, 100);
    }
  };

  const [file, setFile] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );

  const handleSetImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setMember((prevMember) => ({
      ...prevMember,
      image_file: e.target.files[0],
    }));
  };

  const [permanentStates, setPermanentStates] = useState([]);
  const [currentStates, setCurrentStates] = useState([]);

  const handleCurrentCountryChange = (selectedOption) => {
    setCurrentStates([]);
    const country =
      selectedOption.value.charAt(0).toUpperCase() +
      selectedOption.value.slice(1);
    const countryCode = getCodeforCountry(country);
    const states = State.getStatesOfCountry(countryCode);
    setCurrentStates(states);
    setMember((prevMember) => ({
      ...prevMember,
      current_country: selectedOption.value,
    }));
  };

  const handlePermanentCountryChange = (selectedOption) => {
    const country =
      selectedOption.value.charAt(0).toUpperCase() +
      selectedOption.value.slice(1);
    const countryCode = getCodeforCountry(country);
    const states = State.getStatesOfCountry(countryCode);
    setPermanentStates(states);
    setMember((prevMember) => ({
      ...prevMember,
      permanent_country: selectedOption.value,
    }));
  };

  const handlePermanentStateChange = (selectedOption) => {
    setMember((prevMember) => ({
      ...prevMember,
      permanent_state: selectedOption.value,
    }));
  };

  const handleCurrentStateChange = (selectedOption) => {
    setMember((prevMember) => ({
      ...prevMember,
      current_state: selectedOption.value,
    }));
  };

  const handlePermanentHalqaChange = (selectedOption) => {
    setMember((prevMember) => ({
      ...prevMember,
      permanent_halqa: selectedOption.value,
    }));
  };

  const handleCurrentHalqaChange = (selectedOption) => {
    setMember((prevMember) => ({
      ...prevMember,
      current_halqa: selectedOption.value,
    }));
  };

  const handleCancel = () => {
    setMember({
      name: "",
      surname: "",
      father_name: "",
      date_of_birth: "",
      place_of_birth: "",
      email: "",
      mobile_number: "",
      whatsapp_number: "",
      member_type: "",
      qualification: "",
      joining_date: "",
      profession: "",
      permanent_address: "",
      permanent_halqa: "",
      permanent_city: "",
      permanent_state: "",
      permanent_country: "",
      current_address: "",
      current_halqa: "",
      current_city: "",
      current_state: "",
      current_country: "",
      image_file:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    });
    setFile(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    );
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="px-4 mb-2 border-bottom">
      <div className="d-flex row">
        <div className="col-md-3 ">
          <div className="col m-0 d-flex flex-column justify-content-center align-items-center">
            <img
              src={file}
              // width="180px"
              // height="189px"
              alt="user"
              className="img-fluid rounded m-3"
            />
            <label
              htmlFor="imageUpload"
              className="text-center cursor p-2 rounded mt-3"
              style={{ background: "#326f61", color: "#fff" }}
            >
              Choose an Image
              <input
                type="file"
                id="imageUpload"
                onChange={handleSetImage}
                style={{ background: "red", display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row ">
            <div className="col-md-6 mb-3">
              <Input
                label="Name"
                placeholder="Enter Name"
                onChange={handleChange}
                name="name"
                value={member.name}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                label="Surname"
                placeholder="Enter Surname"
                name="surname"
                value={member.surname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <Input
                label="Father Name"
                placeholder="Enter Father Name"
                name="father_name"
                value={member.father_name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                label="Email"
                name="email"
                type="email"
                value={member.email}
                placeholder="email@gmail.com"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <Input
                label="Phone Number"
                placeholder="Enter Phone Number"
                onChange={handleChange}
                name="mobile_number"
                type="Number"
                value={member.mobile_number}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                label="Whatsapp Number"
                placeholder="Enter Whatsapp Number"
                type="Number"
                onChange={handleChange}
                name="whatsapp_number"
                value={member.whatsapp_number}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <Input
                label="Date of Birth"
                placeholder="Enter Education"
                type="date"
                name="date_of_birth"
                value={member.date_of_birth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                label="Place of Birth"
                placeholder="Enter Place of Birth"
                name="place_of_birth"
                value={member.place_of_birth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6 mb-3">
              <Input
                label="Joining Date"
                placeholder="Enter Education"
                type="date"
                name="joining_date"
                value={member.joining_date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <SelectField
                label="Type of Member"
                options={MemberTypes}
                name="member_type"
                value={member.member_type}
                onChange={handleMemberTypeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-6 mb-3">
          <Input
            label="Education"
            placeholder="Enter Education"
            onChange={handleChange}
            name="qualification"
            value={member.qualification}
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            label="Profession"
            placeholder="Enter Profession"
            onChange={handleChange}
            name="profession"
            value={member.profession}
          />
        </div>
      </div>
      <div className="row">
        <h5 className="fw-bold">Current Address</h5>
      </div>
      <div className="row">
        <div className="col-md-3  mb-3">
          <SelectField
            label="Select Country"
            options={countries}
            onChange={handleCurrentCountryChange}
            name="current_country"
            value={member.current_country}
          />
        </div>
        <div className="col-md-3  mb-3">
          <SelectField
            label="Select State"
            options={currentStates
              .map((state) => state.name)
              .map((name) => ({ value: name, label: name }))}
            name="permanent_state"
            value={member.current_state}
            onChange={handleCurrentStateChange}
          />
        </div>
        <div className="col-md-3  mb-3">
          <Input
            label="City"
            placeholder="Current City"
            onChange={handleChange}
            name="current_city"
            value={member.current_city}
          />
        </div>
        <div className="col-md-3  mb-3">
          <SelectField
            label="Select Halqa"
            options={halqa}
            onChange={handleCurrentHalqaChange}
            name="current_halqa"
            value={member.current_halqa}
          />
        </div>
      </div>
      <div className="row ">
        <div className="col-md-12 mb-3">
          <Input
            label="Address"
            placeholder="Enter Address"
            onChange={handleChange}
            name="current_address"
            value={member.current_address}
          />
        </div>
      </div>
      <div className="row">
        <h5 className="fw-bold">Permanent Address</h5>
      </div>
      <div className="row ">
        <div className="col-md-3 mb-3">
          <SelectField
            label="Select Country"
            options={countries}
            name="permanent_country"
            value={member.permanent_country}
            onChange={handlePermanentCountryChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <SelectField
            label="Select State"
            options={permanentStates
              .map((state) => state.name)
              .map((name) => ({ value: name, label: name }))}
            name="permanent_state"
            value={member.permanent_state}
            onChange={handlePermanentStateChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <Input
            label="City"
            placeholder="Permanent City"
            onChange={handleChange}
            name="permanent_city"
            value={member.permanent_city}
          />
        </div>
        <div className="col-md-3 mb-3">
          <SelectField
            label="Select Halqa"
            options={halqa}
            onChange={handlePermanentHalqaChange}
            name="permanent_halqa"
            value={member.permanent_halqa}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <Input
            label="Address"
            placeholder="Enter Address"
            onChange={handleChange}
            name="permanent_address"
            value={member.permanent_address}
          />
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-end mb-3">
        <Button name="Cancel" variant="secondary" onClick={handleCancel} />
        <Button
          variant="primary"
          name={
            loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Submitting
                <BeatLoader color={`var(--secondary-color)`} size={5} />
              </div>
            ) : (
              "Submit"
            )
          }
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddMembers;

export const Countries = {
  India: "IN",
  China: "CN",
  Singapore: "SG",
  Malaysia: "MY",
  Hongkong: "HK",
  Taiwan: "TW",
  Thailand: "TH",
  Iran: "IR",
  UAE: "AE",
  Bahrain: "BH",
  Kuwait: "KW",
  Oman: "OM",
  KSA: "SA",
  Qatar: "QA",
  UK: "GB",
  USA: "US",
};

export const getCodeforCountry = (name) => {
  return Countries[name];
};
