var numbers = [1,2,3,4];

function transform(collection, transFunc) {
    return collection.map(((value) => {
        return transFunc(value);
    }));
};

var output = transform(numbers, function (num) {
    return num *2;
})

console.log(output)