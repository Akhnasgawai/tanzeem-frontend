import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../../components/input/Input";
import Button from "../button/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { X } from "lucide-react";
import { BeatLoader, ScaleLoader } from "react-spinners";
import SelectField from "../selectField/SelectField";
import { toast } from "react-toastify";

const PaymentModal = ({ isOpen, onClose, onPayment }) => {
  const axiosPrivate = useAxiosPrivate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleInputChange = (e) => {
    setError(false);
    setSearchLoading(false);
    setMobileNumber(e.target.value);
  };

  const handleCancel = () => {
    setFullName("");
    setMobileNumber("");
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
        setError(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setFullName("");
    } finally {
      setSearchLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  const [fromYear, setFromYear] = useState();
  const [toYear, setToYear] = useState();
  const [referenceNumber, setReferenceNumber] = useState();
  const [amount, setAmount] = useState();
  const [yearDiff, setYearDiff] = useState(false);

  const currentYear = new Date().getFullYear();
  const allYears = Array.from(
    { length: 101 },
    (_, index) => currentYear - 50 + index
  );

  const handleFromYearChange = (e) => {
    setToYear("");
    setFromYear(e.value);
    setYearDiff(false);
  };

  const handleToYearChange = (e) => {
    setToYear(e.value);
    setYearDiff(true);
  };

  const handleAddPayment = async () => {
    setPaymentLoading(true);
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post(
        `/add_membership_fee/`,
        {
          mobile_number: mobileNumber,
          from_year: fromYear,
          to_year: toYear,
          reference_number: referenceNumber,
          amount: amount,
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.errors) {
        setError(true);
      } else {
        onClose();
        toast.success("The fee has been successfully added.", {
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
      setPaymentLoading(false);
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
                <div className="row mt-1 mb-2">
                  <Input label="Full Name" value={fullName} disabled />
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <SelectField
                      label="From Year"
                      options={allYears.map((year) => ({
                        value: year,
                        label: year.toString(),
                      }))}
                      value={fromYear}
                      onChange={handleFromYearChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <SelectField
                      label="To Year"
                      value={toYear}
                      options={
                        fromYear
                          ? allYears
                              .filter((year) => year > fromYear)
                              .map((year) => ({
                                value: year,
                                label: year.toString(),
                              }))
                          : []
                      }
                      onChange={handleToYearChange}
                    />
                  </div>
                  {yearDiff && (
                    <div
                      className="fw-lighter ps-3 pt-1"
                      style={{ fontSize: "12px" }}
                    >
                      You are paying fee for {toYear - fromYear} year
                    </div>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Input
                      label="Amount"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Reference Number"
                      placeholder="Reference Number"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-3 mt-2">
                  <Button
                    name="Cancel"
                    variant="secondary"
                    onClick={handleCancel}
                  />
                  <Button
                    name={
                      paymentLoading ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          Adding Payment
                          <ScaleLoader
                            color={`var(--secondary-color)`}
                            height={10}
                          />
                        </div>
                      ) : (
                        "Add Payment"
                      )
                    }
                    variant="primary"
                    onClick={handleAddPayment}
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

export default PaymentModal;

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
