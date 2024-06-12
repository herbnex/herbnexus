import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import './BlogBanner.css';
import { db } from "../../../src/Firebase/firebase.config"; // Ensure you have firebase configuration

const StatsBanner = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from Firebase
    const fetchBlogPosts = async () => {
      const blogPostsCollection = await db.collection('blogPosts').get();
      const blogPostsData = blogPostsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogPosts(blogPostsData);
    };

    fetchBlogPosts();
  }, []);

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
          <Col md={12}>
            <Carousel>
              {blogPosts.map(post => (
                <Carousel.Item key={post.id}>
                  <img
                    className="d-block w-100"
                    src={post.image}
                    alt={post.title}
                  />
                  <Carousel.Caption>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => window.location.href = `/article/${post.id}`}
                    >
                      Read More
                    </button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
      <div className="wave"></div>
    </div>
  );
};

export default StatsBanner;
