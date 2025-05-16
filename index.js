const {
  addElement,
  display,
  deleteElementByIndex,
  updateElement,
  sortByAttribute,
  filterByprice
} = require('./functions');

display('Initial Dataset');

addElement('Mac M2', 1500, "grey", "2022-04-26");
display('After Adding Mac M2');

deleteElementByIndex(2);
display('After Deleting Index 2');

updateElement(1, 'Dell XPS 15', 1400, "black");
display('After Updating Index 1');

sortByAttribute('price');
display('Sorted by price');

sortByAttribute('price');
display('Sorted by price');

const filtered = filterByprice(1000);
display('Filtered by price >= 1000', filtered);
