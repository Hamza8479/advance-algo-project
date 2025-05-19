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
// const sortData = () => {
//   readline.question(
//     "\nHow would you like to sort the dataset?\n1. Price\n2. CreatedAt\n3. Color\n4. Name\n5. Id\nSelect from 1 to 5: ",
//     (sortOption) => {
//       let attr;
//       if (sortOption === '1') attr = 'price';
//       else if (sortOption === '2') attr = 'createdAt';
//       else if (sortOption === '3') attr = 'color';
//       else if (sortOption === '4') attr = 'name';
//       else if (sortOption === '5') attr = 'id';
//       else {
//         console.log("Invalid option. Defaulting to 'price'");
//         attr = 'price';
//       }

//       readline.question(
//         "Enter sort order (asc / desc): ",
//         (order) => {
//           const sortOrder = (order.toLowerCase() === 'desc') ? 'desc' : 'asc';
//           sortByAttribute(attr, sortOrder);
//           display(`Sorted by ${attr} in ${sortOrder.toUpperCase()} order`);

//           readline.close();
//         }
//       );
//     }
//   );
// };


const mainMenu = () => {
  readline.question(
    `\nChoose an action:
1. Display dataset
2. Add element
3. Delete element by index
4. Update element by index
5. Sort dataset
6. Filter by attribute
7. Exit
Enter your choice (1-7): `,
    (choice) => {
      switch (choice) {
        case '1':
          display("Current dataset");
          mainMenu();
          break;

        case '2':
          readline.question("Enter name: ", (name) => {
            readline.question("Enter price: ", (price) => {
              readline.question("Enter color: ", (color) => {
                readline.question("Enter createdAt (e.g., 2025-05-16): ", (createdAt) => {
                  addElement(name, Number(price), color, createdAt);
                  console.log("Element added.");
                  mainMenu();
                });
              });
            });
          });
          break;

        case '3':
          readline.question("Enter index to delete (starting from 0): ", (index) => {
            deleteElementByIndex(Number(index));
            console.log("Element deleted if index was valid.");
            mainMenu();
          });
          break;

        case '4':
          readline.question("Enter index to update (starting from 0): ", (index) => {
            readline.question("Enter new name: ", (name) => {
              readline.question("Enter new price: ", (price) => {
                readline.question("Enter new color: ", (color) => {
                  updateElement(Number(index), name, Number(price), color);
                  console.log("Element updated if index was valid.");
                  mainMenu();
                });
              });
            });
          });
          break;

        case '5':
          readline.question(
            "\nSort by:\n1. Price\n2. CreatedAt\n3. Color\n4. Name\n5. Id\nSelect from 1 to 5: ",
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
                  mainMenu();
                }
              );
            }
          );
          break;

        case '6':
          readline.question("Enter attribute to filter: ", (attr) => {
          readline.question("Enter value to filter: ", (value) => {
            const filtered = filterByAtribute(attr, Number(value));
            display(`Filtered dataset by attribute ${attr} and its value ${value}`, filtered);
            mainMenu();
          });
          });
          break;

        case '7':
          console.log("Exiting program...");
          readline.close();
          break;

        default:
          console.log("Invalid choice, please enter 1-7.");
          mainMenu();
          break;
      }
    }
  );
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
  mainMenu,
  filterById,
  filterByAtribute
};
