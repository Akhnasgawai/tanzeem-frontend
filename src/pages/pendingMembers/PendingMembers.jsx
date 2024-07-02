import React, { useEffect, useState } from "react";
import SearchComponent from "../../components/searchcomponent/SearchComponent";
import TableView from "../../components/tableview/TableView";
import Button from "../../components/button/Button";
import { AlertCircle, BadgeCheck, XCircle } from "lucide-react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SkeletonTableView from "../../components/skeletontableview/SkeletonTableView";
import ErrorTable from "../../components/tableview/ErrorTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserDetails from "../../components/useDetails/UserDetails";
import UserDetailsSkeleton from "../../components/useDetails/UserDetailsSkeleton";

const PendingMembers = () => {
  const axiosPrivate = useAxiosPrivate();
  const tableHeadings = [
    "Member ID",
    "Name",
    "Father Name",
    "Surname",
    "Phone Number",
    "Email",
    "Current City",
    "Status",
  ];

  const [memberlist, setMemberlist] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(
    "Currently, there are no pending members!"
  );
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserDetailsSkeleton, setShowUserDetailsSkeleton] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    query: "",
    mobileNumber: "",
    country: "",
    state: "",
    city: "",
    halqa: "",
    page: currentPage,
  });

  const transformMemberData = (data) => {
    return data.map((member) => {
      let statusComponent;

      switch (member.status) {
        case "pending":
          statusComponent = (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-pending">Pending</Tooltip>}
            >
              <AlertCircle color="#fcb831" strokeWidth={2.75} />
            </OverlayTrigger>
          );
          break;
        case "approved":
          statusComponent = (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-approved">Approved</Tooltip>}
            >
              <BadgeCheck color="#1dd75b" strokeWidth={2.75} />
            </OverlayTrigger>
          );
          break;
        case "rejected":
          statusComponent = (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-rejected">Rejected</Tooltip>}
            >
              <XCircle color="#de3b40" strokeWidth={2.75} />
            </OverlayTrigger>
          );
          break;
        default:
          statusComponent = null;
      }

      return {
        member_id: member.membership_number,
        name: member.name,
        father_name: member.father_name,
        surname: member.surname,
        phone_number: member.mobile_number,
        email: member.email,
        current_city: member.address.current_city,
        status: statusComponent,
      };
    });
  };

  useEffect(() => {
    setTableLoading(true);
    const controller = new AbortController();
    const getMembers = async () => {
      try {
        const response = await axiosPrivate.get("/member-list?status=pending", {
          signal: controller.signal,
          params: searchCriteria,
        });

        if (response.data.errors) {
          setError(response.data.errors);
          setMemberlist([]);
        } else {
          const transformedData = transformMemberData(response.data.results);
          setTotalCount(response.data.count);
          setMemberlist(transformedData);
          setError(null);
        }
        setTableLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getMembers();
    return () => {
      controller.abort();
    };
  }, [searchCriteria, currentPage]);

  const handleRowClick = (member_id) => {
    // alert(JSON.stringify(member_id, null, 2));
    setSelectedMemberId(member_id);
    setShowUserDetailsSkeleton(true);
    const controller = new AbortController();
    const getMembers = async () => {
      try {
        const response = await axiosPrivate.get(
          `/get-member-by-member-id/${member_id}`,
          {
            signal: controller.signal,
          }
        );
        console.log("response", response);
        if (response.data.errors) {
          // setError(response.data.errors);
          // setMemberlist([]);
        } else {
          // const transformedData = transformMemberData(response.data.results);
          // setTotalCount(response.data.count);
          // setMemberlist(transformedData);
          // setError(null);
          setUserDetails(response.data.result);
        }
        // setTableLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setShowUserDetailsSkeleton(false); // Hide UserDetailsSkeleton after response
        setShowUserDetails(true);
      }
    };
    getMembers();
    return () => {
      controller.abort();
    };
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      page: selected + 1,
    }));
  };

  return (
    <div className="px-4">
      {showUserDetailsSkeleton ? (
        <UserDetailsSkeleton />
      ) : showUserDetails ? ( // Conditionally render UserDetails component
        <UserDetails
          user={userDetails}
          setShowUserDetails={setShowUserDetails}
          reloadUserList={() => {
            handleRowClick(selectedMemberId);
          }}
        />
      ) : (
        <>
          <SearchComponent
            setSearchCriteria={setSearchCriteria}
            setErrorMsg={setErrorMsg}
          />
          {tableLoading ? (
            <SkeletonTableView tableHeadings={tableHeadings} />
          ) : error ? (
            <ErrorTable tableHeadings={tableHeadings} errorMessage={errorMsg} />
          ) : memberlist.length === 0 ? (
            <ErrorTable tableHeadings={tableHeadings} errorMessage={errorMsg} />
          ) : (
            <TableView
              tableHeadings={tableHeadings}
              memberlist={memberlist}
              onRowClick={handleRowClick}
              totalCount={totalCount}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PendingMembers;
