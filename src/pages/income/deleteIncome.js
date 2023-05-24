import * as React from "react";
// import { deleteExp } from "../../redux/slices/expense/expenseSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-native";

const DeleteInc = ({ row, token }) => {
  axios({
    method: "delete",
    url:
      "https://finance-crawler-ah.herokuapp.com/api/income/" +
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
      Alert.alert(error);
      // window.location.href = "/table";
    })
    .then(function (response) {
      // console.log(response.data);
      let res = response.data;
      window.location.href =
        "https://finance-crawler.netlify.app/incomeDashboard";
    });
};

export default DeleteInc;
