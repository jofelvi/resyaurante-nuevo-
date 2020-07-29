import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";

// Material UI
import { Paper, Typography, Link } from "@material-ui/core";

// Assets
import logo from "../../../assets/images/restaurant.png";

// Atoms
import FormSubmitLoader from "../../../components/Atoms/FormSubmitLoader";

import styles from "./styles";
import SignUpForm from "./form";
import { signUp } from "../../../store/auth/actions";

const SignUpView = () => {
  const classes = styles();

  const dataReg = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(signUp(values));
  };

  return (
    <main className={classes.root}>
      {dataReg.register ? <Redirect to="/sign-in" /> : ""}
      <Paper elevation={1} className={classes.paper}>
        <FormSubmitLoader loading={dataReg.loading} />
        <img src={logo} alt="logo" className={classes.logo} />
        <Typography variant="h6" align="center" className={classes.logoText}>
          RESTAURANT APP
        </Typography>
        <Typography variant="h6" align="center" className={classes.title}>
          NUEVA CUENTA
        </Typography>
        <SignUpForm onSubmit={onSubmit} />
        <div className={classes.register}>
          <Typography variant="subtitle2" component="span">
            ¿Ya tienes una cuenta?
          </Typography>
          <Link variant="subtitle2" component={RouterLink} to="/sign-in">
            Iniciar sesión
          </Link>
        </div>
      </Paper>
    </main>
  );
};

export default SignUpView;
