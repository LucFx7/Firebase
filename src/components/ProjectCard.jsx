import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{project.name}</h3>
      <p>{project.description || "Sense descripció"}</p>
      <Link to={`/project/${project.id}`}>
        <button>Obrir</button>
      </Link>
    </div>
  );
}

export default ProjectCard;
