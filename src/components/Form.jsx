import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Home from './Home'

export default function Form({ title }) {
  const [edata, setEdata] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  // error  Message
  const [errorMessage, setErrorMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [companyMessage, setCompanyMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  // console.log(state);
  // console.log("saimee", params);

  React.useEffect(() => {
    // console.log("localstorage id find",editedata.id);
    const items = JSON.parse(localStorage.getItem("data"));
    setEdata(items);
    if (state === "Edit User") {
      const editedata = items.find((item) => item.id === Number(params.id));
      setName(editedata.name);
      setUserName(editedata.username);
      setPhone(editedata.phone);
      setEmail(editedata.email);
      setCompany(editedata.company.name);
    }
  }, []);

 let Regex = /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/g;
  function handlename(val) {
    if (val == "") {
      setNameMessage("please fill the valid name");
      return true;
    }
    setNameMessage("");
    return false;
  }
  function handleusername(val) {
    if (val == "") {
      setUserNameMessage("please fill the valid name");
      return true;
    }
    setUserNameMessage("");
    return false;
  }

  function handleemail(val) {
    if (val == "") {
      setEmailMessage("please fill the valid name");
      return true;
    }
   if(!val.match(Regex)){
      setEmailMessage("please fill the valid name");
      return true;
   }
   setEmailMessage("");
   return false;
  }
  function handlephone(val) {
    if (val == "") {
      setPhoneMessage("please fill the valid name");
      return true;
    }
    if (!phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
      setPhoneMessage("phone only get the number 10 digits");
      return true;
    }
    setPhoneMessage("");
    return false;
  }
  function handlecompany(val) {
    if (val == "") {
      setCompanyMessage("please fill the valid name");
      return true;
    }
    setCompanyMessage("");
    return false;
  }
  function handleSubmit() {
    if (
      nameMessage &&
      userNameMessage &&
      emailMessage &&
      phoneMessage &&
      companyMessage
    )
      return;
 
    if (state === "Edit User") {
      const neweditdata = edata?.map((eitem) => {
        if (eitem.id === Number(params.id)) {
          return {
            id: Number(params.id),
            name,
            username,
            phone,
            email,
            company: { name: company },
          };
        }
        return eitem;
      });
         
      localStorage.setItem("data", JSON.stringify(neweditdata));
         
    } else if (state === "Add User") {
      function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const id = randomInt(11, 50);
      const newUser = {
        id,
        name,
        username,
        email,
        phone,
        company: { name: company },
      };

      localStorage.setItem("data", JSON.stringify([...edata, newUser]));
    }
  // }
    navigate("/", { state: { stop: true } });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {state} Form
        </Typography>
        <Box sx={{ mt: 3 }} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handlename(e.target.value);
                }}
                autoComplete="of"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <span>{nameMessage}</span>
            <Grid item xs={12}>
              <TextField
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                  handleusername(e.target.value);
                }}
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="of"
              />
            </Grid>
            <span>{userNameMessage}</span>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleemail(e.target.value);
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
              />
            </Grid>
            <span>{emailMessage}</span>
            <Grid item xs={12}>
              <TextField
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  handlephone(e.target.value);
                }}
                required
                fullWidth
                name="phone"
                label="phone"
                type="phone"
                id="phone"
                autoComplete="off"
              />
            </Grid>
            <span>{phoneMessage}</span>
            <Grid item xs={12}>
              <TextField
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  handlecompany(e.target.value);
                }}
                required
                fullWidth
                name="company"
                label="company"
                type="company"
                id="company"
                autoComplete="off"
              />
            </Grid>
            <span>{companyMessage}</span>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {state === "Add User" ? "Add" : "Edit"} User Detail
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
