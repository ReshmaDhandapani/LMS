import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles,fade } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import http from "../httpService/http";
import logo from '../assets/poornatha_logo1.png'
import {UserContext} from '../App';

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
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"black",
    color:"white",
    '&:hover':{
        backgroundColor:fade(theme.palette.common.black, 0.25)
    }
  },
}));

export default function ForgetPassword() {
  const classes = useStyles();
  const [isloading,setloading]=useState(false);
  const {state,dispatch}=useContext(UserContext);
  const [email, setEmail] = useState("");
  const history=useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  

  const handleForgetPasswordSubmit =  (e) => {
      e.preventDefault();
    const user = {
      email
    };
    setloading(true);
    
    http
      .post("/auth/ForgetPassword", user)
      .then((res) =>{ toast.success("Mail Sent!!"); console.log(res);setloading(false);})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {
        isloading?  <LinearProgress color="primary" />:<></>
      }
      <ToastContainer></ToastContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Poornatha
          </Typography>
          <Typography component="h5" variant="body2">
            Forget Password
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleEmailChange}
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={(e)=>handleForgetPasswordSubmit(e)}
            >
              Send Mail
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
