import React, { useRef, useState } from "react";
import Input from "../../components/input/Input";
import SelectField from "../../components/selectField/SelectField";
import Button from "../../components/button/Button";
import UserTypes from "../../data/userTypes";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ScaleLoader } from "react-spinners";
const AddUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    group_name: "",
    password: "",
    mobile_number: "",
  });
  const controllerRef = useRef(null);

  const handleInputChange = (e) => {
    setLoading(false);
    if (controllerRef.current) {
      controllerRef.current.abort(); // Abort the ongoing API call
    }
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (selectedOption) => {
    setLoading(false);
    if (controllerRef.current) {
      controllerRef.current.abort(); // Abort the ongoing API call
    }
    setUser((prev) => ({
      ...prev,
      group_name: selectedOption.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await axiosPrivate.post(
        `/register/`,
        {
          email: user.email,
          password: user.password,
          full_name: user.full_name,
          mobile_number: user.mobile_number,
          group_name: user.group_name,
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.errors) {
        setError(true);
      } else {
        handleCancel()
        toast.success("User have been registered successfully", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          closeButton: true,
          hideProgressBar: false,
          theme: "colored",
          containerId: "1",
        });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const error = err.response.data.errors;
        toast.error(Object.values(error)[0][0], {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          closeButton: true,
          hideProgressBar: false,
          theme: "colored",
          containerId: "1",
        });
      } else {
        toast.error("An unexpected error occurred", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          closeButton: true,
          hideProgressBar: false,
          theme: "colored",
          containerId: "1",
        });
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
      controllerRef.current = null;
    };
  };

  const handleCancel = () => {
    setUser({
      full_name: "",
      email: "",
      group_name: "",
      password: "",
      mobile_number: "",
    });
    if (controllerRef.current) {
      controllerRef.current.abort(); // Abort the ongoing API call
    }
    setLoading(false);
  };
  return (
    <div className="px-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <Input
            label="Name"
            placeholder="Enter Name"
            name="full_name"
            value={user.full_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            type="Number"
            name="mobile_number"
            value={user.mobile_number}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <Input
            label="Email"
            placeholder="Enter Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div>
          <SelectField
            label="Type Of User"
            placeholder="Enter type of User"
            name="group_name"
            value={user.group_name}
            options={UserTypes}
            onChange={handleUserTypeChange}
          />
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-end mb-3">
        <Button name="Cancel" variant="secondary" onClick={handleCancel} />
        <Button
          name={
            loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Registering
                <ScaleLoader color={`var(--secondary-color)`} height={10} />
              </div>
            ) : (
              "Register"
            )
          }
          variant="primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddUsers;
