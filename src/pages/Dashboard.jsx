import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      where("owner", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Els meus projectes</h2>
      <Link to="/new"><button>+ Nou projecte</button></Link>
      {projects.length === 0 ? (
        <p>No tens cap projecte encara.</p>
      ) : (
        <div>
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
