function binarySearch(array, value, start, end, numTimes = 0) {
  numTimes++;
  start = start === undefined ? 0 : start;
  end = end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  // console.log(start, end);
  if (item == value) {
    return numTimes;
  }
  else if (item < value) {
    return binarySearch(array, value, index + 1, end, numTimes);
  }
  else if (item > value) {
    return binarySearch(array, value, start, index - 1, numTimes);
  }
}

// console.log(binarySearch([1,2,3,4,5,6,7,8,9,10,11,12], 10))

// #1 trying to find the value 8. The first call has the array, value = 8, start = 0, end = 10.
// The index will be 5 and the item will be arr[5] = 12. Since the item is greater than the value it will recursively call the function again
// with the array, value = 8, start = 0, end = 4. The index will = 2 and the item will be arr[2] = 6.
// Item < value so it will call the function again with the array, value =8, start = 3, end = 4. Now the index will = 3 and the item is arr[3] = 8.
// This makes item === value true which will return the index 3.

// Trying to find the value 16. The first call will look through the entire array. The second call will look through index 6 - 10 [14,15,17,18].
// The next call will look through [14, 15]. The next call will look at 15 and then the subsequent call will make start > end which will return -1.
// This will indicate that the number was not found in the array.


// #3 you could use a binary search tree to find the book.
// The keys of the tree would be the index in the dewey decimal system and the value would be the book title.


// #4 
// 1) 14 19 91 15 27 79 90 25 89 35

//       35
//     /   \
//   25     89
//   / \    /  \
//  15  27  79  90
//  / \      \
// 14 19     91

// 2) 8 6 5 7 10 9 11


class BST {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value = null) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BST(key, value, this);
      }

      else {
        this.left.insert(key, value);
      }
    }

    else {
      if (this.right === null) {
        this.right = new BST(key, value, this);
      }

      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }

    else if (key < this.key && this.left) {
      return this.left.find(key);
    }

    else if (key > this.key && this.right) {
      return this.right.find(key);
    }

    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }

      else if (this.left) {
        this._replaceWith(this.left);
      }

      else if (this.right) {
        this._replaceWith(this.right);
      }

      else {
        this._replaceWith(null);
      }
    }

    else if (key < this.key && this.left) {
      this.left.remove(key);
    }

    else if (key > this.key && this.right) {
      this.right.remove(key);
    }

    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}


function inOrder(tree) {
  if (tree !== null) {
    inOrder(tree.left)
    console.log(tree.key)
    inOrder(tree.right)
  }
}

function preOrder(tree) {
  if (tree !== null) {
    console.log(tree.key)
    preOrder(tree.left)
    preOrder(tree.right)
  }
}

function postOrder(tree) {
  if (tree !== null) {
    postOrder(tree.left)
    postOrder(tree.right)
    console.log(tree.key);
  }
}


function main() {
  let tree = new BST();

  let arr = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];

  arr.forEach(num => tree.insert(num));

  console.log(postOrder(tree));
}

// main()

function maxProfit(arr) {
  let maxDif = 0;
  let least = arr[0];
  let most = arr[0];

  //need to keep track of most and least index as well

  for (let i = 0; i < arr.length; i++) { //arr[i] = 60, most = 128, least = 128, maxDif = 0

    if(arr[i] < least){
      least = arr[i]
    }

    if (most < least) {
      least = most
    }

    if (most < arr[i]) {
      most = arr[i]
    }


    if (most - least > maxDif) {
      maxDif = most - least
    }
    console.log(i, least, most, maxDif);

  }

  // console.log(least, most, maxDif);
  return maxDif
}

testArr = [128, 60, 121, 123, 98, 97, 105]

maxProfit(testArr)



