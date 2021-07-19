import React, { useEffect, useState } from "react";
import { HttpService } from "../../services";
import { Link } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const response = await HttpService.getAllCustomers();
    setCustomers(response.data);
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div className="container pt-5">
      <Link to="/dashboard" className="btn btn-primary mb-3">
        back
      </Link>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Tel</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, i) => (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{customer.fullName.split(" ")[0]}</td>
                <td>{customer.fullName.split(" ")[1]}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
