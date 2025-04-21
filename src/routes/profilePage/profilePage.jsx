import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { useContext, useEffect, Suspense } from "react";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate, Link, useLoaderData, Await } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Debugging - remove in production
  console.log("currentUser:", currentUser);

  // Handle case when user is not logged in
  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // If user is not logged in, don't render the page
  if (!currentUser) {
    return null;
  }

  // Extract user info - this is the key change
  const userInfo = currentUser.userInfo || currentUser;

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={userInfo.avatar || "/noimage.png"} alt="Avatar" />
            </span>
            <span>
              Username: <b>{userInfo.username}</b>
            </span>
            <span>
              E-mail: <b>{userInfo.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          {data?.postResponse ? (
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => <List posts={postResponse.data.userPosts} />}
              </Await>
            </Suspense>
          ) : (
            <List />
          )}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          {data?.postResponse ? (
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => <List posts={postResponse.data.savedPosts} />}
              </Await>
            </Suspense>
          ) : (
            <List />
          )}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          {data?.chatResponse ? (
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.chatResponse}
                errorElement={<p>Error loading chats!</p>}
              >
                {(chatResponse) => <Chat chats={chatResponse.data} />}
              </Await>
            </Suspense>
          ) : (
            <Chat />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;