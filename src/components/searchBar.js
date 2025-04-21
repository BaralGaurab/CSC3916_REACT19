import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../actions/searchActions';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

export default function SearchPage() {
  const [text, setText]   = useState('');
  const dispatch          = useDispatch();
  const results           = useSelector(s => s.movie.movies); 
  const navigate          = useNavigate();

  const submit = e => {
    e.preventDefault();
    if (text.trim()) dispatch(searchMovies(text));
  };

  return (
    <div className="p-4">
      <h3 className="text-white mb-3">Search Movies</h3>

      <Form onSubmit={submit} className="mb-4">
        <Row className="g-2">
          <Col xs={9} md={10}>
            <Form.Control
              className="bg-dark text-light"
              placeholder="Enter movie title or actor name…"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Col>
          <Col xs={3} md={2} className="d-grid">
            <Button type="submit" variant="primary">Search</Button>
          </Col>
        </Row>
      </Form>

      <Row xs={1} md={4} className="g-4">
        {results.map(m => (
          <Col key={m._id}>
            <Card
              bg="dark"
              text="light"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/movie/${m._id}`)}
            >
              {m.imageUrl && <Card.Img variant="top" src={m.imageUrl} />}
              <Card.Body>
                <Card.Title>{m.title}</Card.Title>
                <Card.Text>
                  <BsStarFill /> {(m.avgRating ?? 'N/A').toFixed?.(1) ?? m.avgRating}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
