import React, { useRef, useState } from "react";
import Input from "../input/Input";
import SelectField from "../selectField/SelectField";
import Button from "../button/Button";
import styled from "styled-components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ScaleLoader } from "react-spinners";

const UserDetails = ({ user, setShowUserDetails, reloadUserList }) => {
  const axiosPrivate = useAxiosPrivate();
  const controllerRef = useRef(null);
  const [approveloading, setApproveLoading] = useState(false);
  const [rejectloading, setRejectLoading] = useState(false);
  const [error, setError] = useState(false);
  const defaultImageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  const handleBackClick = () => {
    // Set showUserDetails to false to show the initial content
    setShowUserDetails(false);
  };
  const role = Cookies.get("role");

  const handleDelete = () => {};

  const handleEdit = () => {};

  const handleApprove = async () => {
    setApproveLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await axiosPrivate.put(
        `/update_member/${user.id}/`,
        {
          status: "approved",
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.errors) {
        setError(true);
      } else {
        toast.success("Success: Member Approved!", {
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
      setApproveLoading(false);
      reloadUserList();
    }

    return () => {
      controller.abort();
      controllerRef.current = null;
    };
  };

  const handleReject = async () => {
    setRejectLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await axiosPrivate.put(
        `/update_member/${user.id}/`,
        {
          status: "rejected",
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.errors) {
        setError(true);
      } else {
        toast.success("Success: Member Rejected!", {
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
      setRejectLoading(false);
      reloadUserList();
    }

    return () => {
      controller.abort();
      controllerRef.current = null;
    };
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="px-4 mx-0 border shadow">
      <div className="pt-1 ">
        <Icon className="cursor" onClick={handleBackClick}>
          <OverlayTrigger
            placement="right-end"
            overlay={<Tooltip id="tooltip-back">Back</Tooltip>}
          >
            <i class="bi bi-box-arrow-in-left"></i>
          </OverlayTrigger>
        </Icon>
      </div>
      <div className="row">
        <div className="col-md-3 mb-2">
          <img
            src={user.image_url || defaultImageUrl}
            alt="Members Image"
            // width="230px"
            // height="390px"
            className="img-fluid rounded mt-4"
          />
        </div>
        <div className="col-md-9 ">
          <div className="row">
            <div className="col-md-6  mb-3">
              <Input label="Name" value={user.name} disabled />
            </div>
            <div className="col-md-6  mb-3">
              <Input label="Surname" value={user.surname} disabled />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Input label="Father Name" value={user.father_name} disabled />
            </div>
            <div className="col-md-6 mb-3">
              <Input label="Email" value={user.email} disabled />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Input label="Phone Number" value={user.mobile_number} disabled />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                label="Whatsapp Number"
                value={user.whatsapp_number}
                disabled
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <Input
                label="Qualification"
                value={user.qualification}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input label="Profession" value={user.profession} disabled />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <Input
                label="Place of Birth"
                value={user.place_of_birth}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                label="Date of Birth"
                value={user.date_of_birth}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-md-4 mb-3">
          <Input
            label="Membership Number"
            disabled
            value={user.membership_number}
          />
        </div>
        <div className="col-md-4 mb-3">
          <Input label="Joining Date" disabled value={user.joining_date} />
        </div>
        <div className="col-md-4 mb-3">
          <SelectField
            label="Type of Member"
            disabled={true}
            value={user.member_type}
          />
        </div>
      </div>
      <div className="row pt-3">
        <h5 className="fw-bold">Current Address</h5>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <SelectField
            label="Country"
            disabled
            value={user.address.current_country}
          />
        </div>
        <div className="col-md-3 mb-3">
          <SelectField
            label="State"
            disabled
            value={user.address.current_state}
          />
        </div>
        <div className="col-md-3 mb-3">
          <Input label="City" disabled value={user.address.current_city} />
        </div>
        <div className="col-md-3 mb-3">
          <SelectField
            label="Halqa"
            disabled
            value={user.address.current_halqa}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Input
            label="Address"
            value={user.address.current_address}
            disabled
          />
        </div>
      </div>
      <div className="row pt-3">
        <h5 className="fw-bold">Permanent Address</h5>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <SelectField
            label="Country"
            disabled
            value={user.address.permanent_country}
          />
        </div>
        <div className="col-md-3 mb-3">
          <SelectField
            label="State"
            disabled
            value={user.address.permanent_state}
          />
        </div>
        <div className="col-md-3 mb-3">
          <Input label="City" disabled value={user.address.permanent_city} />
        </div>
        <div className="col-md-3 mb-3">
          <SelectField
            label="Halqa"
            disabled
            value={user.address.permanent_halqa}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-12 mb-3">
          <Input
            label="Address"
            value={user.address.permanent_address}
            disabled
          />
        </div>
      </div>
      {/* This is where the accordions are going to be  */}

      {user.current_suspension_history.length > 0 && (
        <div className="mb-3">
          <div className="accordion  accordion-flush">
            {user.current_suspension_history.map((item, index) => (
              <div className="accordion-item mb-3" key={item.id}>
                <h2 className="accordion-header">
                  <div
                    className={`fw-bold accordion-button ${
                      activeIndex === index ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    // aria-expanded={activeIndex === index}
                    style={{
                      backgroundColor: `var(--secondary-color)`,
                      color: `var(--primary-color)`,
                      fontSize: "20px",
                      borderRadius: "0.25rem",
                    }}
                  >
                    Suspension Details {index + 1}
                  </div>
                </h2>
                <div
                  id={`flush-collapse${index}`}
                  className={`accordion-collapse collapse ${
                    activeIndex === index ? "show" : ""
                  }`}
                  aria-labelledby={`flush-heading${index}`}
                >
                  <div
                    className="accordion-body"
                    style={{ backgroundColor: `var(  --placeholder-color)` }}
                  >
                    <p>
                      <strong>Reason:</strong> {item.reason}
                    </p>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(item.start_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>End Date:</strong>{" "}
                      {new Date(item.end_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Suspended By:</strong> {item.created_by.full_name}{" "}
                      ({item.created_by.email})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr />
      <div>
        <h5>
          <p>For Office Use Only</p>
        </h5>
        <div>
          <p>
            <Strong>Member Added By: </Strong>
            <Span>{user.created_by.full_name}</Span>
          </p>
        </div>
        <div>
          <p>
            <Strong>Member Added At: </Strong>
            <Span>
              {" "}
              {(() => {
                const date = new Date(user.created_at);
                const day = date.getDate();
                const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
              })()}
            </Span>
          </p>
        </div>
        {user.status !== "pending" && (
          <>
            <div>
              <p>
                <Strong>
                  {user.status === "approved"
                    ? "Member Approved By: "
                    : "Member Rejected By: "}
                </Strong>
                <Span>{user.approved_by.full_name}</Span>
              </p>
            </div>
            <div>
              <p>
                <Strong>
                  {" "}
                  <Strong>
                    {user.status === "approved"
                      ? "Member Approved At: "
                      : "Member Rejected At: "}
                  </Strong>
                </Strong>
                <Span>
                  {" "}
                  {(() => {
                    const date = new Date(user.approved_at);
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                  })()}
                </Span>
              </p>
            </div>
          </>
        )}
      </div>
      {/* This is before the buttons */}
      <div className="row mb-4 justify-content-end">
        {role === "Ordinary User" && user.status === "pending" && (
          <div className="col-md-3">
            <Button variant="edit" name="Edit" w100 />
          </div>
        )}

        {role === "Administrator" && (
          <>
            <div className="col-md-3 mb-3 ">
              <Button variant="edit" name="Edit" w100 />
            </div>
            <div className="col-md-3 mb-3">
              <Button
                variant="danger"
                name="Delete"
                w100
                onClick={handleDelete}
              />
            </div>
            {user.status === "pending" && (
              <>
                <div className="col-md-3 mb-3">
                  <Button
                    name={
                      rejectloading ? (
                        <ButtonLoading>
                          Rejecting
                          <ScaleLoader color="black" height={10} />
                        </ButtonLoading>
                      ) : (
                        "Reject"
                      )
                    }
                    w100
                    onClick={handleReject}
                    variant="secondary"
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <Button
                    name={
                      approveloading ? (
                        <ButtonLoading>
                          Approving
                          <ScaleLoader
                            color={`var(--secondary-color)`}
                            height={10}
                          />
                        </ButtonLoading>
                      ) : (
                        "Approve"
                      )
                    }
                    w100
                    onClick={handleApprove}
                    variant="primary"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;

const Icon = styled.div`
  font-size: 32px;
`;
const Span = styled.span`
  letter-spacing: 0.07rem;
  color: grey;
`;

const Strong = styled.strong`
  letter-spacing: 0.07rem;
`;

const ButtonLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
