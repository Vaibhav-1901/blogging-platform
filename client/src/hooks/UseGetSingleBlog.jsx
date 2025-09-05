import { useEffect, useState } from "react";
import { BASE_URL } from "../../../server/constants";
import { useBlog } from "../context/BlogContext";


function useGetSingleBlog(slug) {
    const [blog, setBlog] = useState([])
    const [error, setError] = useState(null);
    const { refresh ,setRefresh} = useBlog();
     useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs/${slug}`, {
          method: "GET",
          credentials: "include", 
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch blogs");//passing in try catch 
        }
        setBlog(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, [refresh,slug]);

  return { blog, error };
}
export default useGetSingleBlog;