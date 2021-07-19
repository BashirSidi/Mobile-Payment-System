import React from "react";
import { Formik, Form } from "formik";
import { HttpService } from "../../services";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

export default function Complain() {
  const { addToast } = useToasts();
  const history = useHistory();
  return (
    <div className="container pt-5">
      <Link to="/dashboard" className="btn btn-primary mb-3">
        back
      </Link>
      <Formik
        initialValues={{
          complain: "",
        }}
        validationSchema={Yup.object({
          complain: Yup.string().required("Complain is Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("val", values);
          const response = await HttpService.makeComplain(values);
          if (response.status === 200) {
            addToast("Complain successfully created", {
              appearance: "success",
            });
            history.push("/dashboard");
          } else {
            setSubmitting(false);
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
          <Form className="needs-validation mt-3" onSubmit={handleSubmit}>
            <div class="input-group">
              {/* <div class="input-group-prepend">
                <span class="input-group-text">Type your complain</span>
              </div> */}
              <textarea
                class="form-control"
                aria-label="With textarea"
                name="complain"
                value={values.complain}
                placeholder="Type your complain"
                onChange={handleChange}
              ></textarea>
            </div>
            <button className="btn btn-primary mt-2">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
