#! /usr/bin/env node

console.log(
  'This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Category = require('./models/category');

const items = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createItems();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}
async function itemCreate(index, name, description, category, price, stock) {
  const itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
  };

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding category');
  await Promise.all([
    categoryCreate(0, 'Elektronik', 'Alle Arten von elektronischen Geräten'),
    categoryCreate(
      1,
      'Kleidung',
      'Verschiedene Kleidungsstücke und Accessoires'
    ),
    categoryCreate(
      2,
      'Haushaltswaren',
      'Nützliche Haushaltsgegenstände für den Alltag'
    ),
    categoryCreate(3, 'Bürobedarf', 'Alles, was für das Büro benötigt wird'),
    categoryCreate(4, 'Sportartikel', 'Artikel für verschiedene Sportarten'),
  ]);
}

async function createItems() {
  console.log('Adding Items');
  await Promise.all([
    itemCreate(
      0,
      'Smartphone',
      'Hochauflösendes Mobiltelefon',
      categories[0],
      599.99,
      25
    ),
    itemCreate(
      1,
      'T-Shirt',
      'Baumwoll-T-Shirt, Größe M, Schwarz',
      categories[1],
      19.99,
      50
    ),
    itemCreate(
      2,
      'Kochtopf-Set',
      'Edelstahl-Kochgeschirr-Set, 10-teilig',
      categories[2],
      79.99,
      20
    ),
    itemCreate(
      3,
      'Laptop',
      'Leistungsstarker Arbeitslaptop',
      categories[3],
      999.99,
      15
    ),
    itemCreate(
      4,
      'Yogamatte',
      'Rutschfeste, gepolsterte Yogamatte',
      categories[4],
      29.99,
      30
    ),
    itemCreate(
      5,
      'Kopfhörer',
      'Kabellose Over-Ear-Kopfhörer',
      categories[0],
      129.99,
      40
    ),
    itemCreate(
      6,
      'Jeans',
      'Klassische Jeans, Denim, Größe 32',
      categories[1],
      49.99,
      35
    ),
    itemCreate(
      7,
      'Staubsauger',
      'Beutelloser Bodenstaubsauger, hohe Saugleistung',
      categories[2],
      149.99,
      10
    ),
    itemCreate(
      8,
      'Drucker',
      'Farbiger Laserdrucker, WLAN-fähig',
      categories[3],
      249.99,
      8
    ),
    itemCreate(
      9,
      'Fußball',
      'Größe 5, offizieller Spielball',
      categories[4],
      19.99,
      25
    ),
  ]);
}
