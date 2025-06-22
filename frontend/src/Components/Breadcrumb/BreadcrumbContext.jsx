// BreadcrumbContext.js
import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState([
    { name: "Dashboard", path: "/dashboard" },
  ]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);
