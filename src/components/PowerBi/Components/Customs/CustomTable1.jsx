import React, { useState, useRef, useEffect } from "react";

// import { determineRelationshipsAmongTables } from "../../pages/ManageMiniPowerBi/Services/getRelships.js";
import { determineRelationshipsAmongTables } from "../../Services/getRelships.js";
import "./CustomTable1.css"; // Import the CSS file for styling
import {
  categorizeColumns,
  createTotalRow,
  manyToMany,
  mergeSumsWithRows,
  processRows,
} from "../../Services/manyToMany.js";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ProffesionalTable = ({ item, data, defaultWidth }) => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage] = useState(20);
  const [columnWidths, setColumnWidths] = useState({});
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleData, setVisibleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalRow, setTotalRow] = useState(null);
  const [tableWidth, setTableWidth] = useState(null);

  const headerRefs = useRef({});
  const tableRef = useRef(null);
  const tableHead = useRef(null);
  const rowHeight = `${item?.rowHeight}px`; // Height of each row
  const { headerFontSize, headerFontWeight, dataFontSize, dataFontWeight } =
    item;

  const visibleRows = 10; // Number of visible rows
  const totalRows = tableData?.length;

  // Calculate the start and end indices of visible rows
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(startIndex + visibleRows, totalRows - 1);

  // Handle sorting
  const handleSort = (key, isChange, resultArray) => {
    if (key) {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        if (isChange !== "noChange") direction = "desc";
      }
      if (isChange === "noChange") direction = sortConfig.direction;

      setSortConfig({ key, direction });

      const sortedData = [...resultArray].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });

      setTableData(sortedData);
    }
  };

  // Handle column resizing
  const handleResize = (key, event) => {
    event.preventDefault();
    const headerElement = headerRefs.current[key];
    const initialWidth = headerElement.offsetWidth;
    const initialX = event.clientX;

    const onMouseMove = (e) => {
      const newWidth = initialWidth + (e.clientX - initialX);
      setColumnWidths((prev) => ({ ...prev, [key]: `${newWidth}px` }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Function to reset column width on double-click
  const handleResetColumnWidth = (key) => {
    // Reset column width to auto
    setColumnWidths((prev) => {
      const newWidths = { ...prev };
      delete newWidths[key];
      return newWidths;
    });

    // Trigger explicit width recalculation after resetting
    // setTimeout(() => {
    //   recalculateColumnWidths();
    // }, 0);
  };

  // const recalculateColumnWidths = () => {
  //   const newWidths = {};
  //   Object.keys(headerRefs.current).forEach((key) => {
  //     const headerCell = headerRefs.current[key];
  //     if (headerCell) {
  //       const computedWidth = headerCell.getBoundingClientRect().width;
  //       newWidths[key] = `${computedWidth}px`;
  //     }
  //   });
  //   setColumnWidths(newWidths); // Update column widths
  // };

  // Watch for changes in columnWidths and force layout recalculation
  useEffect(() => {
    if (tableRef.current) {
      // Trigger a reflow to ensure alignment
      tableRef.current.style.display = "none";
      // tableRef.current.offsetHeight; // Trigger reflow
      tableRef.current.style.display = "";
    }
  }, [columnWidths]);

  // Filter data based on search term
  // const filteredData = tableData?.filter((row) =>
  //   Object.values(row).some((value) =>
  //     value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  // Pagination logic
  const indexOfLastRow = rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData?.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    if (!data || !item || !item.columns) return;

    // const table = tableRef.current.getBoundingClientRect();
    // setTableWidth(table?.width);
    // console.log(item.columns);
    setIsTableLoading(true);
    try {
      const tables = [];
      console.log(item);
      // Step 1: Categorize columns
      const { nonNumericColumns, numericColumns } = categorizeColumns(
        item.columns,
        data
      );

      item.columns.map((el) => {
        if (!tables.includes(el.table)) tables.push(el.table);
      });
      const relships = determineRelationshipsAmongTables(
        tables.map((el) => data[el].data),
        nonNumericColumns
      );
      // console.log(relships);

      const { resultArray, sumResults, totalRow } = manyToMany(
        data,
        item,
        nonNumericColumns,
        numericColumns
      );
      // resultArray.push(totalRow);

      // console.log(resultArray);
      // console.log(sumResults);
      // Step 5: Update state
      setTableData(resultArray);
      setTotalRow(totalRow); // Store the "Total" row separately
      // console.log(sortConfig);
      handleSort(sortConfig.key, "noChange", resultArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTableLoading(false);
    }
  }, [data, item]);

  useEffect(() => {
    currentRows?.map((row) => {
      Object.keys(row).map((key) => {
        setColumnWidths((prev) => ({ ...prev, [key]: defaultWidth }));
      });
    });
    // handleSort(sortConfig.key);
  }, [tableData]);

  useEffect(() => {
    setVisibleData(currentRows);
  }, [tableData]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setScrollTop(scrollTop);
    // Check if the user has scrolled to the bottom
    if (
      visibleData.length < tableData.length &&
      scrollHeight - scrollTop - clientHeight <= 5 &&
      !isLoading
    ) {
      loadMoreData();
    }
    // if (scrollHeight - scrollTop - clientHeight <= 5 && !isLoading && hasMore) {
    //   loadMoreData();
    // }
  };

  const loadMoreData = () => {
    setIsLoading(true);
    // Simulate an API call or data fetch
    setTimeout(() => {
      const newData = tableData?.slice(
        visibleData?.length,
        visibleData?.length + rowsPerPage
      ); // Replace this with your data fetching logic
      if (newData.length > 0) {
        setVisibleData((prevData) => [...prevData, ...newData]);
      } else {
        console.log("end");
        setHasMore(false);
      }
      setIsLoading(false);
    }, 100);
  };

  useEffect(() => {
    setHasMore(true);
  }, [tableData]);

  // Calculate the total height of the table for the scrollable container
  const tableHeight = rowHeight * totalRows;

  if (isTableLoading)
    return <div className="w-full h-full text-[10px] p-1">Loading...</div>;
  return (
    <div
      className="w-full h-full overflow-x-auto table_container flex flex-col justify-start p-1"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <section
        ref={tableRef}
        className="table__body relative dark:bg-background-logoColor"
        style={{ userSelect: "none", height: tableHeight }}
        onScroll={handleScroll}
      >
        <table>
          <thead
            style={{
              fontSize: `${headerFontSize}px`,
              fontWeight: headerFontWeight,
            }}
            className="dark:bg-gray-800"
          >
            <tr>
              {tableData &&
                tableData[0] &&
                item?.columns?.map((key, idx) => (
                  <th
                    key={idx}
                    style={{
                      width: columnWidths[key.name]
                        ? columnWidths[key.name]
                        : "auto",
                      fontSize: `${headerFontSize}px`,
                      fontWeight: headerFontWeight,
                    }}
                    className="dark:bg-gray-800"
                  >
                    <div
                      className="header-content dark:bg-gray-800 dark:text-white"
                      ref={(el) => (headerRefs.current[key.name] = el)}
                    >
                      <div
                        className="w-full flex flex-row items-center justify-start text-[hsl(0,0%,0%)] dark:text-white"
                        onClick={() => handleSort(key.name, null, tableData)}
                      >
                        <span className="par-content">{key.name}</span>
                        {sortConfig.key === key.name && (
                          <span className="sort-arrow">
                            {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="resize-handle dark:bg-gray-600"
                        onMouseDown={(e) => handleResize(key.name, e)}
                        onDoubleClick={() => handleResetColumnWidth(key.name)}
                      ></div>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody
            style={{
              fontSize: `${dataFontSize}px`,
              fontWeight: dataFontWeight,
            }}
            className="dark:bg-gray-700 dark:text-white"
          >
            {visibleData?.map((row, index) => (
              <tr
                key={index}
                style={{ height: rowHeight }}
                className="dark:hover:bg-gray-500"
              >
                {item?.columns?.map((key, idx) => (
                  <td
                    key={idx}
                    style={{
                      width: columnWidths[key.name]
                        ? columnWidths[key.name]
                        : "auto",
                      fontSize: `${dataFontSize}px`,
                      fontWeight: dataFontWeight,
                    }}
                  >
                    <div
                      className=""
                      // className="cell-content"
                      // style={{
                      //   width: columnWidths[key] ? columnWidths[key] : "auto",
                      //   fontSize: `${dataFontSize}px`,
                      //   fontWeight: dataFontWeight,
                      // }}
                    >
                      <p className="par-content text-[hsl(0,0%,30%)] dark:text-white">
                        {!isNaN(row[key.name]) &&
                        key.name !== "ID" &&
                        row[key.name] !== ""
                          ? formatter.format(row[key.name])
                          : row[key.name]}
                      </p>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {totalRow && (
            <tfoot
              style={{
                fontSize: `${headerFontSize}px`,
                fontWeight: headerFontWeight,
              }}
              className="dark:bg-gray-800 dark:text-white"
            >
              <tr style={{ height: rowHeight }}>
                {item.columns.map((col, idx) => (
                  <td
                    className="footer-data dark:bg-gray-800 dark:text-white"
                    key={idx}
                    style={{
                      position: "sticky",
                      bottom: 0,
                      left: 0,
                      width: columnWidths[col.name]
                        ? columnWidths[col.name]
                        : "auto",
                      fontSize: `${headerFontSize}px`,
                      fontWeight: headerFontWeight,
                    }}
                  >
                    <div>
                      <p className="cell-content text-[hsl(0,0%,0%)] dark:text-white">
                        {!isNaN(totalRow[col.name]) && totalRow[col.name] !== ""
                          ? formatter.format(totalRow[col.name])
                          : totalRow[col.name]}
                      </p>
                    </div>
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>

        {/* Total Row */}
        {/* {totalRow && (
          <div
            className="sticky-total-row"
            style={{
              borderTop: "1px solid black",
              marginTop: "10px",
              position: "sticky",
              bottom: 0,
              zIndex: 2,
            }}
          >
            <table>
              <tbody>
                <tr style={{ height: rowHeight }}>
                  {item.columns.map((col, idx) => (
                    <td
                      key={idx}
                      style={{
                        position: "sticky",
                        bottom: 0,
                        left: 0,
                        width: columnWidths[col.name]
                          ? columnWidths[col.name]
                          : "auto",
                        fontSize: `${headerFontSize}px`,
                        fontWeight: headerFontWeight,
                      }}
                    >
                      <div
                      >
                        <p className="cell-content text-[hsl(0,0%,0%)]">
                          {!isNaN(totalRow[col.name]) &&
                          totalRow[col.name] !== ""
                            ? formatter.format(totalRow[col.name])
                            : totalRow[col.name]}
                        </p>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )} */}
      </section>
    </div>
  );
};

export default ProffesionalTable;
