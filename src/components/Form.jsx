import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";

export default function Form() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddButton, setIsAddButton] = useState(true);

  const [successMessage, setSuccessMessage] = useState("");
  const { state } = useLocation();

  console.log("state",state); 
  
  let Regex =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm;
  // let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !userName && !email && !phone && !company) {
      setErrorMessage("All field required");
    } else {
      if (!name) {
        setErrorMessage("firstname required");
      } else {
        if (!userName) {
          setErrorMessage("LastName  required");
        } else {
          if (!email.match(Regex)) {
            setErrorMessage("Email  required");
          } else {
            if (!phone.match(/^[789]\d{9}$/)) {
              setErrorMessage("phone only get the number 10 digits");
            } else {
              if (!company) {
                setErrorMessage("Company name  required");
              } else {
                setErrorMessage(false);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setCompany("");
                setPromostions(false);
                setSuccessMessage("Successfully Submit");
                setTimeout(() => {
                  setSuccessMessage("");
                }, 2000);
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
          Form Handling With Validations
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {errorMessage ? (
            <Alert sx={{ marginBottom: "25px" }} severity="error">
              {errorMessage}
            </Alert>
          ) : (
            ""
          )}

          {successMessage ? (
            <Alert sx={{ marginBottom: "25px" }} severity="success">
              {successMessage}
            </Alert>
          ) : (
            ""
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={userName}
                onChange={(e) => setLastName(e.target.value)}
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
          {isAddButton && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {state}
            </Button>
          )}
          {!isAddButton && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {state}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
