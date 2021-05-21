import React, { useContext } from 'react';
import { doSignOut } from "../firebase/FirebaseFunctions";
import { makeStyles, Button } from "@material-ui/core";
import { AuthContext } from '../firebase/Auth';
const useStyles = makeStyles({
  add_remove_stock_chart: {
    backgroundColor: "rgb(248, 113, 113)",
  },
});
const SignOutButton = ({ component: RouteComponent, ...rest }) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  return (
    !!currentUser ?
    <div>
      <Button
        className={classes.add_remove_stock_chart}
        type="button"
        variant="contained"
        onClick={doSignOut}
      >
        Sign Out
      </Button>
    </div> : ""
  );
};

export default SignOutButton;
