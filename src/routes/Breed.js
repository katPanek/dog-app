import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { TextPlaceholder } from '../components/TextPlaceholder';

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
          <Col>
            <h1>{params.breedName}</h1>
          </Col>
        </Row>
        <Row className="py-4">
          <Col xs={12} md={6}>
            {!photo ? (
              <ImagePlaceholder />
            ) : (
              <figure className="figure">
                <img
                  src={photo}
                  className="figure-img img-fluid rounded"
                  alt="..."
                />
                <figcaption className="figure-caption">
                  A photo of {params.breedName.toLowerCase()}.
                </figcaption>
              </figure>
            )}
          </Col>
          <Col xs={12} md={{ span: 5, offset: 1 }}>
            {breed === null ? (
              <TextPlaceholder count={6} />
            ) : (
              <>
                <h4>Life span</h4>
                <p className="mb-5">{breed.life_span}</p>
                <h4>Temperament</h4>
                <p className="mb-5">{breed.temperament}</p>
                <h4>Breed group</h4>
                <p className="mb-5">{breed.breed_group}</p>
                <h4>Speciality</h4>
                <p className="mb-5">{breed.bred_for}</p>
                <h4>Weight</h4>
                <p className="mb-5">{breed.weight.metric} kg</p>
                <h4>Height</h4>
                <p className="mb-5">{breed.height.metric} cm</p>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};


