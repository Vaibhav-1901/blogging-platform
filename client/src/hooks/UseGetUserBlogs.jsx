import { useEffect, useState } from "react";


function UseGetUserBlogs() {
    const [blogs, setblogs] = useState([])
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("/endpoint")
            .then((response) => response.json())
            .then((data) => setblogs(data))
            .catch((err) => setError(err.message));
    }, [])

    return { blogs, error };
}
export default UseGetUserBlogs;