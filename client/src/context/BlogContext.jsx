
import { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(0);

  return (
    <BlogContext.Provider value={{ refresh, setRefresh}}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
