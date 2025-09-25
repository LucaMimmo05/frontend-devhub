import { createContext, useContext, useState } from "react";

const PageContext = createContext();

const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState("Dashboard");

    return <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>;
};

const usePage = () => {
    return useContext(PageContext);
};

export { PageProvider, usePage };
