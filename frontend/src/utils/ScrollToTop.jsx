import { useEffect } from "react";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

ScrollToTop.propTypes = {
  props: PropTypes.object.isRequired,
};
export default ScrollToTop;