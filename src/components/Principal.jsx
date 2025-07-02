import React, { useRef, useState } from "react";
import styled from "styled-components";
import imagen1 from "../assets/imagen1.webp";
import imagen2 from "../assets/imagen2.jpg";
import imagen3 from "../assets/imagen3.jpg";
import imagen4 from "../assets/imagen4.webp";
import imagen5 from "../assets/imagen5.jpg";
import imagen6 from "../assets/imagen6.jpg";
import imagen7 from "../assets/imagen7.webp";
import imagen8 from "../assets/imagen8.webp";
import { useLocation } from 'react-router-dom';


const ContenedorPrincipal = styled.div`
  display: flex;
  min-height: 100%;
  width: 100vw;
  font-family: "Montserrat", sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  /* Removemos el overflow: hidden */
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* Cambiamos a min-height en lugar de height fija */
  min-height: 100vh;
  /* Aseguramos que el scroll sea interno */
  overflow-y: auto;
`;

const Sidebar = styled.div`
  width: 22rem;
  background-color: #000;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarItem = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    color: var(--primary-color);
  }
`;

const Navbar = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column; // Cambia a columna en móviles
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row; // Vuelve a fila en desktop
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: right;
  span {
    font-size: 1.5rem;
    color: var(--text-color);
    margin-right: 1rem;
  }
  i {
    font-size: 1.6rem;
    cursor: pointer;
  }
  section {
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%; // Ocupa todo el ancho en móviles
  margin: 0.5rem;

  @media (min-width: 768px) {
    max-width: 40rem; // Ancho máximo en desktop
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border-radius: 2rem;
  border: 2px solid transparent;
  font-size: 1.2rem;
  background-color: var(--input-color);
  color: var(--text-color);

  &::placeholder {
    color: #aaa;
  }
  &:hover {
    border-color: var(--text-color);
    background-color: var(--hover-color);
  }
  &:focus {
    outline: none;
    background-color: #333;
  }
`;

const LeftGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; // Columna en móviles
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row; // Fila en desktop
    align-items: center;
  }
`;

const ConjuntoBtn = styled.div`
  display: flex;
  flex-direction: column; // Columna en móviles
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row; // Fila en desktop
    justify-content: flex-end;
    width: auto;
  }
`;

const PremiumBtn = styled.button`
  width: 100%; // Ocupa todo el ancho en móviles
  padding: 0.75rem;
  border-radius: 2rem;
  font-size: 1rem; // Tamaño más pequeño en móviles
  background-color: var(--text-color);
  color: var(--secondary-color);
  text-align: center;
  cursor: pointer;
  font-weight: bold;

  @media (min-width: 768px) {
    width: 13rem; // Ancho fijo en desktop
    font-size: 1.2rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const IconosYInstall = styled.button`
  @media (min-width: 992px) {
    display: flex; // Muestra en pantallas grandes
    width: 20rem;
    padding: 0.75rem;
    border: none;
    font-size: 1.2rem;
    background-color: inherit;
    color: gray;
    align-items: center;
    gap: 1rem;
    font-weight: bold;
  }

  width: 20rem;
  padding: 0.75rem;
  border: none;

  font-size: 1.2rem;
  background-color: inherit;
  color: gray;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: bold;

  section {
    display: flex;
    gap: 0.5rem;
    font-size: 1.2rem;
    align-items: center;

    i {
      font-size: 1.6rem;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SearchIcon = styled.i`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 1.2rem;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  font-size: 1.2rem;

  i {
    font-size: 1.6rem;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0rem;
  margin-left: 2rem;
`;

const Titulo2 = styled.h2`
  font-size: 1.6rem;
  margin: 2rem 2rem;
  margin-bottom: 0;
`;

const PlaylistFila = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--input-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 1rem;
  height: 5rem;
  width: 100%;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const PlayIcon = styled.i`
  margin-left: auto;
  font-size: 2rem;
  margin-right: 1rem;
  color: var(--primary-color);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${PlaylistFila}:hover & {
    opacity: 1;
  }
`;

const MiniImagen = styled.div`
  width: 5rem;
  height: 5rem;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
`;

const GridPlaylists = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem;
`;

const RowScroll = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  gap: 1.5rem;
  padding: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  width: 180px;
  flex-shrink: 0; /* evita que se reduzcan cuando hay overflow */
  background-color: var(--input-color);
  border-radius: 0.5rem;
  padding: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--hover-color);
  }
`;
const Flecha = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.izquierda {
    left: 0.5rem;
  }

  &.derecha {
    right: 0.5rem;
  }
`;

const CarruselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const CardImage = styled.div`
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.div`
  font-weight: 60rem;
  font-size: 1.2rem;
`;

const CardSubtitle = styled.div`
  font-size: 1rem;
  color: #b3b3b3;
`;

const Footer = styled.footer`
  background-color: var(--secondary-color);
  color: var(--text-color);
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  border-top: 1px solid #333;
  margin-top: auto;
`;

const playlists = [
  {
    id: 1,
    nombre: "Lo mejor de Aimer",
    artista: "Aimer",
    imagen: imagen1,
  },
  {
    id: 2,
    nombre: "Hits de Lisa",
    artista: "Lisa",
    imagen: imagen2,
  },
  {
    id: 3,
    nombre: "Lo más escuchado de Ado",
    artista: "Ado",
    imagen: imagen3,
  },

  {
    id: 4,
    nombre: "Favoritos de Coldplay",
    artista: "Coldplay",
    imagen: imagen4,
  },

  {
    id: 5,
    nombre: "Exitos de The Weeknd",
    artista: "The Weeknd",
    imagen: imagen5,
  },

  {
    id: 6,
    nombre: "Top 10 de Linkin Park",
    artista: "Linkin Park",
    imagen: imagen6,
  },

  {
    id: 7,
    nombre: "Clásicos de The Beatles",
    artista: "The Beatles",
    imagen: imagen7,
  },

  {
    id: 8,
    nombre: "Lo mejor de Queen",
    artista: "Queen",
    imagen: imagen8,
  },
];

// Estilo del menú hamburguesa
const Hamburger = styled.div`
  display: block;
  cursor: pointer;
  font-size: 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Principal() {

  const location = useLocation();
  const nombreUsuario = location.state?.nombreUsuario || "Usuario";

  const scrollRef = useRef();

  const scrollIzquierda = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollDerecha = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const [menuOpen, setMenuOpen] = useState(null); 

  // Determina si es móvil basado en el ancho de pantalla
  const isMobile = window.innerWidth < 768;

  return (
    <ContenedorPrincipal>
      <Sidebar>
        <SidebarItem>
          <i className="bi bi-house-door-fill" />
          Inicio
        </SidebarItem>
        <SidebarItem>
          <i className="bi bi-search" />
          Buscar
        </SidebarItem>
        <SidebarItem>
          <i className="bi bi-music-note-list" />
          Tu Biblioteca
        </SidebarItem>
        <SidebarItem>
          <i className="bi bi-plus-square" />
          Crear Playlist
        </SidebarItem>
        <SidebarItem>
          <i className="bi bi-heart-fill" />
          Canciones que te gustan
        </SidebarItem>
      </Sidebar>
      <MainContent>
        <Navbar>
          {/* Hamburguesa solo visible en móvil */}
          {isMobile && (
            <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`bi bi-${menuOpen ? "x" : "list"}`} />
            </Hamburger>
          )}

          {/* Contenido siempre visible en desktop, condicional en móvil */}
          <LeftGroup
            style={{
              display: isMobile && menuOpen === false ? "none" : "flex",
            }}
          >
            <SearchWrapper>
              <SearchBar placeholder="¿Qué quieres reproducir?" />
              <SearchIcon className="bi bi-search" />
            </SearchWrapper>
            <NavButtons>
              <section>
                <span>|</span>
                <i class="bi bi-folder2" title="Explorar"></i>
              </section>
            </NavButtons>
          </LeftGroup>

          <ConjuntoBtn
            style={{
              display: isMobile && menuOpen === false ? "none" : "flex",
            }}
          >
            <PremiumBtn>Explorar Premium</PremiumBtn>
            <IconosYInstall>
              <section style={{ width: "18rem" }}>
                <i
                  className="bi bi-arrow-down-circle"
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                ></i>
                <span>Instalar aplicación</span>
              </section>
              <section>
                <i class="bi bi-bell" title="Novedades"></i>
              </section>
              <section>
                <i class="bi bi-people-fill" title="Actividad de amigos"></i>
              </section>
            </IconosYInstall>
            <User>
              <i className="bi bi-person-circle" />
              {nombreUsuario}
            </User>
          </ConjuntoBtn>
        </Navbar>

        <Header style={{ marginTop: "2rem" }}>Bienvenido, {nombreUsuario}</Header>

        <Titulo2>Recomendados para ti</Titulo2>
        <GridPlaylists>
          {playlists.map((playlist) => (
            <PlaylistFila key={playlist.id}>
              <MiniImagen
                style={{ backgroundImage: `url(${playlist.imagen})` }}
              />
              <span>{playlist.nombre}</span>
              <PlayIcon className="bi bi-play-circle" />
            </PlaylistFila>
          ))}
        </GridPlaylists>

        <Titulo2>Hecho para</Titulo2>
        <Header>{nombreUsuario}</Header>
        <CarruselWrapper>
          <Flecha className="izquierda" onClick={scrollIzquierda}>
            &#60;
          </Flecha>
          <RowScroll ref={scrollRef}>
            {playlists.map((playlist) => (
              <Card key={playlist.id}>
                <CardImage
                  style={{ backgroundImage: `url(${playlist.imagen})` }}
                />
                <CardTitle>{playlist.nombre}</CardTitle>
                <CardSubtitle>{playlist.artista}</CardSubtitle>
              </Card>
            ))}
          </RowScroll>
          <Flecha className="derecha" onClick={scrollDerecha}>
            &#62;
          </Flecha>
        </CarruselWrapper>
        <Footer>
          © {new Date().getFullYear()} Spotify • Todos los derechos reservados
        </Footer>
      </MainContent>
    </ContenedorPrincipal>
  );
}
