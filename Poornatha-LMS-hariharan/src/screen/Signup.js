import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import http from "../httpService/http";


import LinearProgress from '@material-ui/core/LinearProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.poornatha.com/">
        Poornatha Partnering Entrepreneurs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_no, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [password, setRetypePassword] = useState("");
  const history = useHistory();
  const [isloading,setloading]=useState(false);

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    console.log(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    console.log(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    console.log(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    console.log(e.target.value);
  };
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
    console.log(e.target.value);
  };
  const handleUserFormSubmit = (e) => {
    console.log(new_password);
    setloading(true)
    const user = {
      first_name,
      last_name,
      password,
      email,
      phone_no,
    };
    http
      .post("/auth/Signup", user)
      .then((res) =>{ console.log(res);history.push('/Signin');setloading(false);})
      .catch((err) => console.log(err));
  };
  return (
    <Container component="main" maxWidth="xs">
      {
        isloading?  <LinearProgress color="primary" />:<></>
      }
    
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                onChange={handleFirstNameChange}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleLastNameChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleEmailChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                type="number"
                onChange={handlePhoneNumberChange}
                autoComplete="phone"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="set_password"
                label="Enter New Password"
                type="password"
                onChange={handleNewPasswordChange}
                id="set_password"
                autoComplete="set-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="current_password"
                label="Retype New Password"
                type="password"
                id="current_password"
                onChange={handleRetypePasswordChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Accept the terms and conditions of Poornatha Partnering Entrepreneurs"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleUserFormSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}