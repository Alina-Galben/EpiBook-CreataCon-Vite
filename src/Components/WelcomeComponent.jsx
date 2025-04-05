import React from "react"
import Alert from 'react-bootstrap/Alert';

export default function WelcomeComponent() {
  return (
    <Alert className='text-center pt-4 mb-0' variant="success">
      <h2 >Benvenuto in Epi Books! Che piacere vederti</h2>
    </Alert>
  )
}