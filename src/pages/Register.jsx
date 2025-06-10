import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert("Error registrant l'usuari: " + err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrar-se</h2>
      <input name="email" placeholder="Correu electrònic" type="email" required />
      <input name="password" placeholder="Contrasenya" type="password" required />
      <button>Registrar</button>
    </form>
  );
}

export default Register;
