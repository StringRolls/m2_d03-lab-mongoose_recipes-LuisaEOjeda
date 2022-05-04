const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

// newRecipe to create in line 
let newRecipe = {
	title: 'miXto quente',
	level: 'Easy Peasy',
	ingredients: ['pão francês', 'queijo', 'presunto'],
	cuisine: 'Brasileira',
	dishType: 'Snack',
	image:
		'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
	duration: 5,
	creator: 'JOC'
};

const MONGODB_URI = process.env. MGDB_URI || 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
  })
  .then(async () => {
	  await Recipe.deleteMany()

// iteration 2
	  const createResult = await Recipe.create(newRecipe);
	  console.log(`recipe added: ${createResult.title}`);

// iteration 3
	  const insertResult = await Recipe.insertMany(data);
	  insertResult.forEach((recipe) => {
		  console.log(`Recipe for ${recipe.title} inserted successfully`);
	  });
  
// iteration 4
	  await Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
	  console.log(`The recipe Rigatoni alla Genovese is updated`);
  
// iteration 5
	  await Recipe.deleteOne({ title: 'Carrot Cake' });
	  console.log(`The recipe for Carrot Cake is deleted`);
    })

// iteration 6
  .then(() => {
	  console.log(`Disconnecting from the database... `);
	  mongoose.connection.close((error) => {
		  if (error) {
			  console.log("failed to disconnect ", error);
			}
		});
    })