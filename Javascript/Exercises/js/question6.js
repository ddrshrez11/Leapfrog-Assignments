var input = {
  1: {
    id: 1,
    name: "John",
    children: [
      { id: 2, name: "Sally" },
      { id: 3, name: "Mark", children: [{ id: 4, name: "Harry",children: [{ id: 7, name: "nakul" }] }] },
    ],
  },
  5: {
    id: 5,
    name: "Mike",
    children: [{ id: 6, name: "Peter" }],
  },
};

function normalization() {
  var output = {};
  function childArray(person) {
    return person.children.map(function (child) {
      return child.id;
    });
  }
  function addChildren(person) {
    let child_arr = childArray(person);
    person.children.forEach((child) => {
      output[child.id] = child;
      if (child.children) {
        // console.log(child)
        addChildren(child);
      }
    });
    changeChildrenFormat(person.id, child_arr);
  }

  function changeChildrenFormat(person_id, child_arr) {
    output[person_id].children = child_arr;
  }
  Object.keys(input).forEach((person_id) => {
    output[person_id] = input[person_id];
    person = input[person_id];
    if (person.children) {
      addChildren(person);
    }
  });
  return output;
}
console.log(normalization());

// keys

// var output = {
//     '1': { id: 1, name: 'John', children: [2, 3] },
//     '2': { id: 2, name: 'Sally' },
//     '3': { id: 3, name: 'Mark', children: [4] },
//     '4': { id: 4, name: 'Harry' },
//     '5': { id: 5, name: 'Mike', children: [6] },
//     '6': { id: 6, name: 'Peter' }
// };
