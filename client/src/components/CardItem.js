import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  WhatsappShareButton,
} from "react-share";
import dotenv from "dotenv";
dotenv.config();

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function CardItem(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const smallWidth = window.innerWidth > 720 ? null : "20rem";
  const smallMargin = window.innerWidth > 720 ? null : "auto";
  const iconMargin = window.innerWidth > 720 ? "ml-4 mr-4" : "ml-2 mr-2";
  const [favourite, setFavourite] = useState(props.favouriteItem); //will be fetched from database whether it's true or not
  //so showing red on every card and showing wish list would be the future feature

  const image = props.image;

  function handleClick() {
    setFavourite((prev) => !prev);
    
  }
  const shareUrl = `${process.env.URL}products/${props._id}/`;
  const classes = useStyles();

  return (
    <Col
      id="cards"
      sm={12}
      md={6}
      lg={4}
      x-lg={3}
      className="mt-3"
      style={{ width: smallWidth, margin: smallMargin }}
    >
      <Card
        style={{
          padding: "1rem",
          paddingBottom: 0,
          boxShadow: "1px 1px 10px 1px rgba(0,0,0,0.5)",
        }}
      >
        
          <Card.Img variant="top" src={image} style={{height:window.innerWidth>720?"250px":"250px"}} />
        
        <Card.Body>
          <Link
            style={{ textDecorationColor: "black" }}
            to={`/products/${props._id}/`}
          >
            {" "}
            <Card.Title
              as="h4"
              style={{ color: "black", fontFamily: "Roboto" }}
            >
              {" "}
              {props.name}
            </Card.Title>
          </Link>
          <Card.Text as="h5" style={{ color: "black", fontFamily: "Roboto" }}>
            {props.price}/kg
          </Card.Text>
          <hr style={{ height: "0.5px", backgroundColor: "gray" }} />
          <div
            className={iconMargin}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Tooltip title="view" placement="left-end" aria-label="add">
              <Link
                style={{ textDecorationColor: "black" }}
                to={`/products/${props._id}/`}
              >
                {" "}
                <IconButton>
                  {" "}
                  <VisibilityIcon style={{ color: "black" }} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip
              title="add to wishlist"
              placement="right-end"
              aria-label="add"
            >
              <IconButton
                onClick={handleClick}
                style={{ color: favourite ? "red" : "black" }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share" placement="right-end" aria-label="add">
              <IconButton onClick={handleClickOpen}>
                <ShareIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </div>
        </Card.Body>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "space-around",
            alignItems: "center",
            padding: "none",
          }}
        >
          <IconButton onClick={handleClose}>
            {" "}
            <FacebookShareButton
              url={shareUrl}
              quote="I love this product on Greengrocer"
              hashtag="#greengrocer"
            >
              <FacebookIcon style={{ width: "36px" }} />
            </FacebookShareButton>
          </IconButton>
          <IconButton onClick={handleClose}>
            {" "}
            <EmailShareButton
              url={shareUrl}
              subject="I love this product on Greengrocer"
              body="I love this product"
            >
              <EmailOutlinedIcon style={{ width: "36px" }} />
            </EmailShareButton>
          </IconButton>
          <IconButton onClick={handleClose}>
            {" "}
            <WhatsappShareButton
              style={{ width: "36px" }}
              url={shareUrl}
              quote="Fruit"
              title="Hi"
            >
              <WhatsAppIcon />
            </WhatsappShareButton>
          </IconButton>
        </div>
      </Dialog>
    </Col>
  );
}

export default CardItem;
