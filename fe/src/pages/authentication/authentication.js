import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AuthContext } from "../../context/AuthContext";
import { HttpService } from "../../services";
import { ApiClient } from "../../utils/ApiClient";
import * as Yup from "yup";
import "./authentication.css";

export default function Authentication() {
  const { addToast } = useToasts();
  const { setUser, fetchData } = useContext(AuthContext);

  const history = useHistory();
  return (
    <div className="login-card">
      <div className="container mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col-sm-7 col-md-6 col-lg-5">
            <div className="card shadow border border-success rounded">
              <div className="card-body login-boder">
                <p className="lead text-center display-5 text-success">Login</p>
                {/* {alertmessage} */}
                <hr />
                <div className="">
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                    }}
                    validationSchema={Yup.object({
                      username: Yup.string().required("Useranme is Required"),
                      password: Yup.string()
                        .max(12, "Must be 12 characters or less")
                        .required("Password is Required"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log("val", values);
                      const response = await HttpService.login(values);
                      if (response.status === 200) {
                        console.log("res", response.data.token);
                        const token = await ApiClient.setToken(
                          response.data.token
                        );
                        if (token === true) {
                          setUser(response.data.user);
                          fetchData();
                          addToast(" Login Successfully", {
                            appearance: "success",
                          });
                          history.push("/dashboard");
                        }
                      } else {
                        setSubmitting(false);
                        addToast("invalid Credentials", {
                          appearance: "error",
                        });
                      }
                      setSubmitting(false);
                    }}
                  >
                    {({
                      isSubmitting,
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                    }) => (
                      <Form
                        className="needs-validation mt-3"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-group pt-3">
                          <label htmlFor="">Username*</label>
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="exampleInputUsername"
                            placeholder="Username"
                            required
                            value={values.username}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Please enter your username.
                          </div>
                        </div>
                        <div className="form-group pt-3">
                          <label htmlFor="">Password*</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            required
                            value={values.password}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Please enter your password.
                          </div>
                        </div>
                        {/* <button
                          type="submit"
                          className="btn btn-success btn-block"
                        >
                          Sign in
                        </button> */}
                        <div className="form-group mt-3 login">
                          <div className="forgot-p mt-5 text-center">
                            <button
                              style={{ background: "#00602a" }}
                              type="submit"
                              className="btn btn-success btn-block"
                              // size="md"
                              disabled={isSubmitting}
                              block
                            >
                              Login{" "}
                              {isSubmitting ? (
                                <span
                                  id="login_spinner"
                                  className="fa fa-spin fa-spinner text-white"
                                ></span>
                              ) : null}
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="col"> </div>
        </div>
      </div>
    </div>
  );
}
