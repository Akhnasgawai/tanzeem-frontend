import React, { useEffect, useState } from "react";
import TableView from "../../components/tableview/TableView";
import styled from "styled-components";
import SelectField from "../../components/selectField/SelectField";
import SkeletonTableView from "../../components/skeletontableview/SkeletonTableView";
import ErrorTable from "../../components/tableview/ErrorTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PaymentModal from "../../components/modal/PaymentModal";
import Button from "../../components/button/Button";

const Membership = () => {
  const axiosPrivate = useAxiosPrivate();
  const tableHeadings = [
    "Member ID",
    "Name",
    "Father Name",
    "Surname",
    "Amount",
    "Status",
  ];

  const [memberlist, setMemberlist] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(
    "Currently, there are no membership details for this year!"
  );
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentModal, setPaymentModal] = useState();

  const transformMemberData = (data) => {
    return data.map((membership) => {
      const {
        member: { name, father_name, membership_number, surname },
        amount,
        fee_status,
      } = membership;

      return {
        membership_id: membership_number,
        name,
        father_name,
        surname,
        amount,
        status: fee_status,
      };
    });
  };

  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year >= endYear; year--) {
      years.push({ value: year, label: year });
    }
    return years;
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = generateYearOptions(currentYear, 1900);

  const [year, setYear] = useState(new Date().getFullYear());

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption.value);
  };

  https: useEffect(() => {
    setTableLoading(true);
    const controller = new AbortController();
    const getMembers = async () => {
      try {
        const response = await axiosPrivate.get("/view_membership_fee", {
          params: { year: year, page: currentPage },
          signal: controller.signal,
        });

        if (response.data.errors) {
          setError(response.data.errors);
          setMemberlist([]);
        } else {
          console.log(response.data.results);
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
  }, [year, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleModalClose = () => {
    setPaymentModal(false);
  };

  return (
    <div className="px-4">
      <div className="d-flex justify-content-end mb-3">
        <Button
          name="Add Payment"
          variant="primary"
          onClick={() => setPaymentModal(true)}
        />
      </div>
      <div
        className="row d-flex border-bottom p-2 mx-0 justify-content-between align-items-center"
        style={{
          backgroundColor: `var(--primary-color)`,
          color: `var(--secondary-color)`,
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
        }}
      >
        <h3 className="col-md-6">Membership of the year</h3>
        <div className="col-md-4">
          <SelectField
            options={yearOptions}
            value={year}
            name="year"
            onChange={handleYearChange}
          />
        </div>
      </div>
      {tableLoading ? (
        <SkeletonTableView tableHeadings={tableHeadings} />
      ) : error ? (
        <ErrorTable tableHeadings={tableHeadings} errorMessage={errorMsg} />
      ) : memberlist.length === 0 ? (
        <ErrorTable tableHeadings={tableHeadings} errorMessage={errorMsg} />
      ) : (
        <TableView
          noCurve={true}
          tableHeadings={tableHeadings}
          memberlist={memberlist}
          totalCount={totalCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          // onRowClick={handleClick}
        />
      )}
      {paymentModal && (
        <PaymentModal isOpen={paymentModal} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Membership;
