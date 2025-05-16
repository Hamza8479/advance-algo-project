const {
  addElement,
  display,
  deleteElementByIndex,
  updateElement,
  sortByAttribute,
  filterByprice,
  sortData
} = require('./functions');

display('Initial Dataset');

addElement('Mac M2', 1500, "grey", "2022-04-26");
display('After Adding Mac M2');

deleteElementByIndex(2);
display('After Deleting Index 2');

updateElement(1, 'Dell XPS 15', 1400, "black");
display('After Updating Index 1');

// sortByAttribute('createdAt');
// display('Sorted by createdAt');

// sortByAttribute('price', 'desc');
// display('Sorted by price');

const filtered = filterByprice(1000);
display('Filtered by price >= 1000', filtered);

sortData()