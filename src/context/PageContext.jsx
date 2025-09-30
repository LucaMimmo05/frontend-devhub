import { createContext, useState } from "react";

const PageContext = createContext();

const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState("Dashboard");

    return <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>;
};

export { PageProvider };
