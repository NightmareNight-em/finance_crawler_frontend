import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const mainListItems = (
  <React.Fragment>
    <a href="/" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </a>
    <a href="/addIncome" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <CurrencyRupeeOutlinedIcon />
        </ListItemIcon>

        <ListItemText primary="New Income" />
      </ListItemButton>
    </a>
    <a href="/addExpense" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <CurrencyRupeeOutlinedIcon />
        </ListItemIcon>

        <ListItemText primary="New Expense" />
      </ListItemButton>
    </a>
    <a
      href="/incomeDashboard"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <ListOutlinedIcon />
        </ListItemIcon>

        <ListItemText primary="Income List" />
      </ListItemButton>
    </a>
    <a
      href="/expenseDashboard"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <ListOutlinedIcon />
        </ListItemIcon>

        <ListItemText primary="Expense List" />
      </ListItemButton>
    </a>
    <a href="/"
    style={{ textDecoration: "none", color: "black" }}
        onClick={() => {
          localStorage.clear();
          return true;
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          LogOut
        </ListItemButton>
      
    </a>
  </React.Fragment>
);
