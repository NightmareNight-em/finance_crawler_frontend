import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginuserAction } from "../../redux/slices/users/userSlices";
import DisabledButton from "../../components/disabledButton";
import { useNavigate } from "react-router-dom";
import { createExp } from "../../redux/slices/expense/expenseSlices";
import { mainListItems } from "../../components/drawer";

import BackButton from "../../components/backButton";

//form validation
const validateForm = Yup.object({
  title: Yup.string().required("Title is required.").matches(/^(?!\s)[\w\s-]*$/, 'This field cannot start with a blankspace.'),

  description: Yup.string().required("Description is required.").matches(/^(?!\s)[\w\s-]*$/, 'This field cannot start with a blankspace.'),

  amount: Yup.number().required("Amount is required.").test(
    'Is positive?', 
    'ERROR: The number must be greater than 0!', 
    (value) => value > 0
  ),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Finance Crawler
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function AddExpense() {
  const navigate = useNavigate(); // for redirect
  const dispatch = useDispatch();
  const getState = useSelector((state) => state?.expense);
  // console.log(getState);
  const { appErr, serverErr, loading, expense } = getState;

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   axios
  //     .post("http://localhost:8080/api/users/login", {
  //       amount: data.get("amount"),
  //       description: data.get("description"),
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //       let res = response.data;
  //       window.location.href = "/dashboard";
  //     })
  //     .catch(function (error) {
  //       // console.log(error);
  //       window.location.href = "/register";
  //     });

  //   console.log({
  //     amount: data.get("amount"),
  //     description: data.get("description"),
  //   });
  // };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(createExp(values));
    },
    validationSchema: validateForm,
  });

  React.useEffect(() => {
    if (expense) {
      navigate("/expenseDashboard");
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <BackButton page={"/expenseDashboard"}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue" }}>
            <CurrencyRupeeOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Expense
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Enter title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <div className="text-danger mb-2">
              {formik.touched.title && formik.errors.title}
            </div>
            <TextField
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              margin="normal"
              required
              fullWidth
              name="description"
              label="Enter description"
              type="description"
              id="description"
              autoComplete="current-description"
            />
            <div className="text-danger mb-2">
              {formik.touched.description && formik.errors.description}
            </div>
            <TextField
              value={formik.values.amount}
              onChange={formik.handleChange("amount")}
              onBlur={formik.handleBlur("amount")}
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Enter amount"
              name="amount"
              autoComplete="amount"
              autoFocus
            />
            <div className="text-danger mb-2">
              {formik.touched.amount && formik.errors.amount}
            </div>
            {loading ? (
              <DisabledButton />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            )}

            {/* Display error */}
            {appErr || serverErr ? (
              <div className="alert alert-danger" role="alert">
                {appErr} {serverErr}
              </div>
            ) : null}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
