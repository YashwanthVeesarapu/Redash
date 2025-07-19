import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to="/about">About</Link>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/returns">Returns</Link>
    </footer>
  );
};

export default Footer;
