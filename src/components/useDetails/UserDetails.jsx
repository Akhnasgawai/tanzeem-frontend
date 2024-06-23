import React from "react";
import Input from "../input/Input";
import SelectField from "../selectField/SelectField";
import Button from "../button/Button";
import { ArrowBigLeft, ArrowBigLeftDash, CornerDownLeft } from "lucide-react";
import styled from "styled-components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Cookies from "js-cookie";
const UserDetails = ({ user, setShowUserDetails }) => {
  const defaultImageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  const handleBackClick = () => {
    // Set showUserDetails to false to show the initial content
    setShowUserDetails(false);
  };
  const role = Cookies.get("role");
  console.log(role, "role");

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
      <div className="row">
        <div className="col-md-12 mb-3">
          <Input
            label="Address"
            value={user.address.permanent_address}
            disabled
          />
        </div>
      </div>
      <div className="row mb-4 justify-content-end">
        {role === "Ordinary User" && user.status === "pending" && (
          <div className="col-md-3">
            <Button variant="edit" name="Edit" w100 />
          </div>
        )}

        {role === "Administrator" && (
          <>
            <div className="col-md-3 mb-3">
              <Button variant="edit" name="Edit" w100 />
            </div>
            <div className="col-md-3 mb-3">
              <Button variant="danger" name="Delete" w100 />
            </div>
            <div className="col-md-3 mb-3">
              <Button variant="secondary" name="Decline" w100 />
            </div>
            <div className="col-md-3 mb-3">
              <Button variant="primary" name="Approve" w100 />
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
