import React from "react";
import { useState, useEffect } from "react";

const Table1 = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    function fetchdata() {
      fetch("http://localhost:5000/usersless5", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          //   console.log(JSON.parse(data));
          console.log(data);
          //  data = JSON.parse(data);
          setData(data);
        });
    }
    fetchdata();
  }, []);
  return (
    <>
      <div>
        <h1>
          Users which have income lower than $5 USD and have a car of brand
          “BMW” or “Mercedes.
        </h1>
        <table border="1px">
          <thead>
            <tr>
              <td>id</td>
              <td>First Name</td>
              <td>LastName</td>
              <td>email</td>
              <td>gender</td>
              <td>income</td>
              <td>city</td>
              <td>car</td>
              <td>quote</td>
              <td>phone_price</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.income}</td>
                <td>{item.city}</td>
                <td>{item.car}</td>
                <td>{item.quote}</td>
                <td>{item.phone_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table1;
