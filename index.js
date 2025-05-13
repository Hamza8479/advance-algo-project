const dataset = require('./dataset.json')
  
  const display = (title, data = dataset) => {
    console.log(`\n${title}`);
    console.table(data);
  };
  
  const addElement = (name, price, color) => {
    const id = dataset.length + 1;
    dataset.push({ id, name, price, color });
  };
  
  const deleteElementByIndex = (index) => {
    if (index >= 0 && index < dataset.length) {
      dataset.splice(index, 1);
    }
  };
  
  
  // update specific index by giving name , price and color values
  const updateElement = (index, name, price, color) => {
    if (index >= 0 && index < dataset.length) {
      dataset[index] = Object.assign({}, dataset[index], { name, price, color });
    }
  };
  
  // sorted in ascendeing order if  want to order in descending do b - a
  const sortByAttribute = (attr) => {
    dataset.sort((a, b) => a[attr] - b[attr]);
  };
  
  const filterByprice = (minprice) => {
    return dataset.filter(data => data.price >= minprice);
  };
  
  display('Initial Dataset');
  
  // Add
  addElement('Mac M2', 1500, "grey");
  display('After Adding Mac M2');
  
  // Delete (e.g., index 2 — HP Elitebook)
  deleteElementByIndex(2);
  display('After Deleting Index 2');
  
  // Update (e.g., index 1 — Dell → Updated)
  updateElement(1, 'Dell XPS 15', 1400, "black");
  display('After Updating Index 1');
  
  // Sort by price
  sortByAttribute('price');
  display('Sorted by price');
  
  // Sort by color
  sortByAttribute('price');
  display('Sorted by price');
  
  // Filter: price >= 1000
  const filtered = filterByprice(1000);
  display('Filtered by price >= 1000', filtered);
  