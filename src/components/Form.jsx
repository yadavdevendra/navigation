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
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const {state} = useLocation();
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

  let Regex =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm;
  // let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !username && !email && !phone && !company) {
      setErrorMessage("All field required");
    } else {
      if (!name) {
        setErrorMessage("name required");
      } else {
        if (!username) {
          setErrorMessage("UserName  required");
        } else {
          if (!email.match(Regex)) {
            setErrorMessage("Email  required");
          } else {
            if (
              !phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
            ) {
              setErrorMessage("phone only get the number 10 digits");
            } else {
              if (!company) {
                setErrorMessage("Company name  required");
              } else {
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

                  localStorage.setItem(
                    "data",
                    JSON.stringify([...edata, newUser])
                  );
                }
                navigate("/", { state: { stop: true } });
              }
            }
          }
        }
      }
    }
  };

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
        <Box component="form" noValidate sx={{ mt: 3 }}>
          {errorMessage ? (
            <Alert sx={{ marginBottom: "25px" }} severity="error">
              {errorMessage}
            </Alert>
          ) : (
            ""
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="of"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="of"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                fullWidth
                name="phone"
                label="phone"
                type="phone"
                id="phone"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                fullWidth
                name="company"
                label="company"
                type="company"
                id="company"
                autoComplete="off"
              />
            </Grid>
          </Grid>

          {/* {title === "Add User" ? ( */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {state === "Add User" ? "Add" : "Edit"} User Detail
          </Button>
          {/* // ) : ( */}
          {/* //   <Button 
          //     type="submit"
          //     fullWidth
          //     variant="contained"
          //     sx={{ mt: 3, mb: 2 }}
          //     onClick={handleSubmit}
          //   >
          //     Edit User Detail
          //   </Button>
          // )}*/}
        </Box>
      </Box>
    </Container>
  );
}
