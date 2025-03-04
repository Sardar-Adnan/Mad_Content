let myString = "Hello, JavaScript World!";

// String length
console.log("Length:", myString.length);

// Convert to uppercase & lowercase
console.log("Uppercase:", myString.toUpperCase());
console.log("Lowercase:", myString.toLowerCase());

// Find index of a word
console.log("Index of 'JavaScript':", myString.indexOf("JavaScript"));

// Extract a part of the string
console.log("Substring (7-17):", myString.substring(7, 17));

// Replace a word
console.log("Replace 'World' with 'Universe':", myString.replace("World", "Universe"));

// Split into array
console.log("Split into words:", myString.split(" "));

// Check if string contains a word
console.log("Includes 'JavaScript'?", myString.includes("JavaScript"));

// Remove spaces from start and end
let extraSpace = "   Trim this!   ";
console.log("Trimmed:", extraSpace.trim());