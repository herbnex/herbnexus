const { db } = require('../../Firebase/setupFirebaseAdmin');
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Pre-Workout Supplements',
    summary: 'Top 10 Pre-Workout Supplements to Try',
    content: 'Detailed content about pre-workout supplements...',
    category: 'Health',
    image: 'src/assets/b.png'
  },
  {
    id: '2',
    title: 'Benefits of Fadogia Agrestis',
    summary: 'Benefits of Fadogia Agrestis (Enhancement)',
    content: 'Detailed content about Fadogia Agrestis...',
    category: 'Health',
    image: 'src/assets/b.png'
  },
  {
    id: '3',
    title: 'Benefits of Baobab Powder',
    summary: 'Benefits of Baobab Powder (Immunity)',
    content: 'Detailed content about Baobab Powder...',
    category: 'Nutrition',
    image: 'src/assets/b.png'
  },
  {
    id: '4',
    title: 'Top 10 Post-Workout Supplements for Women',
    summary: 'Top 10 Post-Workout Supplements for Women',
    content: 'Detailed content about post-workout supplements...',
    category: 'Wellness',
    image: 'src/assets/b.png'
  }
];

const populateFirestore = async () => {
  const batch = db.batch();

  blogPosts.forEach(post => {
    const docRef = db.collection('blogPosts').doc(post.id);
    batch.set(docRef, post);
  });

  await batch.commit();
  console.log('Firestore has been populated with sample blog posts');
};

populateFirestore().catch(console.error);
