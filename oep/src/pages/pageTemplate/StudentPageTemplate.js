import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import StudentNavbar from '../../components/navbar/StudentNavbar'
import './studentPageTemplate.css'

function StudentPageTemplate( {children} ) {
  return (
    <Container fluid>
        <StudentNavbar/>
        <Container fluid id="bodyContainer">
        {children}
        </Container>
    </Container>
  )
}

export default StudentPageTemplate