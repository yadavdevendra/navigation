import React from 'react'
import { useState ,useEffect } from 'react';
//import Button from "@mui/material/Button";
import {Button} from "@mui/material"
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
      const [data, setData] = useState([]);
      const [searchdata, setSearchdata] = useState([]);
      let navigate = useNavigate();

      useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
          .then((resp) => resp.json())
          .then((data) => {
            const newdata1 = data.map((item) => {
              const ph = phonemodify(item.phone);
              return { ...item, phone: ph };
            });
            console.log(data);
            setData(newdata1);
            setSearchdata(newdata1);
          });
      }, []);

        function handleDelete(id) {
          const newdata = data.filter((item) => item.id !== id);
          setData(newdata);
        }
        function handleFshow() {
          setShow(true);
        //   setName("");
        //   setUserName("");
        //   setPhone("");
        //   setEmail("");
        //   setCompanyname("");
          setIsAddButton(true);
        }
        const Search = (value) => {
          if (value == "") {
            setData(searchdata);
            return;
          }

          const searchedItem = data?.filter((item) => {
            if (item.username !== null && item.email !== null) {
              return item.username.toLowerCase().indexOf(value.toLowerCase()) ==
                -1
                ? false
                : true;
            } else return false;
          });
          setData(searchedItem);
        };
        function phonemodify(phone) {
          phone.slice(0, 13);
          var val = phone
            .split(" ")[0]
            .split(/[\.\s\(\)-]/)
            .join("");
          var val1 = val.slice(0, 10);
          return val1;
        }
  return (
    <div>
      <div className="searchbar">
        <input
          className="search"
          type="search"
          placeholder="Search...."
          onChange={(e) => {
            Search(e.target.value);
          }}
        />
        <Button
          className="add"
          onClick={() => navigate("/form", { state: "Add User Detail" })}
        >
          Add user
        </Button>
      </div>
      <table className="table">
        {data.length !== 0 ? (
          <thead>
            <tr>
              <th>Id </th>
              <th>Name</th>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Action</th>
            </tr>
          </thead>
        ) : (
          true
        )}
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.username}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td>{data.company.name}</td>
                <td className="action">
                  <Button
                    className="edite"
                    onClick={() => {
                      navigate(`/form/${data.id}`, {
                        state: "Edit User Detail",
                      });
                    }}
                  >
                    Edite
                  </Button>
                  {/* <Link
                    className="editebtn"
                    to={(`/form/${data.id}`, { state: "Edit User Detail" })}
                  >
                    Edit
                  </Link> */}
                  <Button
                    className="delete"
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
