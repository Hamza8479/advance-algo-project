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

// Time complexity in best and worst case for the above code is O(n square) 
// because both loop will iterate ethier value is swapped or not

//  if you want to use predefined function for sorting uncomment below code 
// const sortByAttribute = (attr) => {
//   dataset.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
// };

const filterById = (id) => {
 // Step 1: Sort by price
  const sorted = sortByAttribute('id');

  // Step 2: Binary search
  let low = 0;
  let high = sorted.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2); //get the mid or the leftMid
    
    if (dataset[mid]['id'] == id) // Check if Id is present at mid
        return dataset[mid];

    if (dataset[mid]['id'] < id)  // If Id greater, ignore left half
        low = mid + 1;
    else // If x is smaller, ignore right half
        high = mid - 1;
  }

  return [];
};


const filterByAtribute = (attr, value) => {
  const result = [];

  for (let i = 0; i < dataset.length; i++) {
    if (dataset[i][attr] === value) {
      result.push(dataset[i]);
    }
  }

  return result;
};

module.exports = {
  display,
  addElement,
  deleteElementByIndex,
  updateElement,
  sortByAttribute,
  filterById,
  filterByAtribute
};
