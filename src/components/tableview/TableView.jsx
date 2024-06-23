import { Edit, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const TableView = ({
  memberlist,
  tableHeadings,
  actions,
  onRowClick,
  noCurve,
  totalCount,
  currentPage,
  handlePageChange,
}) => {
  const membersPerPage = 12;


  const pageCount = Math.ceil(totalCount / membersPerPage);

  const TableHeadStyle = {
    backgroundColor: `var(--primary-color)`,
    color: `var( --secondary-color)`,
    height: "55px" /* Increase the height of the table head */,
  };

  const TableFirstHeadStyle = {
    ...TableHeadStyle,
    borderTopLeftRadius: noCurve ? "0" : "6px",
  };

  const TableLastHeadStyle = {
    ...TableHeadStyle,
    borderTopRightRadius: noCurve ? "0" : "6px",
  };

  const TableDataStyle = {
    height: "55px" /* Increase the height of the table head */,
  };
  return (
    <>
      <div className="table-container">
        <div className="table-responsive  p-0 m-0">
          <ScrollableTableContainer className="table table-hover p-0 m-0 rounded-3 ">
            <thead style={{ verticalAlign: "middle" }} className="rounded-top">
              <tr>
                {tableHeadings.map((heading, index) => {
                  let style = TableHeadStyle;
                  if (index === 0) {
                    style = TableFirstHeadStyle;
                  } else if (index === tableHeadings.length - 1) {
                    style = TableLastHeadStyle;
                  }
                  return (
                    <th key={index} scope="col" style={style}>
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody style={{ verticalAlign: "middle" }} className="border">
              {memberlist.map((member, index) => (
                <tr
                  key={index}
                  onClick={onRowClick ? () => onRowClick(member.member_id) : undefined}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {Object.keys(member).map((key, subIndex) => (
                    <td
                      key={subIndex}
                      style={TableDataStyle}
                      className={member[key] === null ? "ps-4 ms-2" : ""}
                    >
                      {member[key] === null || "" ? "-----" : member[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </ScrollableTableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"<"}
          pageRangeDisplayed={5}
          nextLabel={">"}
          forcePage={currentPage - 1}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          className="d-flex justify-content-center gap-2 align-items-center mt-3"
          pageClassName="pagination-item border align-items-center"
          nextClassName="next-link border "
          previousClassName="prev-link border"
          previousLinkClassName="page-link "
          nextLinkClassName="page-link"
          activeClassName="active-page"
        />
      </div>
    </>
  );
};

export default TableView;

const ScrollableTableContainer = styled.table`
  overflow-x: auto;
  white-space: nowrap;

  /* Scrollbar styles for Webkit browsers */
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: var(--primary-color);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--secondary-color);
    border-radius: 10px;
    border: 3px solid var(--primary-color);
  }

  /* Scrollbar styles for Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--secondary-color) var(--primary-color);
`;
