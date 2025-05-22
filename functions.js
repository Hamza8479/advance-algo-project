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
  const id = Math.floor(Math.random() * 1000);
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
// This optimization improves best-case time complexity
//  from O(n²) to O(n) => making it equal to Insertion Sort's best case.
// and spce complexity is O(1) becasue we are not using functions or any other recursive calls
const sortByAttribute = (attr, sortBy = 'asc') => {
  for (let i = 0; i < dataset.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < dataset.length - i - 1; j++) {
      const shouldSwap = sortBy === 'asc'
        ? dataset[j][attr] > dataset[j + 1][attr]
        : dataset[j][attr] < dataset[j + 1][attr];

      if (shouldSwap) {
        [dataset[j], dataset[j + 1]] = [dataset[j + 1], dataset[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return dataset;
};

//  menu itself is O(1), but the action chosen affects the total time cost.
// Menu logic: O(1) (constant space, no extra memory)
// Displaying, deleting, or updating: in-place, still O(1)
// Adding: adds 1 element → O(1)
// Sorting: insertion → O(1)
const mainMenu = () => {
  readline.question( //built-in readline module to take user input.  //Prompts the user to choose an action (1–7) //Based on the user's input, it: callback function call after the main function execution and takes the input  
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
          display("Current dataset"); //Calls display() → shows current dataset //O(n) (to print n items from our dataset)
          mainMenu();
          break;

        case '2':
          readline.question("Enter name: ", (name) => {
            readline.question("Enter price: ", (price) => {
              readline.question("Enter color: ", (color) => {
                readline.question("Enter createdAt (e.g., 2025-05-16): ", (createdAt) => {
                  addElement(name, Number(price), color, createdAt); //Asks for 4 fields → calls addElement().
                  console.log("Element added."); //	O(1) (just pushing into array)
                  mainMenu();
                });
              });
            });
          });
          break;

        case '3':
          readline.question("Enter index to delete (starting from 0): ", (index) => {
            deleteElementByIndex(Number(index)); //Asks for index → calls deleteElementByIndex().
            console.log("Element deleted if index was valid."); //	O(n) (due to splice())
            // array.splice(index, 1) removes one element from the array at a given position (index),
            //  and shifts all the remaining elements after that index one step to the left.
            mainMenu();
          });
          break;

        case '4':
          readline.question("Enter index to update (starting from 0): ", (index) => {
            readline.question("Enter new name: ", (name) => {
              readline.question("Enter new price: ", (price) => {
                readline.question("Enter new color: ", (color) => {
                  updateElement(Number(index), name, Number(price), color); //Asks for index and new values → calls updateElement().
                  console.log("Element updated if index was valid."); // 	O(1) (direct index access)
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
                  sortByAttribute(attr, sortOrder); //Asks how to sort → calls sortByAttribute().
                  display(`Sorted by ${attr} in ${sortOrder.toUpperCase()} order`); //O(n²) best O(n)
                  // So comparing "2025-05-01" and "2024-12-30" using > or < gives you correct
                  //  chronological (arranged in or according to the order of time) results — as long as the string 
                  // format is ISO-standard (YYYY-MM-DD or full ISO date-time).
                  mainMenu();
                }
              );
            }
          );
          break;

        case '6':
          readline.question("Enter attribute to filter: ", (attr) => {
          readline.question("Enter value to filter: ", (value) => {
            if(attr == "price" || attr == "id"){
              value =  Number(value);
            }
            const filtered = filterByAtribute(attr, value); //Asks for filter → calls filterByAtribute().
            display(`Filtered dataset by attribute ${attr} and its value ${value}`, filtered); //O(n)
            mainMenu();
          });
          });
          break;

        case '7':
          console.log("Exiting program...");
          readline.close(); //Exits using readline.close().
          break;

        default:
          console.log("Invalid choice, please enter 1-7.");
          mainMenu();
          break;
      }
    }
  );
};


// Binary search
// Time complexity O(log n)
// Apply just for id due to its the only filter unique
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

// Linear search except on the Id searching
// Time complexity O(n)
const filterByAtribute = (attr, value) => {
  const result = [];

  if(attr == 'id'){
    return filterById(value);
  }

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
