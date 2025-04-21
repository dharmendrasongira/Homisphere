import "./profileUpdatePage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apirequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUser, currentUser } = useContext(AuthContext);

  const user = currentUser?.userInfo;
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
      username,
      email,
      avatar,
    };

    if (password) {
      payload.password = password;
    }

    try {
      const res = await apirequest.put(`/users/${user.id}`, payload);
      updateUser({ userInfo: res.data });
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>

          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user?.username}
              required
            />
          </div>

          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
              required
            />
          </div>

          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Leave empty to keep current password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>

      <div className="sideContainer">
        <img
          src={
            avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.username || "User"
            )}`
          }
          alt="Avatar"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dihv4wwhy",
            uploadPreset: "estate",
            cropping: true,
            folder: "avatar",
            croppingAspectRatio: 1,
            maxFileSize: 2097152,
            multiple: false,
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
