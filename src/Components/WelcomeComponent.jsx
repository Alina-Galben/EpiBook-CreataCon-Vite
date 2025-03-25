import React from "react"
import Alert from 'react-bootstrap/Alert';

export default function WelcomeComponent() {
  return (
    <Alert className='text-center pt-3' variant="success">
      <Alert.Heading>Ehi, che piacere vederti</Alert.Heading>
      <h1 className='my-5'>Benvenuto in Epi Books!</h1>
      <hr />
      <p className="mb-2">
      Novità da non perdere
      </p>
      <p className="mb-2">
        Tante offerte interessanti
      </p>
    </Alert>
  )
}