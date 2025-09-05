import { useState, useEffect } from "react";
import { useBlog } from "../context/BlogContext";
import { BASE_URL } from "../../../server/constants";

function useGetAllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const { refresh } = useBlog();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");

        setBlogs(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, [refresh]);

  return { blogs, error };
}

export default useGetAllBlogs;
