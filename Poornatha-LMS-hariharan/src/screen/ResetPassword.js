import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "@material-ui/core/Link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import http from "../httpService/http";

import LinearProgress from '@material-ui/core/LinearProgress';

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

export default function ResetPassword(props) {
  const classes = useStyles();
  const [new_password, setNewPassword] = useState("");
  const [password, setRetypePassword] = useState("");
  console.log(props.match.params._id);
  const [isloading,setloading]=useState(false);

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
      password,
    };
    http
      .patch(`/auth/ResetPassword/${props.match.params._id}`, user)
      .then((res) =>{ toast.success("Reset Successful!!");console.log(res);setloading(false);})
      .catch((err) => console.log(err));
  };
  return (
    <>
    <ToastContainer> </ToastContainer>
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
        Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleUserFormSubmit}
          >
            Submit
          </Button>
          <Grid container>
              <Grid item xs>
                <Link href="/Signin" variant="body2">
                  Sign In
                </Link>
              </Grid>
              </Grid>
        </form>
      </div>
    </Container>
    </>
  );
}

