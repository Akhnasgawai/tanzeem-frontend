import React, { useRef, useState } from "react";
import Input from "../../components/input/Input";
import Cookies from "js-cookie";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ScaleLoader } from "react-spinners";

const ChangePassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const controllerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const name = Cookies.get("username");
  const email = Cookies.get("email");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleCancel = () => {
    setPasswordData({ currentPassword: "", newPassword: "" });
    if (controllerRef.current) {
      controllerRef.current.abort(); // Abort the ongoing API call
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Both password fields are required", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar: false,
        theme: "colored",
        containerId: "1",
      });
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await axiosPrivate.post(
        `/change_password/`,
        {
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.errors) {
        setError(true);
      } else {
        handleCancel();
        toast.success("Success: Password changed!", {
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
      console.log("this is err", err);
      if (err.response && err.response.data && err.response.data.errors) {
        const error = err.response.data.errors;
        toast.error(error, {
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

  return (
    <div className="px-3">
      <div className="row">
        <div className="col-md-6 mb-2">
          <Input label="Name" value={name} disabled />
        </div>
        <div className="col-md-6 mb-2">
          <Input label="Email" value={email} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <Input
            label="Current Password"
            name="currentPassword"
            placeholder="Enter your current password"
            type="password"
            value={passwordData.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            label="New Password"
            name="newPassword"
            placeholder="Enter your new password"
            type="password"
            value={passwordData.newPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end gap-3">
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
                Changing
                <ScaleLoader color={`var(--secondary-color)`} height={10} />
              </div>
            ) : (
              "Change Password"
            )
          }
          variant="primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
