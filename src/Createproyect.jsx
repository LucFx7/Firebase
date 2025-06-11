const createProject = async () => {
  if (!newProject.trim()) {
    alert('Por favor, ingresa un nombre para el proyecto.');
    return;
  }
  try {
    console.log('Creando proyecto:', newProject);
    await addDoc(collection(db, `users/${user.uid}/projects`), {
      name: newProject.trim(),
      participants: [],
      expenses: []
    });
    setNewProject('');      // Limpiar input después de crear proyecto
    await loadProjects();   // Recargar lista de proyectos para mostrar el nuevo
    alert('Proyecto creado con éxito!');
  } catch (error) {
    alert('Error al crear proyecto: ' + error.message);
  }
};

