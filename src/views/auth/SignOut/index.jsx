import { useEffect } from "react";

const SignOutView = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);
  return null;
};

export default SignOutView;
