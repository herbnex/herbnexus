import { useEffect, useState } from "react";
import { db } from "../../src/Firebase/firebase.config"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";

const useDoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorsList = doctorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDoctors(doctorsList);
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      }
    };

    fetchDoctors();
  }, []);

  return [doctors, setDoctors];
};

export default useDoctorList;
