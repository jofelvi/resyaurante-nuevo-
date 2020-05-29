import React from "react";

import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";

// Material UI
import { Button, FormControlLabel, Checkbox, Link } from "@material-ui/core";

// Atoms
import FFTextField from "../../../components/Atoms/FFTextField";

import styles from "./styles";

const SignInForm = ({ onSubmit }) => {
  const dataReg = useSelector((state) => state.auth);
  // console.log(dataReg.error.msg);
  const classes = styles();
  const [rememberMe, setRememberMe] = React.useState(false);
  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Requerido";
        }
        if (!values.password) {
          errors.password = "Requerido";
        }

        return errors;
      }}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Field
            type="email"
            name="email"
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            required
            component={FFTextField}
            className={classes.input}
          />
          <Field
            type="password"
            name="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            required
            component={FFTextField}
            className={classes.input}
          />
          {dataReg.error.flag ? (
            <div
              className={`alert alert-danger text-center col-12`}
              role="alert"
            >
              El email no se ha encontrado
            </div>
          ) : (
            ""
          )}
          <div className={classes.options}>
            <FormControlLabel
              classes={{
                root: classes.checkboxContainer,
                label: classes.checkboxLabel,
              }}
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  value="rememberMe"
                  color="primary"
                />
              }
              label="Recordarme"
            />
            <Link href="#" variant="subtitle2">
              ¿Olvido su contraseña?
            </Link>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting || pristine || invalid}
            className={classes.button}
          >
            ENTRAR
          </Button>
        </form>
      )}
    />
  );
};

export default SignInForm;
