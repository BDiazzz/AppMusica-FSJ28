import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { dbSstore } from '../firebase/appConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";


console.log(dbSstore); // Verifica que la conexión a Firestore esté funcionando

const Container = styled.div`
  font-family: 'Montserrat', sans-serif;
  background-color:var(--background-color);
  color: var(--text-color);
  width: 400px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconoSpotify = styled.i`
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  width: 100%;
`;

const ConjuntoInput = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1.4rem;
  border-radius: 3rem;
  border: 2px solid transparent; 
  background-color: var(--input-color);
  color: white;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-color: var(--text-color);
  }

  &:focus {
    outline: none;
    border-color: var(--text-color);
    background-color: var(--hover-color); 
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 1000px var(--input-color) inset;
    -webkit-text-fill-color: var(--text-color);
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const Boton = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
  background-color: var(--primary-color);
  border: none;
  border-radius: 3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: var(--primary-color);
    box-shadow: 0 0 2rem var(--primary-color);
  }
`;

const Error = styled.span`
  color: red;   
  font-size: 1.1rem;
  margin: auto;
  margin-top: 0.5rem;
  `;

export default function Login() {

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const navigate = useNavigate(); // <-- Hook para redireccionar

const iniciarSesion = async (data) => {
  const { identificador, password } = data;

  try {
    const usersRef = collection(dbSstore, "users");

    // Buscar por email
    const emailQuery = query(usersRef, where("email", "==", identificador));
    const emailSnapshot = await getDocs(emailQuery);

    // Buscar por nombre
    const usernameQuery = query(usersRef, where("name", "==", identificador));
    const usernameSnapshot = await getDocs(usernameQuery);

    let userDoc = null;

    if (!emailSnapshot.empty) {
      userDoc = emailSnapshot.docs[0];
    } else if (!usernameSnapshot.empty) {
      userDoc = usernameSnapshot.docs[0];
    }

    if (!userDoc) {
      Swal.fire({
        icon: "error",
        title: "Usuario no encontrado",
        text: "Verifica tu correo o nombre de usuario.",
      });
      return;
    }

    const userData = userDoc.data();

    if (userData.password !== password) {
      Swal.fire({
        icon: "error",
        title: "Contraseña incorrecta",
      });
      return;
    }

    // Todo bien
    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
    });

    navigate('/Principal', { state: { nombreUsuario: userData.name } });

  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al intentar iniciar sesión.",
    });
  }
};


  return (
    <Container>
      <IconoSpotify className="bi bi-spotify" />
      <Form onSubmit={handleSubmit(iniciarSesion)}>
        <ConjuntoInput>
          <Label htmlFor="identificador">Correo o nombre de usuario:</Label>
          <Input type="text" id="identificador" placeholder="Ingrese su correo o nombre" {...register("identificador", { required: true, maxLength: 30 })} />
          {errors.identificador && <Error>Este campo es requerido</Error>}
        </ConjuntoInput>
        <ConjuntoInput>
          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" id="password" placeholder="Ingrese su contraseña" {...register("password", { required: true })} />
          {errors.password && <Error>La contraseña es obligatoria</Error>}
        </ConjuntoInput>
        <Boton type="submit" value="Ingresar" />
      </Form>

      <Label style={{marginTop: "2rem"}}><Link to={"/Registrarse"}>¿No tienes cuenta? Registrate.</Link></Label>
    </Container>
  );
}
