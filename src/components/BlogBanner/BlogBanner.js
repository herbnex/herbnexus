
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './BlogBanner.css';
import preWorkoutImage from '../../assets/3.png';
import fadogiaAgrestisImage from '../../assets/3.png';
import baobabPowderImage from '../../assets/3.png';
import postWorkoutWomenImage from '../../assets/3.png';

const StatsBanner = () => {
  const blogPosts = [
    {
      id: '1',
      title: 'Top 10 Pre-Workout Supplements',
      summary: 'Top 10 Pre-Workout Supplements to Try',
      content: 'Detailed content about pre-workout supplements...',
      category: 'Health',
      image: preWorkoutImage
    },
    {
      id: '2',
      title: 'Benefits of Fadogia Agrestis',
      summary: 'Benefits of Fadogia Agrestis (Enhancement)',
      content: 'Detailed content about Fadogia Agrestis...',
      category: 'Health',
      image: fadogiaAgrestisImage
    },
    {
      id: '3',
      title: 'Benefits of Baobab Powder',
      summary: 'Benefits of Baobab Powder (Immunity)',
      content: 'Detailed content about Baobab Powder...',
      category: 'Nutrition',
      image: baobabPowderImage
    },
    {
      id: '4',
      title: 'Top 10 Post-Workout Supplements for Women',
      summary: 'Top 10 Post-Workout Supplements for Women',
      content: 'Detailed content about post-workout supplements...',
      category: 'Wellness',
      image: postWorkoutWomenImage
    }
  ];

  return (
    <div className="stats-banner">
      <Container fluid className="py-5">
        <Row className="align-items-center">
          <Col md={12} className="text1-col text-center">
            <h1 className="display-4">Our Community Blog</h1>
            <h2 className="connect text-highlight">Discover the latest articles</h2>
          </Col>
        </Row>
        <Row className="align-items-center mt-4">
          {blogPosts.slice(0, 3).map(post => (
            <Col md={4} key={post.id} className="mb-4">
              <Card className="blog-card">
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.summary}</Card.Text>
                  <Button variant="primary" onClick={() => window.location.href = `/article/${post.id}`}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="wave"></div>
    </div>
  );
};

export default StatsBanner;
