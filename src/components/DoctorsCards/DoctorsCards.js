import { Container, Row } from "react-bootstrap";
import useDoctorList from "../../hooks/useDoctorList";
import DoctorCard from "../DoctorCard/DoctorCard";
import { useHistory } from "react-router-dom";

const DoctorsCards = (props) => {
  const [doctors] = useDoctorList();
  const history = useHistory();

  const handleChatLive = (doctorId) => {
    history.push(`/contact?doctorId=${doctorId}`);
  };

  const limit = props.home ? 6 : doctors.length;
  return (
    <Container>
      <Row>
        {doctors.slice(0, limit).map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            isOnline={doctor.isOnline}
            handleChatLive={handleChatLive}
          />
        ))}
      </Row>
    </Container>
  );
};

export default DoctorsCards;
