import React from "react";

import { connect } from "react-redux";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { setOpen } from "../../actions/alertActions";

const Notif = (props) => {
  const { details, open, setOpen } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar
      key={details.id}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={details.type}
        sx={{ width: "100%" }}
      >
        {details.msg}
      </Alert>
    </Snackbar>
  );
};
const mapStateToProps = (state) => ({
  details: state.alerts.details,
  open: state.alerts.open,
});
export default connect(mapStateToProps, { setOpen })(Notif);
