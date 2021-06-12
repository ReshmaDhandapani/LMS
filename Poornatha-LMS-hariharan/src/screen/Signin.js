
import React, { useState,useContext } from "react";
// eslint-disable-next-line
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles,fade } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import http from "../httpService/http";
import logo from '../assets/poornatha_logo1.png'
import {UserContext} from '../App';

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

export default function SignIn() {
  const classes = useStyles();
  const [isloading,setloading]=useState(false);
  const {state,dispatch}=useContext(UserContext);
  const [email, setEmail] = useState("");
  const history=useHistory();
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleLoginUserSubmit =  (e) => {
      e.preventDefault();
    const user = {
      email,
      password
    };
    setloading(true);
    
    http
      .post("/auth/Signin", user)
      .then((res) => {
        console.log(res);
        setloading(false);
        localStorage.setItem("token",JSON.stringify(res.data.token));
       dispatch({type:"USER",payload:res.data.token})
       history.push('/Home');
      })
      .catch((err) =>{ console.log("error");console.log(err)});
  };

  return (
    <div>
      {
        isloading?  <LinearProgress color="primary" />:<></>
      }
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Poornatha
          </Typography>
          <Typography component="h5" variant="body2">
            Sign in
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handlePasswordChange}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={(e)=>handleLoginUserSubmit(e)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/ForgetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}