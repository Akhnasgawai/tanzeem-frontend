import React from "react";

import styled from "styled-components";

const SkeletonTableView = ({ tableHeadings, errorMessage }) => {
  const TableHeadStyle = {
    backgroundColor: `var(--primary-color)`,
    color: `var(--secondary-color)`,
    height: "55px",
  };

  const TableFirstHeadStyle = {
    backgroundColor: `var(--primary-color)`,
    color: `var(--secondary-color)`,
    height: "55px",
    borderTopLeftRadius: "6px",
  };

  const TableLastHeadStyle = {
    backgroundColor: `var(--primary-color)`,
    color: `var(--secondary-color)`,
    height: "55px",
    borderTopRightRadius: "6px",
  };

  const TableDataStyle = {
    height: "55px",
  };

  return (
    <div className="table-container">
      <div className="table-responsive p-0 m-0">
        <ScrollableTableContainer className="table table-hover p-0 m-0 rounded-3">
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
            <tr className="text-center text-danger">
              <td
                colSpan={tableHeadings.length}
                className="text-danger fw-bold"
              >
               {errorMessage}
              </td>
            </tr>
          </tbody>
        </ScrollableTableContainer>
      </div>
    </div>
  );
};

export default SkeletonTableView;

const ScrollableTableContainer = styled.table`
  overflow-x: auto;
  white-space: nowrap;

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

  scrollbar-width: thin;
  scrollbar-color: var(--secondary-color) var(--primary-color);
`;
