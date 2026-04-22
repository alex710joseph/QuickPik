import PropTypes from "prop-types";
import "../pages/css/Footer.css";

function Footer() {
  return (
    <footer className="custom-navbar text-center py-3 mt-1">
      <span className="footer-text">
        © {new Date().getFullYear()} QuickPik — Fast group decisions,
        simplified.
      </span>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
