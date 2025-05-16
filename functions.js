const dataset = require('./dataset.json');

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

const sortByAttribute = (attr) => {
  dataset.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
};

const filterByprice = (minprice) => {
  return dataset.filter(data => data.price >= minprice);
};

module.exports = {
  display,
  addElement,
  deleteElementByIndex,
  updateElement,
  sortByAttribute,
  filterByprice
};
