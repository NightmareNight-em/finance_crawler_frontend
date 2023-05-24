import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

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

function Home() {
  return (
    <section id="title">
      <div className="container-fluid">
        {/* <!-- Title --> */}
        <div className="row">
          <div className="col-lg-6">

            <h1 className="title-heading">Finance Crawler</h1>
            <h4>Price is what you pay, Value is what you get.</h4>


            <a
              href="/login"
              className="btn btn-outline-dark btn-lg download-button"
              role="button"
            >

            <i className="fa-solid fa-arrow-pointer"></i>

              
              Sign In
            </a>
            <a
              href="/register"
              className="btn btn-outline-dark btn-lg download-button"
              role="button"


            >
              <i className="fa-solid fa-user-plus"></i>

              Sign Up
            </a>
            {/* <button
              type="button"
              className="btn btn-outline-light btn-lg download-button"
            >
              <i className="fa-solid fa-user-plus"></i> Register
            </button> */}
            {/* <button
              type="button"
              className="btn btn-outline-light btn-lg download-button"
            >
              <i class="fa-solid fa-arrow-pointer"></i> Login
            </button> */}
          </div>

          <div className="col-lg-6 title-img-div">
            <img
              className="title-img"
              src="images/back.png"
              alt="money-pic"
            ></img>
          </div>
        </div>
      </div>
      <Copyright sx={{ pt: 4 }} />
    </section>
  );
}

export default Home;
