require('dotenv').config({path: '.env'})
const mongoose = require('mongoose')

const catDbModel = require('../../models/Category.js')
const prodDbModel = require('../../models/Product.js')

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

mongoose.connect(process.env.MONGODB_URL)
.then((result) => {
  console.log("connected to db");

  // make dummy categories
  catPromises = []
  for (const cat of ["CatA", "CatB"]) {
    const category = new catDbModel.Category({
      "name": cat,
    })
    catPromises.push(category.save());
  }
  
  return Promise.all(catPromises)
})
.then((result) => {
  console.log("Categories made:", result);

  return catDbModel.Category.find()
        .then((cats) => {
          const categoryIds = Array.from(cats, c => c._id);
          console.log("existing category ids:", categoryIds);

          // make dummy products
          prodPromises = []
          for (const prod of ["ProductA", "ProductB", "ProductC"]) {
            const product = new prodDbModel.Product({
                "price": Math.floor(Math.random() * 101),
                "available": randomChoice([true, false]),
                "description": `Product ${prod} description`,
                "categoryId": randomChoice(categoryIds),
                "title": prod
            })
            prodPromises.push(product.save());
          }
          return Promise.all(prodPromises);
        });
})
.then(result => console.log("Products also made:", result))
.catch((err) => {
  console.error(err);
})
.finally(() => {
  mongoose.connection.close()
  console.log("closed db connection")
});
