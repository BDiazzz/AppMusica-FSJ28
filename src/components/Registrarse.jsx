import React from 'react'
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { dbSstore } from '../firebase/appConfig';
import Swal from 'sweetalert2';

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

export default function Registrarse() {

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const navigate = useNavigate(); 

const saveUser = async (data) => {
  try {
    const usersRef = collection(dbSstore, "users");

    // Verifica si ya existe el correo
    const emailQuery = query(usersRef, where("email", "==", data.email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      Swal.fire({
        icon: "error",
        title: "Correo ya registrado",
        text: "El correo ya está en uso. Usa otro diferente.",
      });
      return;
    }

    // Verifica si ya existe el nombre de usuario
    const usernameQuery = query(usersRef, where("name", "==", data.username));
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      Swal.fire({
        icon: "error",
        title: "Nombre de usuario ya registrado",
        text: "El nombre de usuario ya está en uso.",
      });
      return;
    }

    // Si ambos son únicos, registrar
    await addDoc(usersRef, {
      email: data.email,
      name: data.username,
      password: data.password,
    });

    Swal.fire({
      title: "Usuario registrado",
      icon: "success",
      draggable: true,
    });

    navigate('/');
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal al registrar el usuario.",
    });
  }
};


  return (
    <Container>
      <IconoSpotify className="bi bi-spotify" />
      <Form onSubmit={handleSubmit(saveUser)}>
        <ConjuntoInput>
          <Label htmlFor="name">Correo:</Label>
          <Input type="email" id="name" placeholder="Ingrese su correo" {...register("email", { required: true, maxLength: 30})}/>
          {errors.email && <Error>Este campo es requerido</Error>}
        </ConjuntoInput>
        <ConjuntoInput>
            <Label htmlFor="name">Nombre de usuario:</Label>
            <Input type="text" id="name" placeholder="Ingrese su nombre de usuario" {...register("username", { required: true, maxLength: 30})}/>
            {errors.username && <Error>Este campo es requerido</Error>}
        </ConjuntoInput>
        <ConjuntoInput>
          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" id="password" placeholder="Ingrese su contraseña" {...register("password", { required: true})}/>
          {errors.password && <Error>La contraseña es obligatoria</Error>}
        </ConjuntoInput>
        <Boton type="submit" value="Registrarse" />
      </Form>
    </Container>
  );
}

