import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert("Error iniciant sessió: " + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sessió</h2>
      <input name="email" placeholder="Correu electrònic" type="email" required />
      <input name="password" placeholder="Contrasenya" type="password" required />
      <button>Entrar</button>
    </form>
  );
}

export default Login;
