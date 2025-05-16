const dataset = require('./dataset.json');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const display = (title, data = dataset) => {
  console.log(`\n${title}`);
  console.table(data);
};

const addElement = (name, price, color, createdAt) => {
  const id = dataset.length + 1;
  dataset.push({ id, name, price, color, createdAt });
};

const deleteElementByIndex = (index) => {
  if (index >= 0 && index < dataset.length) {
    dataset.splice(index, 1);
  }
};

const updateElement = (index, name, price, color) => {
  if (index >= 0 && index < dataset.length) {
    dataset[index] = { ...dataset[index], name, price, color };
  }
};

// we are using bubble sort here for sorting the array
const sortByAttribute = (attr, sortBy = 'asc') => {
  for (let i = 0; i < dataset.length - 1; i++) {
    for (let j = 0; j < dataset.length - i - 1; j++) {
      const shouldSwap = sortBy === 'asc'
        ? dataset[j][attr] > dataset[j + 1][attr]
        : dataset[j][attr] < dataset[j + 1][attr];

      if (shouldSwap) {
        [dataset[j], dataset[j + 1]] = [dataset[j + 1], dataset[j]];
      }
    }
  }
  return dataset;
};

//  for asking user preferences
const sortData = () => {
  readline.question(
    "\nHow would you like to sort the dataset?\n1. Price\n2. CreatedAt\n3. Color\n4. Name\n5. Id\nSelect from 1 to 5: ",
    (sortOption) => {
      let attr;
      if (sortOption === '1') attr = 'price';
      else if (sortOption === '2') attr = 'createdAt';
      else if (sortOption === '3') attr = 'color';
      else if (sortOption === '4') attr = 'name';
      else if (sortOption === '5') attr = 'id';
      else {
        console.log("Invalid option. Defaulting to 'price'");
        attr = 'price';
      }

      readline.question(
        "Enter sort order (asc / desc): ",
        (order) => {
          const sortOrder = (order.toLowerCase() === 'desc') ? 'desc' : 'asc';
          sortByAttribute(attr, sortOrder);
          display(`Sorted by ${attr} in ${sortOrder.toUpperCase()} order`);

          readline.close();
        }
      );
    }
  );
};





// Time complexity in best and worst case for the above code is O(n square) 
// because both loop will iterate ethier value is swapped or not

//  if you want to use predefined function for sorting uncomment below code 
// const sortByAttribute = (attr) => {
//   dataset.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
// };

const filterByprice = (minprice) => {
  return dataset.filter(data => data.price >= minprice);
};

module.exports = {
  display,
  addElement,
  deleteElementByIndex,
  updateElement,
  sortByAttribute,
  filterByprice,
  sortData
};
