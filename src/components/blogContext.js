import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const setBlog = (blogData) => {
    setSelectedBlog(blogData);
  };

  return (
    <BlogContext.Provider value={{ selectedBlog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  return useContext(BlogContext);
};
