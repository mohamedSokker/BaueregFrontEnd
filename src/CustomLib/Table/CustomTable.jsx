import React, { useState, useRef, useEffect } from "react";
import "./CustomTable.css"; // Import the CSS file for styling

const ProffesionalTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [columnWidths, setColumnWidths] = useState({});
  const [paginationGroup, setPaginationGroup] = useState(0);
  const headerRefs = useRef({});

  console.log(columnWidths);

  useEffect(() => {
    setTableData(data);
  }, [data]);
  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setTableData(sortedData);
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Handle column resizing
  const handleResize = (key, event) => {
    const { clientX } = event;
    const initialWidth = headerRefs.current[key].offsetWidth;
    const initialX = event.clientX;

    const onMouseMove = (e) => {
      const newWidth = initialWidth + (e.clientX - initialX);
      setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Filter data based on search term
  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Pagination group logic
  const pagesPerGroup = 5;
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  const getPaginationGroup = () => {
    const start = paginationGroup * pagesPerGroup;
    return new Array(pagesPerGroup)
      .fill()
      .map((_, idx) => start + idx + 1)
      .filter((page) => page <= totalPages);
  };

  const goToFirstGroup = () => {
    setPaginationGroup(0);
    setCurrentPage(1);
  };

  const goToLastGroup = () => {
    setPaginationGroup(totalGroups - 1);
    setCurrentPage((totalGroups - 1) * pagesPerGroup + 1);
  };

  const goToNextGroup = () => {
    if (paginationGroup < totalGroups - 1) {
      setPaginationGroup((prev) => prev + 1);
      setCurrentPage((paginationGroup + 1) * pagesPerGroup + 1);
    }
  };

  const goToPreviousGroup = () => {
    if (paginationGroup > 0) {
      setPaginationGroup((prev) => prev - 1);
      setCurrentPage((paginationGroup - 1) * pagesPerGroup + 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead className="sticky">
          <tr className="sticky">
            {tableData &&
              tableData[0] &&
              Object.keys(tableData[0]).map((key) => (
                <th
                  className="sticky"
                  key={key}
                  ref={(el) => (headerRefs.current[key] = el)}
                  style={{
                    minWidth: columnWidths[key] ? columnWidths[key] : "10px",
                  }}
                >
                  <div className="header-content">
                    <span onClick={() => handleSort(key)}>
                      {key}
                      {sortConfig.key === key && (
                        <span className="sort-arrow">
                          {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                        </span>
                      )}
                    </span>
                    <div
                      className="resize-handle"
                      onMouseDown={(e) => handleResize(key, e)}
                      onDoubleClick={() => {
                        setColumnWidths((prev) => ({
                          ...prev,
                          [key]: undefined,
                        }));
                      }}
                    ></div>
                    {/* <div
                      className="filter-icon"
                      onClick={() => alert(`Filter by ${key}`)}
                    >
                      ⚙️
                    </div> */}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key) => (
                <td
                  key={key}
                  style={{
                    minWidth: columnWidths[key] ? columnWidths[key] : "10px",
                  }}
                >
                  <div
                    className="cell-content"
                    // style={{
                    //   minWidth: columnWidths[key] ? columnWidths[key] : "auto",
                    // }}
                  >
                    <p className="cell-content">
                      {
                        // row[key]?.toString().length > 20
                        //   ? `${row[key]?.toString().substring(0, 20)}...`
                        //   :
                        row[key]
                      }
                    </p>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={goToFirstGroup} disabled={paginationGroup === 0}>
          {"<<"}
        </button>
        <button onClick={goToPreviousGroup} disabled={paginationGroup === 0}>
          {"<"}
        </button>
        {getPaginationGroup().map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={goToNextGroup}
          disabled={paginationGroup === totalGroups - 1}
        >
          {">"}
        </button>
        <button
          onClick={goToLastGroup}
          disabled={paginationGroup === totalGroups - 1}
        >
          {">>"}
        </button>
        {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default ProffesionalTable;
