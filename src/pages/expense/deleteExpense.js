import * as React from "react";
import axios from "axios";
import deployURL from "../../constants/constants";

const deleteExp = ({ row, token }) => {
    axios({
        method: "delete",
        url:
            `${deployURL}/api/expense/` +
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

export default deleteExp;
