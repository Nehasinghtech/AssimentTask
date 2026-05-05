import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Progress() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProblems = async () => {
    try {
      const res = await API.get("/problem");
      setProblems(res.data);
    } catch (err) {
      setError(err?.response?.data?.msg || "Failed to load progress.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const stats = useMemo(() => {
    if (problems.length === 0) {
      return {
        totalProblems: 0,
        completedProblems: 0,
        completionPercentage: 0,
        byTopic: [],
      };
    }

    const completed = problems.filter((p) => p.isCompleted).length;
    const byTopic = new Map();

    problems.forEach((problem) => {
      const topic = problem.topic?.trim() || "General";
      if (!byTopic.has(topic)) {
        byTopic.set(topic, { total: 0, completed: 0 });
      }
      const topicStats = byTopic.get(topic);
      topicStats.total += 1;
      if (problem.isCompleted) {
        topicStats.completed += 1;
      }
    });

    return {
      totalProblems: problems.length,
      completedProblems: completed,
      completionPercentage: Math.round((completed / problems.length) * 100),
      byTopic: Array.from(byTopic.entries()).map(([topic, stats]) => ({
        topic,
        ...stats,
        percentage: Math.round((stats.completed / stats.total) * 100),
      })),
    };
  }, [problems]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="topics-page">
      <header className="top-nav">
        <div className="brand">Dashboard</div>
        <nav className="top-links">
          <button className="nav-btn" onClick={() => navigate("/profile")}>
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
        <h1>Progress</h1>

        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}

        {!loading && (
          <div className="progress-container">
            <div className="overall-stats">
              <h2>Overall Progress</h2>
              <div className="stat-cards">
                <div className="stat-card">
                  <h3>Total Problems</h3>
                  <p className="stat-value">{stats.totalProblems}</p>
                </div>
                <div className="stat-card">
                  <h3>Completed</h3>
                  <p className="stat-value">{stats.completedProblems}</p>
                </div>
                <div className="stat-card">
                  <h3>Completion Rate</h3>
                  <p className="stat-value">{stats.completionPercentage}%</p>
                </div>
              </div>

              {stats.totalProblems > 0 && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${stats.completionPercentage}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>

            {stats.byTopic.length > 0 && (
              <div className="topic-stats">
                <h2>Progress by Topic</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Topic</th>
                      <th>Completed</th>
                      <th>Total</th>
                      <th>Percentage</th>
                      <th>Progress Bar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.byTopic.map((topicStat) => (
                      <tr key={topicStat.topic}>
                        <td>{topicStat.topic}</td>
                        <td>{topicStat.completed}</td>
                        <td>{topicStat.total}</td>
                        <td>{topicStat.percentage}%</td>
                        <td>
                          <div className="mini-progress-bar">
                            <div
                              className="mini-progress-fill"
                              style={{
                                width: `${topicStat.percentage}%`,
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Progress;
