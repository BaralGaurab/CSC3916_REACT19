import React, { useEffect, useState, useMemo } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { addReview } from '../actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button, Row, Col } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch   = useDispatch();
  const { movieId } = useParams();

  const { selectedMovie, loading, error } = useSelector(state => state.movie);
  const submitting = useSelector(state => state.review?.submitting);

  const [form, setForm] = useState({ rating: 5, review: '' });

  const avgRating = useMemo(() => {
    if (selectedMovie?.avgRating != null)
      return selectedMovie.avgRating.toFixed?.(1) ?? selectedMovie.avgRating;
    if (!selectedMovie?.reviews?.length) return 'N/A';
    const sum = selectedMovie.reviews.reduce((s, r) => s + r.rating, 0);
    return (sum / selectedMovie.reviews.length).toFixed(1);
  }, [selectedMovie]);

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.review.trim()) return;
    dispatch(addReview(selectedMovie._id, form)).then(() => setForm({ rating: 5, review: '' }));
  };

  if (loading) return <div>Loading…</div>;
  if (error)   return <div className="text-danger">Error: {error}</div>;
  if (!selectedMovie) return <div>No movie data available.</div>;

  return (
    <Card className="bg-dark text-light p-4 rounded">
      <Card.Header as="h4" className="text-center">{selectedMovie.title}</Card.Header>

      <Card.Body className="text-center">
        {selectedMovie.imageUrl && (
          <Image src={selectedMovie.imageUrl} thumbnail fluid className="mx-auto d-block mb-3" />
        )}
        <h5><BsStarFill className="mb-1" /> {avgRating}</h5>
      </Card.Body>

      <Card.Body>
        <h5 className="text-center mb-3">Actors</h5>
        <ListGroup variant="flush" className="mb-3">
          {selectedMovie.actors.map((actor, i) => (
            <ListGroupItem key={i} className="bg-dark text-white text-center">
              <strong>{actor.actorName}</strong> — {actor.characterName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>

      <Card.Body>
        <h5 className="text-center mb-3">Add Your Review</h5>
        <Form onSubmit={handleSubmit} className="mb-3">
          <Row className="align-items-end g-2 justify-content-center">
            <Col xs={6} md={3} lg={2}>
              <Form.Label className="mb-1">Rating</Form.Label>
              <Form.Select
                value={form.rating}
                onChange={e => setForm({ ...form, rating: +e.target.value })}
                disabled={submitting}
                className="bg-dark text-light"
              >
                {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
              </Form.Select>
            </Col>
            <Col xs={12} md={7}>
              <Form.Label className="mb-1">Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Your thoughts…"
                className="bg-dark text-light"
                value={form.review}
                onChange={e => setForm({ ...form, review: e.target.value })}
                disabled={submitting}
              />
            </Col>
            <Col xs={12} md={2} className="d-grid">
              <Button type="submit" variant="primary" disabled={submitting}>Submit</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>

      <Card.Body>
        <h5 className="text-center mb-3">Reviews</h5>
        {selectedMovie.reviews.length === 0 && (
          <p className="text-white-50 text-center">No reviews yet.</p>
        )}
        {selectedMovie.reviews.map((review, i) => (
          <p key={i} className="text-white mb-2 text-center">
            <strong>{review.username}</strong> &nbsp; {review.review} &nbsp;
            <BsStarFill className="mb-1" /> {review.rating}
          </p>
        ))}
      </Card.Body>
    </Card>
  );
};

export default MovieDetail;