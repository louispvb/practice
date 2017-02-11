/**
 * Insertion sort is a basic sorting algorithm.
 *
 * Insertion sort iterates over an array, growing a sorted array behind the current location.
 * It takes each element from the input and finds the spot, up to the current point,
 * where that element belongs. It does this until it gets to the end of the array.
 *
 * Insertion sort should be implemented as a stable sort. This means that equal elements
 * should retain their relative order. Numbers, as primitives, give us no way to check this,
 * so we'll be sorting objects with a value field, on which they will be sorted, like so:
 *
 * `[{value: 10}, {value: 5, order: 1}, {value: 5, order: 2}]`
 *
 * A stable sort must return `{value: 5, order: 1}, {value:5, order: 2}` in that order.
 *
 * ---
 *
 * EXTRA CREDIT:
 *
 * Refactor your sort to (optionally) take an explicit comparator function
 * as its second argument, so that callers can define arbitrary ways to sort elements.
 * See [Array.prototype.sort](http://devdocs.io/javascript/global_objects/array/sort)
 * for an example of how this works (excerpt below):
 *
 * > If `comparator(a, b)` is less than `0`, sort `a` to a lower index than `b`, i.e. `a` comes first.
 * > If `comparator(a, b)` returns `0`, leave `a` and `b` unchanged with respect to each other, but sorted with respect to all different elements.
 * > If `comparator(a, b)` is greater than `0`, sort `b` to a lower index than `a`.
 *
 * If no comparator is given, just sort the elements using `<` or `>`.
 **/

// Example usage:
// insertionSort([{value: 2}, {value: 1}, {value: 3}]);
// yields [{value: 1}, {value: 2}, {value: 3}]

// This function is to help you test, and should not be incorporated in your solution.
// It will transform an array of numbers into an array of valid objects.
var testingTransform = function(array) {
  var transform = [];

  for (var i = 0; i < array.length; i++) {
    transform.push({value: array[i], i: i});
  }

  return transform;
};

var findMaxSmallerIdx = function(array, upToIdx, elem, comp) {
  for (let i = 0; i < upToIdx; i++) {
    // subarray already sorted, find bigger value index and return it
    if (comp(array[i].value, elem.value) > 0) return i;
  }
  return 0;
}

var insertionSort = function(array, comp = (a, b) => a-b) {
  for (let i = 1; i < array.length; i++) {
    if (comp(array[i - 1].value, array[i].value) > 0) {
      // if prev out of order
      let removed = array.splice(i, 1)[0]; // remove this

      // search from 0 to before i for index with bigger val than removed val
      let insertIdx = findMaxSmallerIdx(array, i, removed, comp);
      array.splice(insertIdx, 0, removed); // insert
    }
  }
  return array;
};

let randArr = n => Array(n).fill(0).map(() => Math.floor(Math.random()*n));

// console.log(insertionSort(testingTransform(randArr(10)), (a,b) => b-a))