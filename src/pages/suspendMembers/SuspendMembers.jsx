import React, { useEffect, useState } from "react";
import TableView from "../../components/tableview/TableView";
import SkeletonTableView from "../../components/skeletontableview/SkeletonTableView";
import ErrorTable from "../../components/tableview/ErrorTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "../../components/button/Button";
import SuspendedModal from "../../components/modal/SuspendedModal";
import Cookies from "js-cookie";
const SuspendMembers = () => {
  const axiosPrivate = useAxiosPrivate();
  const tableHeadings = [
    "Member ID",
    "Name",
    "Father Name",
    "Surname",
    "Phone Number",
    "Email",
    "Current City",
  ];

  const [memberlist, setMemberlist] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(
    "Currently, there are no suspended members!"
  );
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [suspendModal, setSuspendModal] = useState(false);
  const role = Cookies.get("role");
  const transformMemberData = (data) => {
    return data.map((member) => {
      return {
        member_id: member.membership_number,
        name: member.name,
        father_name: member.father_name,
        surname: member.surname,
        phone_number: member.mobile_number,
        email: member.email,
        current_city: member.address.current_city,
      };
    });
  };

  https: useEffect(() => {
    setTableLoading(true);
    const controller = new AbortController();
    const getMembers = async () => {
      try {
        const response = await axiosPrivate.get("/suspended-member-list", {
          signal: controller.signal,
          params: { page: currentPage },
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
  }, [currentPage, suspendModal]);

  const handleClick = (member) => {
    alert(JSON.stringify(member, null, 2));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleModalClose = () => {
    setSuspendModal(false);
  };
  return (
    <div className="px-4">
      {role === "Administrator" && (
        <div className="d-flex justify-content-end mb-3">
          <Button
            name="Suspend Member"
            variant="danger"
            onClick={() => setSuspendModal(true)}
          />
        </div>
      )}

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
          onRowClick={handleClick}
          totalCount={totalCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
      {suspendModal && (
        <SuspendedModal isOpen={suspendModal} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default SuspendMembers;
