import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import useDoctorList from "../../../hooks/useDoctorList";
import Loading from "../../Loading/Loading";
import SectionTitle from "../../SectionTitle/SectionTitle";
import DoctorCard from "../../DoctorCard/DoctorCard";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import "./Doctors.css"; // Import the CSS file

const Doctors = () => {
  const { isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpeciality, setFilterSpeciality] = useState("");
  const [filterOnlineStatus, setFilterOnlineStatus] = useState("");
  const [doctors] = useDoctorList();
  const [currentPage, setCurrentPage] = useState(0);
  const history = useHistory();
  const doctorsPerPage = 6;

  const handleChatLive = (doctorId) => {
    history.push(`/contact?doctorId=${doctorId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  const filteredDoctors = doctors.filter((doctor) => {
    const query = searchQuery.toLowerCase();
    const matchesSearchQuery = 
      doctor.name.toLowerCase().includes(query) ||
      doctor.speciality.toLowerCase().includes(query) ||
      doctor.bio.toLowerCase().includes(query) ||
      doctor.degrees.toLowerCase().includes(query) ||
      doctor.office.toLowerCase().includes(query);

    const matchesSpeciality = filterSpeciality ? doctor.speciality === filterSpeciality : true;
    const matchesOnlineStatus =
      filterOnlineStatus === "online"
        ? doctor.isOnline
        : filterOnlineStatus === "offline"
        ? !doctor.isOnline
        : true;

    return matchesSearchQuery && matchesSpeciality && matchesOnlineStatus;
  });

  const pageCount = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedDoctors = filteredDoctors.slice(
    currentPage * doctorsPerPage,
    (currentPage + 1) * doctorsPerPage
  );

  return (
    <div className="ourh">
      <SectionTitle>
        <h1>Our Herbalists</h1>
      </SectionTitle>
      <Container>
        <Row className="filter-row">
          <Col xs={12} md={4}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
          </Col>
          <Col xs={12} md={4}>
            <Form.Control
              as="select"
              value={filterSpeciality}
              onChange={(e) => setFilterSpeciality(e.target.value)}
              className="form-control"
            >
              <option value="">All Specialties</option>
              <option value="Traditional Arabic Medicine">Traditional Arabic Medicine</option>
              <option value="Integrative Herbal Medicine">Integrative Herbal Medicine</option>
              <option value="Dermatological Herbalist">Dermatological Herbalist</option>
              <option value="Traditional Chinese Medicine">Traditional Chinese Medicine</option>
              <option value="Naturopathic Medicine">Naturopathic Medicine</option>
              {/* Add more specialties as needed */}
            </Form.Control>
          </Col>
          <Col xs={12} md={4}>
            <Form.Control
              as="select"
              value={filterOnlineStatus}
              onChange={(e) => setFilterOnlineStatus(e.target.value)}
              className="form-control"
            >
              <option value="">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </Form.Control>
          </Col>
        </Row>
        <Row>
          {displayedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              isOnline={doctor.isOnline}
              handleChatLive={handleChatLive}
            />
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
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Doctors;
