import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BiChip } from 'react-icons/bi';

function OepBrand() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href="#">
            <BiChip width="50" height="50" className="d-inline-block align-top"></BiChip>
            OEP
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default OepBrand