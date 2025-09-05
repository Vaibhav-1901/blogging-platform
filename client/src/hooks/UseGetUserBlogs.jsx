import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useBlog } from "../context/BlogContext";
import fetchWithRefresh from "../utilities/fetchWithRefresh";
import { useAuth } from "../context/AuthContext";


function useGetUserBlogs() {
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState(null);
    const { refresh, setRefresh } = useBlog();

     useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetchWithRefresh(`${BASE_URL}/api/blogs/my-blogs`, {
          method: "GET",
          credentials: "include", 
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch blogs");
        }

        setBlogs(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, [refresh]);

  return { blogs, error };
}
export default useGetUserBlogs;