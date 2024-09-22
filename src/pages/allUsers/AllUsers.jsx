import React, { useEffect, useState, useRef,  } from "react";
import TableView from "../../components/tableview/TableView";
import SkeletonTableView from "../../components/skeletontableview/SkeletonTableView";
import ErrorTable from "../../components/tableview/ErrorTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../../components/button/Button";
import EnableDisableModal from "../../components/modal/EnableDisableModal";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AllUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const controllerRef = useRef(null);
  const tableHeadings = [
    "Full Name",
    "Mobile Number",
    "Email  Address",
    "Type Of User",
    "Active",
    "Action",
  ];
  const [memberlist, setMemberlist] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(
    "Currently, there are no pending members!"
  );
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadPage, setLoadPage] = useState(false);
  const name = Cookies.get("username");
  const email = Cookies.get("email");


  // State for modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Function to open modal and set the selected user and action type
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setActionType(user.is_active === "True" ? "disable" : "enable");
    setModalOpen(true);
  };

  const transformMemberData = (data) => {
    return data
      .filter((user) => user.email !== email) // Filter out the user with the matching email
      .map((user) => ({
        name: user.full_name,
        mobile_number: user.mobile_number || "N/A",
        email: user.email,
        type_of_user: user.groups[0].name,
        active: user.is_active === "True" ? "Yes" : "No",
        button: (
          <Button
            name={user.is_active === "True" ? "Disable" : "Enable"}
            variant={user.is_active === "True" ? "danger" : "primary"}
            onClick={() => handleOpenModal(user)}
          />
        ),
      }));
  };

  useEffect(() => {
    setTableLoading(true);
    const controller = new AbortController();
    const getMembers = async () => {
      try {
        const response = await axiosPrivate.get("/get_users/", {
          params: { page: currentPage },
          signal: controller.signal,
        });

        if (response.data.errors) {
          setError(response.data.errors);
          setMemberlist([]);
        } else {
          // console.log(response.data.results);
          const transformedData = transformMemberData(response.data.results);
          setMemberlist(transformedData);
          setTotalCount(response.data.count);
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
  }, [loadPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleConfirmAction = async () => {
    setConfirmLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
  
    try {
      // API call to update user status (passing is_active as a Boolean)
      await axiosPrivate.put(
        `/update_user_status/${selectedUser.id}/`,
        { is_active: actionType === "enable" },  // is_active is true for enabling, false for disabling
        {
          signal: controller.signal,  // Pass the AbortController signal
        }
      );
  
      // Update the user list in local state
      setMemberlist((prevList) =>
        prevList.map((user) =>
          user.email === selectedUser.email
            ? { ...user, active: actionType === "enable" ? "Yes" : "No" }
            : user
        )
      );
  
      // Show success toast notification
      toast.success(
        `User ${actionType === "enable" ? "enabled" : "disabled"} successfully`,
        {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
          containerId: "1",
        }
      );
  
      // Close modal
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating user status:", error);
  
      // Show error toast notification
      toast.error("Error updating user status", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        containerId: "1",
      });
    } finally {
      // Reset loading state
      setConfirmLoading(false);
      setLoadPage(!loadPage)
    }
  };
  

  return (
    <div className="px-4">
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
          totalCount={totalCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
      <EnableDisableModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmAction}
        confirmReload={confirmLoading}
        actionType={actionType}
      />
    </div>
  );
};

export default AllUsers;
