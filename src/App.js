import { Container, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './App.css';

export function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={'/'}>Dog App</Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
