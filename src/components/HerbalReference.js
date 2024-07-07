import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import useHerbList from "./useHerbList"; // Hook to fetch herbs
import HerbCard from "./HerbCard"; // Component to display individual herb details
import Loading from "./Loading/Loading";
import SectionTitle from "./SectionTitle/SectionTitle";
import ReactPaginate from "react-paginate";
import "./HerbalReference.css"; // Import the CSS file

const HerbalReference = () => {
  const [herbs, isLoading] = useHerbList(); // Custom hook to fetch herb list
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterModality, setFilterModality] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, filterCategory, filterModality]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredHerbs = herbs.filter((herb) => {
    const query = searchQuery.toLowerCase();
    const matchesSearchQuery = 
      herb.name.toLowerCase().includes(query) ||
      herb.healthCondition.toLowerCase().includes(query) ||
      herb.description.toLowerCase().includes(query);

    const matchesCategory = filterCategory ? herb.category === filterCategory : true;
    const matchesModality = filterModality ? herb.modality === filterModality : true;

    const isMatch = matchesSearchQuery && matchesCategory && matchesModality;

    // Logging for debugging
    
    return isMatch;
  });

  const pageCount = Math.ceil(filteredHerbs.length / itemsPerPage);
  const displayedHerbs = filteredHerbs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="herbal-reference">
      <SectionTitle>
        <h1>Herbal Reference</h1>
      </SectionTitle>
      <Container>
        <Row className="filter-row">
          <Col xs={12} md={4}>
            <Form.Control
              type="text"
              placeholder="Search by herb or health condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
          </Col>
          <Col xs={12} md={4}>
            <Form.Control
              as="select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="form-control"
            >
              <option value="">All Categories</option>
              <option value="Digestive">Digestive</option>
              <option value="Respiratory">Respiratory</option>
              <option value="Cardiovascular">Cardiovascular</option>
              <option value="Immune Support">Immune Support</option>
              <option value="Nervous System">Nervous System</option>
              {/* Add more categories as needed */}
            </Form.Control>
          </Col>
          <Col xs={12} md={4}>
            <Form.Control
              as="select"
              value={filterModality}
              onChange={(e) => setFilterModality(e.target.value)}
              className="form-control"
            >
              <option value="">All Modalities</option>
              <option value="TCM">TCM</option>
              <option value="Arabic">Arabic</option>
              <option value="Western Herbal Medicine">Western Herbal Medicine</option>
              <option value="Ayurvedic">Ayurvedic</option>
              {/* Add more modalities as needed */}
            </Form.Control>
          </Col>
        </Row>
        <Row>
          {displayedHerbs.map((herb) => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
        </Row>
        <Row>
          <Col>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              forcePage={currentPage} // Force current page reset
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HerbalReference;
