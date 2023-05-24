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
import { fetchSingleIncwop } from "../redux/slices/income/incomeSlices";
import { fetchSingleExpwop } from "../redux/slices/expense/expenseSlices";

export default function Chart() {
  //getting expense
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
  for (const [key, value] of mapE.entries()) {
    res.push({ month: key, expense: value, income: mapI.get(key) });
  }

  // let collectionI = expenseListwop?.map((x) => ({
  //   month: x.createdAt.substring(0, x.createdAt.indexOf("T")).split("-")[1],
  //   expense: x.amount,
  // }));
  // console.log(collectionI);
  // var resI = {};
  // collectionI.forEach(function (d) {
  //   if (resI.hasOwnProperty(d.month)) {
  //     resI[d.month] = resI[d.month] + d.value;
  //   } else {
  //     resI[d.month] = d.value;
  //   }
  // });

  // var objI = [];
  // for (var prop in resI) {
  //   objI.push({ month: prop, income: resI[prop] });
  // }

  // console.log(objI);

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

// const [respI, SetrespI] = React.useState("ll");
// const theme = useTheme();
// const state = useSelector((state) => state?.users);
// const id = state?.userAuth?.id;
// const token = state?.userAuth?.token;
// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer:" + token,
//   },
// };

// let collectionE;
// let collectionI;
// let respI = ["ll"];
// //getting income
// const getIncome = () => {
//   axios({
//     method: "get",
//     url: "http://localhost:8080/api/income/wop/" + id,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer:" + token,
//     },
//     validateStatus: (status) => {
//       return true; // I'm always returning true, you may want to do it depending on the status received
//     },
//   })
//     .catch(function (error) {
//       console.log(error);
//       // window.location.href = "/table";
//     })
//     .then(function (response) {
//       console.log(response.data);
//       this.respI.push(response.data);
//       console.log("respI==" + respI);
//       // window.location.href = "/expenseDashboard";
//     });
// };

// getIncome();

// try {
//   const { data } = await axios.get(
//     `http://localhost:8080/api/income/wop/` + id,
//     config
//   );
//   respI = data;
// } catch (error) {
//   console.log(error);
//   Alert.alert(error);
// }

// console.log("respI:" + respI);

// console.log("respI:" + respI);
// collectionI = respI?.map((x) => ({
//   month: x.createdAt.substring(0, x.createdAt.indexOf("T")).split("-")[1],
//   value: x.amount,
// }));

// console.log("collectionI:" + collectionI);

// var resI = {};
// collectionI.forEach(function (d) {
//   if (resI.hasOwnProperty(d.month)) {
//     resI[d.month] = resI[d.month] + d.value;
//   } else {
//     resI[d.month] = d.value;
//   }
// });

// var objI = [];
// for (var prop in resI) {
//   objI.push({ month: prop, income: resI[prop] });
// }

// console.log(objI);

// console.log("collectionI:" + collectionI[2].value);
// mapI = new Map();
// collectionI.forEach((x) => ({
//   console.log(typeof mapI.get(x.month));
//   mapI.set(x.month, (mapI.get(x.month) || 0) + x.value),
// }));

// console.log("mapI:" + mapI.get("04"));

//getting expense
// React.useEffect(() => {
//   async function getExpense() {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8080/api/expense/wop/" + id,
//         config
//       );
//       // console.log(data);
//       respE = data;
//     } catch (error) {
//       console.log(error);
//       Alert.alert(error);
//     }
//   }
// });
// try {
//   const { data } = await axios.get(
//     "http://localhost:8080/api/expense/wop/" + id,
//     config
//   );
//   // console.log(data);
//   respE = data;
// } catch (error) {
//   console.log(error);
//   Alert.alert(error);
// }

// console.log("respE:" + respE);

// collectionE = respE?.map((x) => ({
//   month: x.createdAt.substring(0, x.createdAt.indexOf("T")).split("-")[1],
//   value: x.amount,
// }));

// console.log("E:" + collectionE[0].month);

// collectionE.forEach((x) =>
//   mapE.set(x.month, mapE.get(x.month) ? mapE.get(x.month) + x.value : x.value)
// );

// // merging both income mapI and expense mapE
// for (const [key, value] of mapE.entries()) {
//   // console.log({ key, value });
//   // console.log(mapI.get(key));
//   res.push({ month: key, expense: value, income: mapI.get(key) });
// }

// console.log(mapI);
// console.log(res);

//   return (
//     <React.Fragment>
//       <Title>Expense & Income Month wise</Title>
//       <ResponsiveContainer>
//         <LineChart
//           data={res}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis dataKey="name" interval={"preserveStartEnd"} />
//           <YAxis></YAxis>
//           <Legend />
//           <Tooltip />
//           <Line dataKey="income" stroke="black" activeDot={{ r: 8 }} />
//           <Line dataKey="expense" stroke="red" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     </React.Fragment>
//   );
// }
