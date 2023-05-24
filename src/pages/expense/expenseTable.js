import * as React from "react";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../components/Title";
import { fetchSingleExp } from "../../redux/slices/expense/expenseSlices";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AppPagination from "../../components/appPagination";
import dateFormatter from "../../utils/dateFormatter";
// import { deleteExp } from "../../redux/slices/expense/expenseSlices";
import DeleteExp from "./deleteExpense";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function preventDefault(event) {
  event.preventDefault();
}

export default function ExpenseTable() {
  const [page, setPage] = React.useState(1);
  // console.log(page);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.users);
  // const effect = React.useEffect();
  React.useEffect(() => {
    dispatch(fetchSingleExp({ page: page, id: state?.userAuth?.id }));
  }, [dispatch, page, setPage]);

  const { loading, appErr, serverErr, expenseList } = useSelector(
    (state) => state?.expense
  );

  return (
    <>
      <Title>Recent Expense Transactions</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Withdrawed by</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Amount (in INR)</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Edit/Delete</StyledTableCell>
              {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell> */}
              {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <img
                src={require("../../images/expense.gif")}
                alt="cash"
                style={{ height: "80%", width: "50%", alignSelf: "center" }}
              />
            ) : appErr || serverErr ? (
              <h2>
                {appErr} {serverErr}
              </h2>
            ) : expenseList?.docs?.length <= 0 ? (
              <h2>Expenses not found!</h2>
            ) : (
              expenseList?.exp?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.user.firstname} {row.user.lastname}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">
                    {dateFormatter(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      onClick={() => {
                        navigate("/expenseDashboard/editExpense", {
                          state: { expense: row },
                        });
                      }}
                      className="badge bg-success-light text-success"
                      style={{ border: "none", background: "none" }}
                    >
                      <Avatar
                        sx={{
                          m: 0.1,
                          bgcolor: "blue",
                          height: "30px",
                          width: "30px",
                        }}
                      >
                        <EditIcon />
                      </Avatar>
                    </button>

                    <button
                      onClick={() => {
                        // console.log("here");
                        DeleteExp({ row: row, token: state?.userAuth?.token });
                      }}
                      className="badge bg-success-light text-success"
                      style={{ border: "none", background: "none" }}
                    >
                      <Avatar
                        sx={{
                          m: 0.1,
                          bgcolor: "blue",
                          height: "30px",
                          width: "30px",
                        }}
                      >
                        <DeleteIcon />
                      </Avatar>
                    </button>
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell> */}
                  {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <AppPagination setPage={setPage} totalPages={expenseList?.totalPages} />
      </div>
    </>
  );
}
