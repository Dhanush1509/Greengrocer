import React from "react";
import logo from "../assets/brand.svg";
import { Link } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import BusinessIcon from "@material-ui/icons/Business";

const FooterIcons = () => {
  return (
    <div className="footer-icons">
      <a href="mailto:greengrocer@gmail.com">
        <EmailIcon />
      </a>
      <a href="tel:234567788">
        <PhoneIcon />
      </a>
      <Link to="/">
        <TwitterIcon />
      </Link>
      <Link to="/">
        <FacebookIcon />
      </Link>
      <Link to="/">
        <InstagramIcon />
      </Link>
    </div>
  );
};
const Footer = () => {
  return (
    <>
      <style>
        @import
        url(https://fonts.googleapis.com/css?family=Open+Sans:400,500,300,700);
      </style>
      <footer
        className="footer-distributed mt-5"
        style={{ fontFamily: "Open Sans" }}
      >
        <div className="footer-left">
          <h3>
            <img src={logo} alt="logo" style={{ height: "2rem" }} /> Green
            <span>grocer</span>
          </h3>

          <p className="footer-links">
            <Link to="/" className="link-1">
              Home
            </Link>

            <Link to="/about">About</Link>

            <Link to="/contact">Contact</Link>
          </p>
          {window.innerWidth > 720 ? <></> : <FooterIcons />}
          <p className="footer-company-name">
            Singamsetty Munidhanush © {new Date().getFullYear()}
          </p>
        </div>

        {window.innerWidth > 720 ? (
          <>
            {" "}
            <div className="footer-center">
              <div className="mb-2" style={{ color: "white" }}>
                <BusinessIcon style={{ color: "white" }} className="mr-1" />
                Banglore, Karnataka
              </div>

              <div className="mb-2">
                <PhoneIcon style={{ color: "white" }} className="mr-1" />
                <a href="tel:234567788">+1.555.555.5555</a>
              </div>

              <div>
                <EmailIcon style={{ color: "white" }} className="mr-1" />

                <a href="mailto:greengrocer@gmail.com">greengrocer@gmail.com</a>
              </div>
            </div>
            <div className="footer-right">
              <p className="footer-company-about">
                <span>About the company</span>
                We sell Organic fruits and Vegetables for fair price
              </p>

              <FooterIcons />
            </div>
          </>
        ) : (
          <></>
        )}
      </footer>
    </>
  );
};

export default Footer;
