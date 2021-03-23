import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  AvatarColor: {
    color: theme.palette.getContrastText(
        "#56cc9d"
    ),
    backgroundColor: "#56cc9d",
  },
  
}));

export default function LetterAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
      <Avatar className={classes.AvatarColor}>{props.avatarname.substring(0,1)}</Avatar>
    </div>
  );
}
