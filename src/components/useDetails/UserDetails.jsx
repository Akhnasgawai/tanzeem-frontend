import React, { useState } from "react";
import Input from "../input/Input";
import SelectField from "../selectField/SelectField";
import Button from "../button/Button";
import { ArrowBigLeft, ArrowBigLeftDash, CornerDownLeft } from "lucide-react";
import styled from "styled-components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Cookies from "js-cookie";
import { Accordion, Card } from "react-bootstrap";
const UserDetails = ({ user, setShowUserDetails }) => {
  const defaultImageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  const handleBackClick = () => {
    // Set showUserDetails to false to show the initial content
    setShowUserDetails(false);
  };
  const role = Cookies.get("role");

  const handleDelete = () => {};

  const handleEdit = () => {};

  const handleApprove = () => {};

  const handleDecline = () => {};

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  console.log("user", user);

  return (
    <div className="px-4 mx-2 border shadow">
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
          <div
            className="accordion  accordion-flush"
          >
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
                  <div className="accordion-body" style={{backgroundColor: `var(  --placeholder-color)`}}>
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
            <div className="col-md-3 mb-3">
              <Button
                variant="secondary"
                name="Decline"
                w100
                onClick={handleDecline}
              />
            </div>
            <div className="col-md-3 mb-3">
              <Button
                variant="primary"
                name="Approve"
                w100
                onClick={handleApprove}
              />
            </div>
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
