import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedTopics, setExpandedTopics] = useState({});
  const navigate = useNavigate();

  const fetchProblems = async () => {
    try {
      const res = await API.get("/problem");
      setProblems(res.data);
    } catch (err) {
      setError(err?.response?.data?.msg || "Failed to load problems.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const groupedTopics = useMemo(() => {
    const map = new Map();
    problems.forEach((problem) => {
      const topic = problem.topic?.trim() || "General";
      if (!map.has(topic)) {
        map.set(topic, []);
      }
      map.get(topic).push(problem);
    });
    return Array.from(map.entries());
  }, [problems]);

  useEffect(() => {
    if (groupedTopics.length === 0) return;
    setExpandedTopics((prev) => {
      const next = { ...prev };
      groupedTopics.forEach(([topic], index) => {
        if (typeof next[topic] === "undefined") {
          next[topic] = index === 0;
        }
      });
      return next;
    });
  }, [groupedTopics]);

  const toggleCheckbox = async (problem) => {
    try {
      await API.put(`/problem/${problem._id}`, {
        isCompleted: !problem.isCompleted,
      });
      setProblems((prev) =>
        prev.map((item) =>
          item._id === problem._id
            ? { ...item, isCompleted: !problem.isCompleted }
            : item,
        ),
      );
    } catch (err) {
      setError(err?.response?.data?.msg || "Failed to update problem.");
    }
  };

  const toggleTopic = (topic) => {
    setExpandedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

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

      <main className="topics-content" id="topics">
        <h1>Topics</h1>
        <p>Explore these exciting topics!</p>

        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}

        {!loading &&
          groupedTopics.map(([topic, list]) => {
            const doneCount = list.filter((item) => item.isCompleted).length;
            const topicState = doneCount === list.length ? "Done" : "Pending";
            const isOpen = Boolean(expandedTopics[topic]);

            return (
              <section className="topic-accordion" key={topic}>
                <button
                  className="topic-head"
                  type="button"
                  onClick={() => toggleTopic(topic)}
                >
                  <span>{topic}</span>
                  <span className={`status-pill ${topicState.toLowerCase()}`}>
                    {topicState}
                  </span>
                  <span className="chevron">{isOpen ? "⌃" : "⌄"}</span>
                </button>

                {isOpen && (
                  <div className="topic-body">
                    <h3>Sub Topics</h3>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>LeetCode Link</th>
                            <th>YouTube Link</th>
                            <th>Article Link</th>
                            <th>Level</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((problem) => (
                            <tr key={problem._id}>
                              <td className="problem-name">
                                <input
                                  type="checkbox"
                                  checked={problem.isCompleted}
                                  onChange={() => toggleCheckbox(problem)}
                                />
                                <span>{problem.title}</span>
                              </td>
                              <td>
                                <a
                                  href={problem.articleLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Practise
                                </a>
                              </td>
                              <td>
                                <a
                                  href={problem.youtubeLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Watch
                                </a>
                              </td>
                              <td>
                                <a
                                  href={problem.articleLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Read
                                </a>
                              </td>
                              <td>
                                {problem.difficulty?.toUpperCase() || "EASY"}
                              </td>
                              <td>
                                {problem.isCompleted ? "Done" : "Pending"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
      </main>
    </div>
  );
}

export default Dashboard;
