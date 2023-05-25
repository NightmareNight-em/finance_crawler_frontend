import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { fetchAllIncomes } from "../redux/slices/income/incomeSlices";
import { fetchAllExpenses } from "../redux/slices/expense/expenseSlices";

export default function Chart() {
  //getting expense
  const state = useSelector((state) => state?.users);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllExpenses({ id: state?.userAuth?.id }));
  }, [dispatch]);

  const {
    loading: l1,
    appErr: a1,
    serverErr: s1,
    expenseListwop,
  } = useSelector((state) => state?.expense);

  React.useEffect(() => {
    dispatch(fetchAllIncomes({ id: state?.userAuth?.id }));
  }, [dispatch]);

  const { loading, appErr, serverErr, incomeListwop } = useSelector(
    (state) => state?.income
  );

  const mapMonths = new Map([
    ["01", "Jan"],
    ["02", "Feb"],
    ["03", "Mar"],
    ["04", "Apr"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "Aug"],
    ["09", "Sept"],
    ["10", "Oct"],
    ["11", "Nov"],
    ["12", "Dec"],
  ]);

  let exp = [];
  expenseListwop?.forEach(function (d) {
    exp.push({
      month: mapMonths.get(
        d?.createdAt.substring(0, d?.createdAt.indexOf("T")).split("-")[1]
      ),
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
      month: mapMonths.get(
        d?.createdAt.substring(0, d?.createdAt.indexOf("T")).split("-")[1]
      ),
      income: d?.amount,
    });
  });

  const mapI = new Map();
  inc.forEach((d) => {
    mapI.set(d.month, (mapI.get(d.month) || 0) + d.income);
  });

  const res = [];
  // merging both income mapI and expense mapE
  if(mapE.size)
    for (const [key, value] of mapE.entries()) {
      res.push({ month: key, expense: value, income: mapI.get(key) });
    }
  else
    for (const [key, value] of mapI.entries()) {
      res.push({ month: key, expense: mapE.get(key), income: value });
    }


  return l1 || loading ? (
    <img
      src={require("../images/bounce.gif")}
      alt="cash"
      style={{ height: "80%", width: "50%", alignSelf: "center" }}
    />
  ) : a1 || s1 || appErr || serverErr ? (
    <h1>Error</h1>
  ) : (
    <React.Fragment>
      <Title>Expense & Income Month wise</Title>
      <ResponsiveContainer>
        <LineChart
          data={res}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="month" interval={"preserveStartEnd"} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="income" stroke="black" activeDot={{ r: 8 }} />
          <Line dataKey="expense" stroke="red" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
