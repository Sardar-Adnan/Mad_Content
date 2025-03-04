let myArray = ["Apple", "Banana", "Mango", "Orange"];

// Get array length
console.log("Array Length:", myArray.length);

// Add elements (push)
myArray.push("Pineapple");
console.log("After push:", myArray);

// Remove last element (pop)
myArray.pop();
console.log("After pop:", myArray);

// Remove first element (shift)
myArray.shift();
console.log("After shift:", myArray);

// Add element at the beginning (unshift)
myArray.unshift("Strawberry");
console.log("After unshift:", myArray);

// Slice a portion
console.log("Slice (1-3):", myArray.slice(1, 3));

// Splice (remove & insert)
myArray.splice(2, 1, "Grapes");
console.log("After splice:", myArray);

// Find an element
console.log("Index of 'Banana':", myArray.indexOf("Banana"));

// Reverse array
console.log("Reversed:", myArray.reverse());

// Sort array
console.log("Sorted:", myArray.sort());

// Convert array to string
console.log("Join array:", myArray.join(" - "));

// Check if an element exists
console.log("Includes 'Mango'?", myArray.includes("Mango"));