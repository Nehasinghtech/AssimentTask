import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/user");
        setUser(res.data);
      } catch (err) {
        setError(err?.response?.data?.msg || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/topics");
  };

  return (
    <div className="topics-page">
      <header className="top-nav">
        <div className="brand">Dashboard</div>
        <nav className="top-links">
          <button className="nav-btn" onClick={handleBack}>
            Profile
          </button>
          <button className="nav-btn" onClick={() => navigate("/topics")}>
            Topics
          </button>
          <button className="nav-btn" onClick={() => navigate("/progress")}>
            Progress
          </button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="topics-content">
        <h1>Profile</h1>

        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}

        {!loading && user && (
          <div className="profile-container">
            <div className="profile-card">
              <h2>{user.username}</h2>
              <p className="profile-email">Email: {user.email}</p>
              <p className="profile-text">Profile Details</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
