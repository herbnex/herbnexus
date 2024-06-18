import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import './BlogBanner.css';
import postImage1 from '../../assets/gut_health.png'; // Replace with actual image path
import postImage2 from '../../assets/focus.png'; // Replace with actual image path
import postImage3 from '../../assets/hair_health.png'; // Replace with actual image path
import postImage4 from '../../assets/fitness.png'; // Replace with actual image path

const blogPosts = [
  {
    image: postImage1,
    title: "Optimizing Your Health: The Best Supplements for Gut Health",
    date: "June 17, 2024",
    category: "Health",
    link: "https://www.linkedin.com/pulse/optimizing-your-health-best-supplements-gut-herbnexus-fv6tc/?trackingId=by46EHZu6F6rlMSkCHPtdQ%3D%3D", // Replace with actual link to the article
  },
  {
    image: postImage2,
    title: "Enhance Your Focus: Natural Herbs and Supplements for Cognitive Support",
    date: "June 18, 2024",
    category: "Health",
    link: "https://www.linkedin.com/pulse/enhance-your-focus-natural-herbs-supplements-cognitive-support-ek0qc", // Replace with actual link to the article
  },
  {
    image: postImage3,
    title: "Achieving Lustrous Locks: Top Herbs and Supplements for Hair Health",
    date: "June 19, 2024",
    category: "Health",
    link: "https://www.linkedin.com/pulse/achieving-lustrous-locks-top-herbs-supplements-hair-health-et4ec", // Replace with actual link to the article
  },
  {
    image: postImage4,
    title: "Boost Your Fitness: Herbal Supplements for Enhanced Performance",
    date: "June 20, 2024",
    category: "Health",
    link: "https://www.linkedin.com/pulse/boost-your-fitness-herbal-supplements-enhanced-performance-bylzc", // Replace with actual link to the article
  },
];

const BlogBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = blogPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.category.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  return (
    <Container fluid className="blog-banner">
      <Container>
        <Row className="align-items-center mb-4">
          <Col md={9}>
            <Form.Control 
              type="search" 
              placeholder="Search posts" 
              className="me-2" 
              aria-label="Search" 
              value={searchQuery}
              onChange={handleSearch}
            />
          </Col>
          <Col md={3} className="text-md-right">
            <Button variant="outline-dark" className="btn-browse">Browse all posts</Button>
          </Col>
        </Row>
        <Row>
          {filteredPosts.map((post, index) => (
            <Col md={3} key={index}>
              <Card className="mb-4 blog-post-card">
                <Card.Img variant="top" src={post.image} className="blog-post-image" />
                <Card.Body>
                  <Card.Text className="text-muted">{post.category} — {post.date}</Card.Text>
                  <Card.Title className="blog-post-title">{post.title}</Card.Title>
                  <Button variant="link" href={post.link} target="_blank" className="p-0 read-more">Read more &rarr;</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default BlogBanner;
