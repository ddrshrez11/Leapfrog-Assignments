// Question 1
console.log("pattern( number of rows )");

function pattern(rows) {
  for (var i = rows; i > 0; i--) {
    let line = "";
    for (var j = 0; j < i; j++) {
      line += "* ";
    }
    console.log(line);
  }
}
