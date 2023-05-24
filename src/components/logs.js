import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { fetchSingleIncwop } from "../redux/slices/income/incomeSlices";
import { fetchSingleExpwop } from "../redux/slices/expense/expenseSlices";
import { useDispatch, useSelector } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const state = useSelector((state) => state?.users);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchSingleExpwop({ id: state?.userAuth?.id }));
  }, [dispatch]);

  const {
    loading: l1,
    appErr: a1,
    serverErr: s1,
    expenseListwop,
  } = useSelector((state) => state?.expense);

  React.useEffect(() => {
    dispatch(fetchSingleIncwop({ id: state?.userAuth?.id }));
  }, [dispatch]);

  const { loading, appErr, serverErr, incomeListwop } = useSelector(
    (state) => state?.income
  );

  const mapMonths = new Map([
    ["01", "January"],
    ["02", "February"],
    ["03", "March"],
    ["04", "April"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "August"],
    ["09", "September"],
    ["10", "October"],
    ["11", "November"],
    ["12", "December"],
  ]);

  let exp = [];
  expenseListwop?.forEach(function (d) {
    exp.push({
      month: d?.createdAt.substring(0, d?.createdAt.indexOf("T")).split("-")[1],
      expense: d?.amount,
    });
  });

  const mapE = new Map();
  exp.forEach((d) => {
    mapE.set(d.month, (mapE.get(d.month) || 0) + d.expense);
  });

  let inc = [];
  incomeListwop?.forEach(function (d) {
    inc.push({
      month: d?.createdAt.substring(0, d?.createdAt.indexOf("T")).split("-")[1],
      income: d?.amount,
    });
  });

  const mapI = new Map();
  inc.forEach((d) => {
    mapI.set(d.month, (mapI.get(d.month) || 0) + d.income);
  });

  const savings =
    mapI.get("0" + String(new Date().getMonth() + 1)) -
    mapE.get("0" + String(new Date().getMonth() + 1));
  const currMonth = mapMonths.get("0" + String(new Date().getMonth() + 1));

  return (
    <React.Fragment>
      <Title>Current Month Savings</Title>
      <Typography component="p" variant="h4">
        <i className="fa fa-inr" style={{ fontSize: "30px" }}></i>
        {savings || 0}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {currMonth}
      </Typography>
    </React.Fragment>
  );
}
