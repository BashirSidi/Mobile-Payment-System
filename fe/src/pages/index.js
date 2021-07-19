import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="container pt-5">
      <div>
        <button className="btn btn-danger mb-5" onClick={logout}>
          Logout
        </button>

        {/* <button className="btn btn-warning mb-5">  */}
        <Link
          to="/dashboard/make-complain"
          className="btn btn-warning mb-5"
          style={{ float: "right" }}
        >
          Make complain
        </Link>
        {/* </button> */}
      </div>

      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <Link to="/dashboard/pay-bills" class="btn btn-primary">
                {" "}
                PAY BILLS{" "}
              </Link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>

              <Link to="/dashboard/reports" class="btn btn-primary">
                {" "}
                REPORTS{" "}
              </Link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <Link to="/dashboard/all-customers" class="btn btn-primary">
                {" "}
                CUSTOMERS{" "}
              </Link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <Link to="/dashboard/admin" className="btn btn-primary">
                ADMNISTRATOR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
