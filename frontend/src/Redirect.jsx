import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";
const Redirect = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const previousPage = localStorage.getItem("previousPage");
      if (previousPage) {
        navigate(previousPage);
      } else {
        navigate("/"); // Fallback if no previous page is found
      }
    }, [navigate]);
  
    return <p>Redirecting...</p>;
  };

export default Redirect;