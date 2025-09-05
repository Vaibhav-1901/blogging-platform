import { BASE_URL } from "../../../server/constants";

const fetchWithRefresh = async function (url, options = {},) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    const data = await res.json().catch(() => ({}));

    if (data.message === "Invalid Access Token") {
      // Refresh token call
      const refreshRes = await fetch(`${BASE_URL}/api/users/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        throw new Error("Session expired. Please log in again.");
      }

      // Retry ing the original request
      res = await fetch(url, {
        ...options,
        credentials: "include",
      });
    }
  }

  return res;
};

export default fetchWithRefresh