import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../../components/input/Input";
import Button from "../button/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { X } from "lucide-react";
import TextArea from "../input/TextArea";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

const SuspendedModal = ({ isOpen, onClose, onSuspend }) => {
  const axiosPrivate = useAxiosPrivate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [suspendLoading, setSuspendLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState();
  const [endDate, setEndDate] = useState();
  const [reason, setReason] = useState();

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, []);

  const handleInputChange = (e) => {
    setError(false);
    setSearchLoading(false);
    setMobileNumber(e.target.value);
  };

  const getName = async () => {
    setSearchLoading(true);
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.get(
        `/get-member-by-mobile/${mobileNumber}`,
        {
          signal: controller.signal,
        }
      );

      if (response.data.errors) {
        setError(true);
        setFullName("");
      } else {
        const { name, surname, id } = response.data.result;
        setFullName(`${name} ${surname}`);
        setId(id);
        setError(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setFullName("");
      setId("");
    } finally {
      setSearchLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  if (!isOpen) return null;

  const handleCancel = () => {
    setFullName("");
    setMobileNumber("");
    setEndDate("");
    setReason("");
    setId("");
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const handleSuspendMember = async () => {
    setSuspendLoading(true);
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post(
        `/suspend/`,
        {
          member_id: id,
          end_date: endDate,
          reason,
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.errors) {
        setError(true);
      } else {
        onClose();
        toast.success("The member has been successfully suspended.", {
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
      console.error(err);
    } finally {
      setSuspendLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  return (
    <div>
      <ModalOverlay>
        <ModalContent>
          <div className="d-flex justify-content-end cursor">
            <X onClick={onClose} />
          </div>
          <div>
            <Input
              className="mb-1"
              label="Enter Mobile Number"
              placeholder="Enter Mobile Number"
              name="mobile_number"
              value={mobileNumber}
              type="number"
              onChange={handleInputChange}
            />
            {error && (
              <div className=" text-danger fw-bold">Member doesn't exist</div>
            )}
            {!fullName && (
              <div className="d-flex justify-content-end mt-2">
                <Button
                  variant="primary"
                  name={
                    searchLoading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        Searching
                        <BeatLoader color={`var(--secondary-color)`} size={5} />
                      </div>
                    ) : (
                      "Search"
                    )
                  }
                  onClick={getName}
                  disabled={searchLoading}
                />
              </div>
            )}
            {fullName && (
              <>
                <div className="row mb-2">
                  <Input label="Full Name" value={fullName} disabled />
                </div>
                <div className="row mb-2">
                  <Input
                    type="date"
                    label="End Date"
                    min={tomorrowStr}
                    value={endDate}
                    name="end_date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="row mb-2">
                  <TextArea
                    label="Reason"
                    placeholder="Enter the reason for suspension"
                    value={reason}
                    name="reason"
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <Button
                    name="Cancel"
                    variant="secondary"
                    onClick={handleCancel}
                  />
                  <Button
                    name={
                      suspendLoading ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          Suspending
                          <ScaleLoader
                            color={`var(--secondary-color)`}
                            height={10}
                          />
                        </div>
                      ) : (
                        "Suspend"
                      )
                    }
                    variant="danger"
                    onClick={handleSuspendMember}
                  />
                </div>
              </>
            )}
          </div>
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default SuspendedModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
