import React from "react";

import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";

// Material UI
import { Button, FormControlLabel, Checkbox } from "@material-ui/core";

// Atoms
import FFTextField from "../../../components/Atoms/FFTextField";

import styles from "./styles";

const SignUpForm = ({ onSubmit }) => {
  const dataReg = useSelector((state) => state.auth);

  const classes = styles();
  const [rememberMe, setRememberMe] = React.useState(false);

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.firstName) {
          errors.firstName = "Requerido";
        }
        if (!values.lastName) {
          errors.lastName = "Requerido";
        }
        if (!values.email) {
          errors.email = "Requerido";
        }
        if (!values.password) {
          errors.password = "Requerido";
        } else if (values.password.length < 6) {
          errors.password = "La contraseña debe tener mas de 6 caracteres";
        }
        if (values.confirm !== values.password) {
          errors.confirm = "Las contraseñas no coinciden";
        }

        return errors;
      }}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Field
            type="text"
            name="firstName"
            label="Nombre"
            variant="outlined"
            fullWidth
            required
            component={FFTextField}
            className={classes.input}
          />
          <Field
            type="text"
            name="lastName"
            label="Apellido"
            variant="outlined"
            fullWidth
            required
            component={FFTextField}
            className={classes.input}
          />
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
          <Field
            type="password"
            name="confirm"
            label="Confirmar contraseña"
            variant="outlined"
            fullWidth
            required
            component={FFTextField}
            className={classes.input}
          />
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
              label="Acepto los terminos y condiciones"
            />
          </div>
          {dataReg.error.flag ? (
            // dataReg.error.msg.code
            // auth/network-request-failed
            <div
              className={`alert alert-danger text-center col-12`}
              role="alert"
            >
              El Email ya esta en usado
            </div>
          ) : (
            ""
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting || pristine || invalid}
            className={classes.button}
          >
            REGISTRARSE
          </Button>
        </form>
      )}
    />
  );
};

export default SignUpForm;
