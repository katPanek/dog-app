import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, Image, Row, Spinner } from 'react-bootstrap';

export const Breed = () => {
  const params = useParams();
  const [breed, setBreed] = useState(null);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${params.breedName}`)
      .then((response) => {
        if (!response.ok) throw response.json();
        return response.json();
      })
      .then((data) => setBreed(data[0]))
      .catch((error) => error.then(setError));
  }, [params.breedName]);

  useEffect(() => {
    if (!breed) return;
    fetch(`https://api.thedogapi.com/v1/images/${breed.reference_image_id}`)
      .then((response) => {
        if (!response.ok) throw response.json();
        return response.json();
      })
      .then((data) => setPhoto(data.url))
      .catch((error) => error.then(setError));
  }, [breed]);

  if (error) {
    return (
      <div className="d-flex w-100 justify-content-center position-absolute top-50">
        <Alert variant="danger">
          <Alert.Heading>
            Oh snap! We got an error! Refresh the page.
          </Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      </div>
    );
  }

  if (breed === null) {
    return (
      <div className="d-flex w-100 justify-content-center position-absolute top-50">
        <Spinner animation="border"></Spinner>
      </div>
    );
  }

  if (breed === undefined) {
    return (
      <div className="d-flex w-100 justify-content-center position-absolute top-50">
        <Alert variant="danger">
          <Alert.Heading>Oh snap! We got an error!</Alert.Heading>
          <p>Dog not found</p>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col xs={12} md={6}>
            <h1>{params.breedName}</h1>
          </Col>
        </Row>
        <Row className="py-3">
          <Col xs={12} md={6}>
            <Image fluid src={photo}></Image>
          </Col>
          <Col xs={12} md={6}>
            <h3>Life span</h3>
            <p>{breed.life_span}</p>
            <h3>Temperament</h3>
            <p>{breed.temperament}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
