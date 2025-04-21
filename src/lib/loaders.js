import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  try {
    const res = await apiRequest("/post/" + params.id);
    return res.data;
  } catch (err) {
    console.error("Loader error:", err.response?.data || err.message);
    throw new Response("Post not found", { status: 404 });
  }
};

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const response = await apiRequest("/post?" + query);
    return response.data;
  };

  export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePost"); // ✅ fixed path
    const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
};