var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];

function searchByName(arr, searchName) {
  var searchIndex = undefined;
  arr.forEach((item, index) => {
    if (item.name === searchName) {
      searchIndex = index;
      // return arr[index];
    }
  });
  if (searchIndex != undefined) {
    return arr[searchIndex];
  } else {
    return "Not Found";
  }
}

function searchByKey(arr, searchkey, searchValue) {
  var searchIndex = undefined;
  arr.forEach((item, index) => {
    if (item[searchkey] === searchValue) {
      searchIndex = index;
    }
  });
  if (searchIndex != undefined) {
    return arr[searchIndex];
  } else {
    return "Not Found";
  }
}

console.log(searchByName(fruits, "Apple"));
console.log(searchByKey(fruits, "color", "Yellow"));
