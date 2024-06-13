import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import './BlogBanner.css';
import postImage1 from '../../assets/3.png'; // Replace with actual image path
import postImage2 from '../../assets/3.png'; // Replace with actual image path
import postImage3 from '../../assets/3.png'; // Replace with actual image path

const blogPosts = [
  {
    image: postImage1,
    title: "How TigerEye Uses Slack for Effective Communication as a Fully Remote Team",
    date: "June 12, 2024",
    category: "Playbook",
    link: "#",
  },
  {
    image: postImage2,
    title: "This Week in GTM - 6/7/24",
    date: "June 7, 2024",
    category: "News",
    link: "#",
  },
  {
    image: postImage3,
    title: "Over-assignment Drives Sales Culture",
    date: "June 5, 2024",
    category: "Playbook",
    link: "#",
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
            <Col md={4} key={index}>
              <Card className="mb-4 blog-post-card">
                <Card.Img variant="top" src={post.image} className="blog-post-image" />
                <Card.Body>
                  <Card.Text className="text-muted">{post.category} — {post.date}</Card.Text>
                  <Card.Title className="blog-post-title">{post.title}</Card.Title>
                  <Button variant="link" href={post.link} className="p-0 read-more">Read more &rarr;</Button>
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
