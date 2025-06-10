import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Inici</Link>
      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Sortir</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sessió</Link>
          <Link to="/register">Registrar-se</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
