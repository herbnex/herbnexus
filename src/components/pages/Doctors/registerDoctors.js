const { db, auth } = require('../../../Firebase/setupFirebaseAdmin');
const doctors = require('../../../../public/doctorsList.json'); // Your JSON data

async function registerDoctor(doctor) {
  try {
    // Check if the email address already exists
    const existingUser = await auth.getUserByEmail(`${doctor.id}@example.com`).catch(() => null);

    if (existingUser) {
      // Update existing doctor's data
      console.log(`Updating existing doctor ${doctor.name} with ID ${doctor.id}.`);
      await db.collection('doctors').doc(doctor.id.toString()).set({
        uid: existingUser.uid,
        id: doctor.id,
        name: doctor.name,
        speciality: doctor.speciality,
        image: doctor.image,
        bio: doctor.bio,
        degrees: doctor.degrees,
        office: doctor.office,
        rating: doctor.rating,
        isOnline: doctor.isOnline || false
      });
      console.log(`Doctor ${doctor.name} updated successfully.`);
    } else {
      // Create a user in Firebase Authentication
      const userRecord = await auth.createUser({
        email: `${doctor.id}@example.com`,
        password: 'initialPassword',
        displayName: doctor.name
      });

      // Save additional details to Firestore
      await db.collection('doctors').doc(doctor.id.toString()).set({
        uid: userRecord.uid,
        id: doctor.id,
        name: doctor.name,
        speciality: doctor.speciality,
        image: doctor.image,
        bio: doctor.bio,
        degrees: doctor.degrees,
        office: doctor.office,
        rating: doctor.rating,
        isOnline: doctor.isOnline || false
      });

      console.log(`Doctor ${doctor.name} registered successfully.`);
    }
  } catch (error) {
    console.error('Error registering doctor:', doctor.name, error);
  }
}

// Loop through all doctors and register them
doctors.forEach(doctor => registerDoctor(doctor));
