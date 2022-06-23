import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TablePagination } from '../components/TablePagination';

export const BreedsTable = () => {
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);
  const [recordsLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [recordsTotal, setRecordsTotal] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.thedogapi.com/v1/breeds?limit=${recordsLimit}&page=${page}`,
    )
      .then((response) => {
        if (!response.ok) throw response.json();
        setRecordsTotal(Number(response.headers.get('pagination-count')));
        return response.json();
      })
      .then(setBreeds)
      .catch((error) => error.then(setError));
  }, [page]);

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

  if (!breeds.length) {
    return (
      <div className="d-flex w-100 justify-content-center position-absolute top-50">
        <Spinner
          data-testid={'breeds-table-loader'}
          animation="border"></Spinner>
      </div>
    );
  }

  return (
    <Container>
      <Row className="py-5">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Breed name</th>
                <th>Life span</th>
                <th>Temperament</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.id}</td>
                  <td>
                    <Link to={'/' + breed.name}>{breed.name}</Link>
                  </td>
                  <td>{breed.life_span}</td>
                  <td>{breed.temperament}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <TablePagination
            pageSize={recordsLimit}
            recordsTotal={recordsTotal}
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
          />
        </Col>
      </Row>
    </Container>
  );
};
