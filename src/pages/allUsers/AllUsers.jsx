import React, { useEffect, useState } from "react";
import TableView from "../../components/tableview/TableView";
import SkeletonTableView from "../../components/skeletontableview/SkeletonTableView";
import ErrorTable from "../../components/tableview/ErrorTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AllUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const tableHeadings = [
    "Full Name",
    "Mobile Number",
    "Email  Address",
    "Type Of User",
    "Active",
  ];
  const [memberlist, setMemberlist] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(
    "Currently, there are no pending members!"
  );
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const response = [
  //     {
  //       id: "194e1a6e-0aaa-4d93-b10b-392273f171b8",
  //       full_name: "Test User",
  //       email: "akhnas.m@pacewisdom.com",
  //       groups: [
  //         {
  //           id: 2,
  //           name: "Ordinary User",
  //         },
  //       ],
  //       is_active: "True",
  //       mobile_number: "9611767704",
  //     },
  //     {
  //       id: "3d9fdf4b-7e13-4aaa-9794-10500d304deb",
  //       full_name: "Fathima Desai",
  //       email: "fatsdesai2018@gmail.com",
  //       groups: [
  //         {
  //           id: 1,
  //           name: "Administrator",
  //         },
  //       ],
  //       is_active: "True",
  //       mobile_number: "8105209115",
  //     },
  //     {
  //       id: "3b838658-8494-4b26-8f3f-eafd0f46f50c",
  //       full_name: "fathima",
  //       email: "fathima.d@pacewisdom.com",
  //       groups: [
  //         {
  //           id: 2,
  //           name: "Ordinary User",
  //         },
  //       ],
  //       is_active: "True",
  //       mobile_number: "8105209115",
  //     },
  //     {
  //       id: "1ddcd885-3578-4eb2-9d57-e4ad345c827e",
  //       full_name: "John",
  //       email: "akhnasg@gmail.com",
  //       groups: [
  //         {
  //           id: 1,
  //           name: "Administrator",
  //         },
  //       ],
  //       is_active: "True",
  //       mobile_number: "",
  //     },
  //   ];

  //   setMemberlist(transformedData);
  // }, []);

  const transformMemberData = (data) => {
    return data.map((user) => ({
      name: user.full_name,
      mobile_number: user.mobile_number || "N/A",
      email: user.email,
      type_of_user: user.groups[0].name,
      active: user.is_active === "True" ? "Yes" : "No",
    }));
  };

  https: useEffect(() => {
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
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
 
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
    </div>
  );
};

export default AllUsers;
