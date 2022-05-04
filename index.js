const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI =
  "mongodb+srv://stringrolls:DJ2lE9KOJrtAjOsF@cluster0.ih8zu.mongodb.net/Recipes?retryWrites=true&w=majority";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() =>
    Recipe.create({
      title: "arepa",
      level: "Easy Peasy",
      ingredients: ["corn flour", "water", "salt"],
      cuisine: "Latin-American",
      dishType: "breakfast",
      image:
        "https://t2.uc.ltmcdn.com/es/posts/4/3/1/como_hacer_arepas_venezolanas_28134_600.jpg",
      duration: 20,
      creator: "Pre-colombian indigeneous",
    }).then((dbRecipe) => console.log(dbRecipe.title))
    .catch(err=>console.log("Error on create: ", err))
  )
  .then(() =>
    Recipe.insertMany(data).then((allRecipes) =>
      allRecipes.forEach((recipe) => console.log(recipe.title))
    )
  )
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" }
    ).then((recipe) => console.log(`update ${recipe.title}`))
  )
  .then(() =>
    Recipe.deleteOne({ title: "Carrot Cake" }).then((delRecipe) => {
      console.log("deleted: ", delRecipe);
    })
  )
  .then(() => mongoose.connection.close())
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
