const { db, auth } = require('../../../Firebase/setupFirebaseAdmin');
const doctors = require('../../../../public/doctorsList.json'); // Your JSON data

async function registerDoctor(doctor) {
  try {
    // Check if the email address already exists
    const existingUser = await auth.getUserByEmail(`${doctor.id}@example.com`);

    // If the user exists, update the existing user's data instead of creating a new user
    if (existingUser) {
      console.log(`Updating existing doctor ${doctor.name} with ID ${existingUser.uid}.`);
      await db.collection('doctors').doc(existingUser.uid).set({
        id: doctor.id, // Include id field
        name: doctor.name,
        speciality: doctor.speciality,
        image: doctor.image,
        bio: doctor.bio,
        degrees: doctor.degrees,
        office: doctor.office,
        rating: doctor.rating,
        isOnline: true // Set initial value of isOnline to false
      });
      console.log(`Doctor ${doctor.name} updated successfully.`);
    } else {
      // Create a user in Firebase Authentication
      const userRecord = await auth.createUser({
        email: `${doctor.id}@example.com`, // Assuming each ID is unique
        password: 'initialPassword', // A default password; should be changed or set securely
        displayName: doctor.name
      });

      // Save additional details to Firestore
      await db.collection('doctors').doc(userRecord.uid).set({
        id: doctor.id, // Include id field
        name: doctor.name,
        speciality: doctor.speciality,
        image: doctor.image,
        bio: doctor.bio,
        degrees: doctor.degrees,
        office: doctor.office,
        rating: doctor.rating,
        isOnline: true // Set initial value of isOnline to false
      });

      console.log(`Doctor ${doctor.name} registered successfully.`);
    }
  } catch (error) {
    console.error('Error registering doctor:', doctor.name, error);
  }
}


// Loop through all doctors and register them
doctors.forEach(doctor => registerDoctor(doctor));
