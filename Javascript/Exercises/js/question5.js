var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    if (array.length === 0){
        return array;
    }
    new_arr= array.slice();
    for (let i = 0; i < new_arr.length; i++) {
        var least = i       
        for (let j = i; j < new_arr.length; j++) {
            if (new_arr[j][key] < new_arr[least][key]){
                least = j;
            };
        };
        // console.log(new_arr)
        if (least != i){
            temp = new_arr[i]
            new_arr[i] = new_arr[least]
            new_arr[least] = temp
        } 
    }
    return new_arr;
}

var sorted = sortBy(arr, 'name');
console.log(sorted)