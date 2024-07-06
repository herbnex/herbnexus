import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase.config"; // Adjust the path to your Firebase config
import { collection, getDocs } from "firebase/firestore";

const useHerbList = () => {
  const [herbs, setHerbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHerbs = async () => {
      const herbsCollection = collection(db, "herbs");
      const herbsSnapshot = await getDocs(herbsCollection);
      const herbsList = herbsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHerbs(herbsList);
      setIsLoading(false);
    };

    fetchHerbs();
  }, []);

  return [herbs, isLoading];
};

export default useHerbList;
