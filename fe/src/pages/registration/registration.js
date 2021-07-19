import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AuthContext } from "../../context/AuthContext";
import { HttpService } from "../../services";
import * as Yup from "yup";
import "./registration.css";

export default function Registration() {
  const { addToast } = useToasts();
  const { setUser } = useContext(AuthContext);

  const history = useHistory();
  return (
    <div className="login-card">
      <div className="container mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col-sm-7 col-md-6 col-lg-5">
            <div className="card shadow border border-success rounded">
              <div className="card-body login-boder">
                <p className="lead text-center display-5 text-success">
                  Register
                </p>
                {/* {alertmessage} */}
                <hr />
                <div className="">
                  <Formik
                    initialValues={{
                      fullName: "",
                      username: "",
                      phonenumber: "",
                      password: "",
                    }}
                    validationSchema={Yup.object({
                      fullName: Yup.string().required("fullName is Required"),
                      username: Yup.string().required("Useranme is Required"),
                      phonenumber: Yup.string().required("Email is Required"),
                      password: Yup.string()
                        .max(12, "Must be 12 characters or less")
                        .required("Password is Required"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log("val", values);
                      const response = await HttpService.register(values);
                      if (response.status === 200) {
                        console.log("res", response);
                        setUser(response.data.data.user);
                        addToast("Register Successfully", {
                          appearance: "success",
                        });
                        console.log("WORKin");
                        history.push("/signin");
                        setSubmitting(false);
                      } else {
                        addToast("Error", {
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
                          <label htmlFor="">full Name*</label>
                          <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            id="exampleInputUsername"
                            placeholder="Email"
                            required
                            value={values.fullName}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Please enter your full name.
                          </div>
                        </div>
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
                          <label htmlFor="">Phone Number*</label>
                          <input
                            type="text"
                            name="phonenumber"
                            className="form-control"
                            id="exampleInputUsername"
                            placeholder="Phone number"
                            required
                            value={values.phonenumber}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Please enter your phone number.
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
                              Register{" "}
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
