const dataset = require('./dataset.json')
  
  const display = (title, data = dataset) => {
    console.log(`\n${title}`);
    console.table(data);
  };
  
  const addElement = (name, age, score) => {
    const id = dataset.length + 1;
    dataset.push({ id, name, age, score });
  };
  
  const deleteElementByIndex = (index) => {
    if (index >= 0 && index < dataset.length) {
      dataset.splice(index, 1);
    }
  };
  
  const updateElement = (index, name, age, nationality) => {
    if (index >= 0 && index < dataset.length) {
      dataset[index] = Object.assign({}, dataset[index], { name, age, nationality });
    }
  };
  
  const sortByAttribute = (attr) => {
    dataset.sort((a, b) => a[attr] - b[attr]);
  };
  
  const filterByAge = (minAge) => {
    return dataset.filter(person => person.age >= minAge);
  };
  
  display('Initial Dataset');
  
  // Add
  addElement('Adeel', 24, "Italien");
  display('After Adding Adeel');
  
  // Delete (e.g., index 2 — Ayush)
  deleteElementByIndex(2);
  display('After Deleting Index 2');
  
  // Update (e.g., index 1 — Sebestian → Updated)
  updateElement(1, 'Sebestian Updated', 26, "Columbian + Francais");
  display('After Updating Index 1');
  
  // Sort by Age
  sortByAttribute('age');
  display('Sorted by Age');
  
  // Sort by nationality
  sortByAttribute('nationality');
  display('Sorted by Nationality');
  
  // Filter: Age >= 23
  const filtered = filterByAge(23);
  display('Filtered by Age >= 23', filtered);
  