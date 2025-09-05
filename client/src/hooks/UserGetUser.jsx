import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import fetchWithRefresh from "../utilities/fetchWithRefresh";
import { useAuth } from "../context/AuthContext";

const useGetUser = () => {
  const{isLoggedIn}=useAuth()
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchUser = async () => {
      try {
        const res = await fetchWithRefresh(`${BASE_URL}/api/users/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({})
        });
        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);
  return user;
};

export default useGetUser;
