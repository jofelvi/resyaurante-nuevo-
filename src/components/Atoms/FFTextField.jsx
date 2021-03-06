import React from 'react';
// import { FieldRenderProps } from 'react-final-form';
import { TextField } from '@material-ui/core';

const FFTextField = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextField
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      InputProps={restInput}
      onChange={onChange}
      value={value}
    />
  );
};

export default FFTextField;
