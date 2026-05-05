function ProblemCard({ problem, onToggle }) {
  return (
    <div className="problem-card">
      <div className="problem-top">
        <div>
          <h4>{problem.title}</h4>
          <p>
            {problem.topic || "General"} | {problem.difficulty}
          </p>
        </div>
        <label className="check-wrap">
          <input
            type="checkbox"
            checked={problem.isCompleted}
            onChange={() => onToggle(problem)}
          />
          Done
        </label>
      </div>
      <div className="problem-links">
        <a href={problem.youtubeLink || "#"} target="_blank" rel="noreferrer">
          YouTube
        </a>
        <a href={problem.articleLink || "#"} target="_blank" rel="noreferrer">
          Article
        </a>
      </div>
    </div>
  );
}

export default ProblemCard;
