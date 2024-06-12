const { db } = require('../../Firebase/setupFirebaseAdmin');
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Pre-Workout Supplements',
    summary: 'Top 10 Pre-Workout Supplements to Try',
    content: 'Detailed content about pre-workout supplements...',
    category: 'Health',
    image: 'https://www.eatingwell.com/thmb/7FSJ9b6lj9JFzIWWzrIHvv5LqK0=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1284690585-2000-44ea857d9ae24f3cae8bf89f7c715443.jpg'
  },
  {
    id: '2',
    title: 'Benefits of Fadogia Agrestis',
    summary: 'Benefits of Fadogia Agrestis (Enhancement)',
    content: 'Detailed content about Fadogia Agrestis...',
    category: 'Health',
    image: 'https://www.eatingwell.com/thmb/7FSJ9b6lj9JFzIWWzrIHvv5LqK0=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1284690585-2000-44ea857d9ae24f3cae8bf89f7c715443.jpg'
  },
  {
    id: '3',
    title: 'Benefits of Baobab Powder',
    summary: 'Benefits of Baobab Powder (Immunity)',
    content: 'Detailed content about Baobab Powder...',
    category: 'Nutrition',
    image: 'https://www.eatingwell.com/thmb/7FSJ9b6lj9JFzIWWzrIHvv5LqK0=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1284690585-2000-44ea857d9ae24f3cae8bf89f7c715443.jpg'
  },
  {
    id: '4',
    title: 'Top 10 Post-Workout Supplements for Women',
    summary: 'Top 10 Post-Workout Supplements for Women',
    content: 'Detailed content about post-workout supplements...',
    category: 'Wellness',
    image: 'https://www.eatingwell.com/thmb/7FSJ9b6lj9JFzIWWzrIHvv5LqK0=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1284690585-2000-44ea857d9ae24f3cae8bf89f7c715443.jpg'
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
