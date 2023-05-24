import * as React from "react";
import Pagination from "@mui/material/Pagination";
const AppPagination = ({ totalPages, setPage }) => {
  return (
    <Pagination count={totalPages} onChange={(event, val) => setPage(val)} />
  );
};

export default AppPagination;
