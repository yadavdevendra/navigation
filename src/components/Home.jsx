import React from "react";
import { useState, useEffect } from "react";
//import Button from "@mui/material/Button";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState([]);

  let navigate = useNavigate();
  // let location = useLocation();
  // console.log("state", location.state.adddata);

  useEffect(() => {
    const edata =JSON.parse(localStorage.getItem("data"));
    
    setData(edata);
    console.log(("edite",edata));
    setSearchdata(edata);
  }, []);

  useEffect(() => {
    if (location.state?.stop) return;
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((resp) => resp.json())
      .then((data) => {
        const newdata1 = data.map((item) => {
          const ph = phonemodify(item.phone);
          return { ...item, phone: ph };
        });
        // console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
        setData(newdata1);
        setSearchdata(newdata1);
      });
  }, []);

  function handleDelete(id) {
    const newdata = data.filter((item) => item.id !== id);
    setData(newdata);
  }

  const Search = (value) => {
    if (value == "") {
      setData(searchdata);
      return;
    }

    const searchedItem = data?.filter((item) => {
      if (item.username !== null && item.email !== null) {
        return item.username.toLowerCase().indexOf(value.toLowerCase()) == -1
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
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.company.name}</td>
                <td className="action">
                  <Button
                    className="edite"
                    onClick={() => {
                      navigate(`/${item.id}`, {
                        state: "Edit User Detail",
                      });
                    }}
                  >
                    Edit
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
                      handleDelete(item.id);
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
