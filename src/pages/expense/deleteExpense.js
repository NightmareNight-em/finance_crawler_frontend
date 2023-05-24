import * as React from "react";
import { deleteExp } from "../../redux/slices/expense/expenseSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DeleteExp = ({ row, token }) => {
  axios({
    method: "delete",
    url:
      "https://finance-crawler-ah.herokuapp.com/api/expense/" +
      row?._id +
      "/delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer:" + token,
    },
    validateStatus: (status) => {
      return true; // I'm always returning true, you may want to do it depending on the status received
    },
  })
    .catch(function (error) {
      // window.location.href = "/table";
    })
    .then(function (response) {
      // console.log(response.data);
      let res = response.data;
      window.location.href = "/expenseDashboard";
    });
};

export default DeleteExp;
