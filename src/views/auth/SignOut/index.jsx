import { useEffect } from "react";
import { connect } from "react-redux";

// Actions
// import * as actions from "../../../store/auth/actions";

const SignOutView = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);
  return null;
};

export default SignOutView;
