// src/Dashboard.jsx
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import ChatAI from './ChatAI';

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');

  // Cargar solo los proyectos del usuario actual
  const loadProjects = async () => {
    const q = query(collection(db, 'projects'), where('owner', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    setProjects(result);
  };

  const createProject = async () => {
    if (!newProject.trim()) return;

    await addDoc(collection(db, 'projects'), {
      name: newProject,
      owner: user.uid,
      participants: [],
      expenses: [],
    });

    setNewProject('');
    loadProjects(); // refrescar
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.welcome}>Benvingut/da, {user.email}</h2>
        <button style={styles.logoutBtn} onClick={logout}>Sortir</button>
      </header>

      <section style={styles.projectsSection}>
        <h3 style={styles.sectionTitle}>Projectes</h3>
        <div style={styles.newProjectArea}>
          <input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder='Nou projecte'
            style={styles.input}
          />
          <button onClick={createProject} style={styles.createBtn}>Crear</button>
        </div>
        <ul style={styles.projectList}>
          {projects.map((proj) => (
            <li key={proj.id} style={styles.projectItem}>{proj.name}</li>
          ))}
        </ul>
      </section>

      <section style={styles.chatSection}>
        <ChatAI />
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '30px auto',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcome: {
    margin: 0,
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#ff4d4f',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  projectsSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    marginBottom: 15,
    fontWeight: '600',
    fontSize: 22,
  },
  newProjectArea: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flexGrow: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    outline: 'none',
  },
  createBtn: {
    backgroundColor: '#28a745',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
  },
  projectList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxHeight: 200,
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: 8,
  },
  projectItem: {
    padding: 12,
    borderBottom: '1px solid #eee',
    fontSize: 16,
  },
  chatSection: {
    marginTop: 40,
  },
};

export default Dashboard;

