var uniArray = [];
var firstStartingNumbers = [];
var positionToCheck;
var preDisplayNumber = 35;

function startGame() {
  if (uniArray.length > 0) {
    uniArray = [];
  }
  let grid = document.getElementById("grid");
  grid.innerHTML = "";
  firstStartingNumbers = [];
  buildGrid();
  createIdealMatrix();
}

function createIdealMatrix() {
  //creating matrix with all posibilities
  for (let i = 0; i < 9; i++) {
    let tempArr = [];
    for (let j = 0; j < 9; j++) {
      let possibilityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      tempArr.push(possibilityArray);
    }
    uniArray.push(tempArr);
  }

  //Creating ideal matrix
  for (let i = 0; i < uniArray.length; i++) {
    //debugger;
    for (let j = 0; j < uniArray[i].length; j++) {
      let putValue;
      if (uniArray[i][j].length !== 1) {
        superColCheck(i, j);
      }
      if (i === 0) {
        putValue = selectRandom(uniArray[i][j]);
        deleteElement(i, j, putValue);
        deleteBlockValues(i, j, putValue);
        uniArray[i][j] = [putValue];
      } else {
        if (uniArray[i][j].length > 1) {
          //debugger;
          putValue = checkOcc(i, j);
          uniArray[i][j] = [];
          deleteElement(i, j, putValue);
          deleteBlockValues(i, j, putValue);
          uniArray[i][j] = [putValue];
        } else if (uniArray[i][j].length === 1) {
          putValue = uniArray[i][j][0];
          deleteElement(i, j, putValue);
          deleteBlockValues(i, j, putValue);
          uniArray[i][j] = [putValue];
        }
      }

      //display array to div
      // for (let i = 0; i < 9; i++) {
      //   for (let j = 0; j < 9; j++) {
      //     let div = document.getElementById(9 * i + j + 1);
      //     div.childNodes[0].textContent = uniArray[i][j];
      //   }
      // }
      //debugger;
    }
    //debugger;
  }
  startingNumber(firstStartingNumbers.length);
  console.log(uniArray);
  console.log(firstStartingNumbers);
  for (let p = 0; p < firstStartingNumbers.length; p++) {
    let ijArray = getIandJvalues(firstStartingNumbers[p]);
    let div = document.getElementById(9 * ijArray[0] + ijArray[1] + 1);
    div.childNodes[0].textContent = uniArray[ijArray[0]][ijArray[1]];
    div.removeEventListener("click", checkUserAnswer, false);
    div.classList.add("disable_btn");
  }
}

function deleteElement(i, j, putValue) {
  for (let x = 0; x < uniArray[i].length; x++) {
    if (uniArray[i][x].includes(putValue)) {
      uniArray[i][x].splice(uniArray[i][x].indexOf(putValue), 1);
      if (uniArray[i][x].length === 1 && x !== j) {
        //debugger;
        let temp = uniArray[i][x][0];
        deleteElement(i, x, temp);
        deleteBlockValues(i, x, temp);
        uniArray[i][x] = [temp];
      }
    }
  }

  for (let y = 0; y < uniArray.length; y++) {
    if (uniArray[y][j].includes(putValue)) {
      uniArray[y][j].splice(uniArray[y][j].indexOf(putValue), 1);

      if (uniArray[y][j].length === 1 && y !== i) {
        //debugger;
        let temp = uniArray[y][j][0];
        deleteElement(y, j, temp);
        deleteBlockValues(y, j, temp);
        uniArray[y][j] = [temp];
      }
    }
  }
}

//
function checkOcc(i, j) {
  let currArray = uniArray[i][j];
  //let rowCheckArray = uniArray[i];
  let putValue;
  let answer = false;
  let temp = [];
  for (let k = 0; k < currArray.length; k++) {
    answer = containsCheck(currArray[k], i, j);
    if (answer) {
      temp.push(currArray[k]);
    } else {
      putValue = currArray[k];
      return putValue;
    }
  }

  return selectRandom(temp);
}

//Select anything from the array
function selectRandom(currArray) {
  let index = Math.floor(Math.random() * currArray.length);
  return currArray[index];
}

//check that checkVal exists in the remains row array
function containsCheck(checkVal, i, j) {
  var count = 0;
  for (let x = j + 1; x < uniArray[i].length; x++) {
    if (uniArray[i][x].includes(checkVal)) {
      if (uniArray[i][x].length === 1) {
        uniArray[i][j].splice(uniArray[i][j].indexOf(checkVal), 1);
      }
      count++;
    }
  }

  if (count > 1) {
    return true;
  } else {
    return false;
  }
}

const deleteBlockValues = (i, j, val) => {
  if (j < 3 && i < 3) {
    //first Block

    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  } else if (j > 2 && j < 6 && i < 3) {
    //Second Block

    for (let k = 0; k < 3; k++) {
      for (let l = 3; l < 6; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  } else if (j > 5 && j < 9 && i < 3) {
    //Third Block

    for (let k = 0; k < 3; k++) {
      for (let l = 6; l < 9; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  } else if (j < 3 && i > 2 && i < 6) {
    // Forth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 0; l < 3; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  } else if (j > 2 && j < 6 && i > 2 && i < 6) {
    //Fifth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 3; l < 6; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  } else if (j > 5 && j < 9 && i > 2 && i < 6) {
    //Sixth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 6; l < 9; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  } else if (j < 3 && i > 5) {
    //Seventh Block
    for (let k = 6; k < 9; k++) {
      for (let l = 0; l < 3; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  } else if (j > 2 && j < 6 && i > 5) {
    //Eight Block

    for (let k = 6; k < 9; k++) {
      for (let l = 3; l < 6; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l);
        }
      }
    }
  } else if (j > 5 && i > 5) {
    //Ninth Block

    for (let k = 6; k < 9; k++) {
      for (let l = 6; l < 9; l++) {
        if (uniArray[k][l].includes(val)) {
          uniArray[k][l].splice(uniArray[k][l].indexOf(val), 1);
          checkSingleElement(uniArray[k][l], k, l, i, j);
        }
      }
    }
  }
};

function buildGrid() {
  var grid = document.getElementById("grid");
  var tile;
  let difficultyLevel = document.getElementById("difficulty");
  if (difficultyLevel.selectedIndex === 0) {
    preDisplayNumber = 42;
  } else if (difficultyLevel.selectedIndex === 1) {
    preDisplayNumber = 35;
  } else {
    preDisplayNumber = 25;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      tile = createTile(i, j);
      tile.addEventListener("click", checkUserAnswer);
      grid.appendChild(tile);
    }
  }
  var style = window.getComputedStyle(tile);
  var width = parseInt(style.width.slice(0, -2));
  var height = parseInt(style.height.slice(0, -2));
  grid.style.width = 9 * width + 40 + "px";
  grid.style.height = "auto";
}

function createTile(i, j) {
  var tile = document.createElement("div");
  tile.setAttribute("id", i * 9 + j + 1);
  tile.setAttribute("key", i * 9 + j + 1);
  if (
    (i === 2 && j === 2) ||
    (i === 5 && j === 2) ||
    (i === 2 && j === 5) ||
    (i === 5 && j === 5)
  ) {
    tile.classList.add("grid-item-bottomAndRightLine");
  } else if (j === 2 || j === 5) {
    tile.classList.add("grid-item-divisionBy3");
  } else if (i === 2 || i === 5) {
    tile.classList.add("grid-item-bottomLine");
  } else {
    tile.classList.add("grid-item");
  }

  let h5 = document.createElement("h3");
  h5.setAttribute("id", 9 * i + j + 1);
  tile.appendChild(h5);
  return tile;
}

function superColCheck(i, j) {
  let rowResult = checkRows(i, j);
  if (rowResult >= 0) {
    let elementsToRemove = uniArray[i][rowResult];
    specialRemove(elementsToRemove, i, j, rowResult);
  }
  let colResult = colCheck(i, j);
  if (colResult >= 0) {
    let colsToRemoves = uniArray[colResult][j];
    colSpecialRemove(colsToRemoves, i, j, colResult);
  }

  let blockResult = blockSpecialCheck(i, j);
  //debugger;
  if (blockResult.length !== 0) {
    let rowValue = blockResult[0];
    let colValue = blockResult[1];
    let resultArray = uniArray[rowValue][colValue];
    blockSpecialRemove(resultArray, rowValue, colValue);
  }
}

function blockSpecialRemove(deleteArrayElements, row, col) {
  if (col < 3 && row < 3) {
    //first Block

    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col > 2 && col < 6 && row < 3) {
    //Second Block

    for (let k = 0; k < 3; k++) {
      for (let l = 3; l < 6; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col > 5 && col < 9 && row < 3) {
    //Third Block

    for (let k = 0; k < 3; k++) {
      for (let l = 6; l < 9; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col < 3 && row > 2 && row < 6) {
    // Forth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 0; l < 3; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col > 2 && col < 6 && row > 2 && row < 6) {
    //Fifth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 3; l < 6; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col > 5 && col < 9 && row > 2 && row < 6) {
    //Sixth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 6; l < 9; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col < 3 && row > 5) {
    //Seventh Block
    for (let k = 6; k < 9; k++) {
      for (let l = 0; l < 3; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col > 2 && col < 6 && row > 5) {
    //Eight Block

    for (let k = 6; k < 9; k++) {
      for (let l = 3; l < 6; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  } else if (col > 5 && row > 5) {
    //Ninth Block

    for (let k = 6; k < 9; k++) {
      for (let l = 6; l < 9; l++) {
        if (row !== k || col !== l) {
          if (
            JSON.stringify(deleteArrayElements) !==
            JSON.stringify(uniArray[k][l])
          ) {
            for (let s = 0; s < deleteArrayElements.length; s++) {
              if (uniArray[k][l].includes(deleteArrayElements[s])) {
                uniArray[k][l].splice(
                  uniArray[k][l].indexOf(deleteArrayElements[s]),
                  1
                );
              }
            }
          }
        }
      }
    }
  }
}

function specialRemove(arr, i, j, colResult) {
  //debugger;
  for (let x = j; x < colResult; x++) {
    for (let y = 0; y < arr.length; y++) {
      if (uniArray[i][x].includes(arr[y])) {
        uniArray[i][x].splice(uniArray[i][x].indexOf(arr[y]), 1);
      }
    }
  }
}

function checkRows(i, j) {
  for (let x = j + 1; x < uniArray[i].length; x++) {
    let localComparator = uniArray[i][x];
    if (localComparator.length === 1) {
      //debugger;
      let putValue = localComparator[0];
      uniArray[i][x] = [];
      deleteElement(i, x, putValue);
      deleteBlockValues(i, x, putValue);
      uniArray[i][x] = [putValue];
      // debugger;f
      //return y;
    } else if (localComparator.length <= 9 - x) {
      let count = 1;
      for (let y = x + 1; y < uniArray[i].length; y++) {
        if (JSON.stringify(uniArray[i][x]) === JSON.stringify(uniArray[i][y])) {
          count++;
        }
      }
      if (count === localComparator.length && localComparator.length > 1) {
        // debugger;
        return x;
      }
    }
  }
  return -1;
}

function colSpecialRemove(colsToRemoves, i, j, colResult) {
  for (let x = i; x < colResult; x++) {
    for (let y = 0; y < colsToRemoves.length; y++) {
      if (uniArray[x][j].includes(colsToRemoves[y])) {
        uniArray[x][j].splice(uniArray[x][j].indexOf(colsToRemoves[y]), 1);
      }
    }
  }
}

//Special Cols check
function colCheck(i, j) {
  for (let x = i; x < uniArray.length; x++) {
    let localComparator = uniArray[x][j];
    if (localComparator.length === 1) {
      let putValue = localComparator[0];
      uniArray[x][j] = [];
      deleteElement(x, j, putValue);
      deleteBlockValues(x, j, putValue);
      uniArray[x][j] = [putValue];
    } else if (localComparator.length <= 9 - x) {
      let count = 1;
      for (let y = x + 1; y < uniArray[i].length; y++) {
        if (JSON.stringify(uniArray[x][j]) === JSON.stringify(uniArray[y][j])) {
          count++;
        }
      }
      if (count === localComparator.length && localComparator.length > 1) {
        return x;
      }
    }
  }
  return -1;
}

function checkSingleElement(arr, row, column) {
  if (arr.length === 1) {
    let temp = arr[0];
    deleteElement(row, column, temp);
    deleteBlockValues(row, column, temp);
    uniArray[row][column] = [temp];
  }
}

//Maha function

function blockSpecialCheck(i, j) {
  if (j < 3 && i < 3) {
    //first Block

    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
          } else {
            count = checkBlockValues(localComparator, i, j, 0, 3, 0, 3, k, l);
          }
          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j > 2 && j < 6 && i < 3) {
    //Second Block

    for (let k = 0; k < 3; k++) {
      for (let l = 3; l < 6; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            // return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 0, 3, 3, 6, k, l);
          }
          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j > 5 && j < 9 && i < 3) {
    //Third Block

    for (let k = 0; k < 3; k++) {
      for (let l = 6; l < 9; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            //return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 0, 3, 6, 9, k, l);
          }

          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j < 3 && i > 2 && i < 6) {
    // Forth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 0; l < 3; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            //return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 3, 6, 0, 3, k, l);
          }

          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j > 2 && j < 6 && i > 2 && i < 6) {
    //Fifth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 3; l < 6; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            //return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 3, 6, 3, 6, k, l);
          }
          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j > 5 && j < 9 && i > 2 && i < 6) {
    //Sixth Block

    for (let k = 3; k < 6; k++) {
      for (let l = 6; l < 9; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            //return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 3, 6, 6, 9, k, l);
          }
          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j < 3 && i > 5) {
    //Seventh Block
    for (let k = 6; k < 9; k++) {
      for (let l = 0; l < 3; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            //return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 6, 9, 0, 3, k, l);
          }

          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j > 2 && j < 6 && i > 5) {
    //Eight Block

    for (let k = 6; k < 9; k++) {
      for (let l = 3; l < 6; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            //return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 6, 9, 3, 6, k, l);
          }
          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  } else if (j > 5 && i > 5) {
    //Ninth Block

    for (let k = 6; k < 9; k++) {
      for (let l = 6; l < 9; l++) {
        let count;
        if (k === i && l === j) {
          continue;
        } else {
          let localComparator = uniArray[k][l];
          if (localComparator.length === 1) {
            let putValue = localComparator[0];
            uniArray[k][l] = [];
            deleteElement(k, l, putValue);
            deleteBlockValues(k, l, putValue);
            uniArray[k][l] = [putValue];
            //return [k, l];
          } else {
            count = checkBlockValues(localComparator, i, j, 6, 9, 6, 9, k, l);
          }
          if (count === localComparator.length) {
            return [k, l];
          }
        }
      }
    }
    return [];
  }
}

function checkBlockValues(
  localComparator,
  i,
  j,
  kStart,
  kEnd,
  lStart,
  lEnd,
  currK,
  currL
) {
  let count = 1;
  for (let p = kStart; p < kEnd; p++) {
    for (let q = lStart; q < lEnd; q++) {
      //let indexes = []
      if ((p !== i || q !== j) && (currK !== p || currL !== q)) {
        if (
          JSON.stringify(localComparator) === JSON.stringify(uniArray[p][q])
        ) {
          count++;
        }
      }
    }
  }
  return count;
}

//creating function which will return first 25 random numbers
function startingNumber(len) {
  if (len === preDisplayNumber) {
    return 0;
  }
  let random = Math.floor(Math.random() * 81) + 1;
  if (firstStartingNumbers.includes(random)) {
    startingNumber(firstStartingNumbers.length);
  } else {
    firstStartingNumbers.push(random);
    startingNumber(firstStartingNumbers.length);
  }
}

//get i and j values from random numbers
function getIandJvalues(num) {
  let iVal = num % 9 === 0 ? num / 9 - 1 : Math.floor(num / 9);
  let jVal = num - 9 * iVal - 1;
  return [iVal, jVal];
}

function checkUserAnswer(event) {
  let divID = event.target.id;
  positionToCheck = parseInt(divID);
}

function verifyAnswer(numberToVerify) {
  if (positionToCheck === undefined) {
    alert("Oops!! you need to first select box");
  } else {
    let ijArray = getIandJvalues(positionToCheck);
    let divValue = uniArray[ijArray[0]][ijArray[1]];
    let displayAnswer = document.getElementById(positionToCheck);
    if (parseInt(numberToVerify) === parseInt(divValue)) {
      displayAnswer.style.color = "#0000FF";
      displayAnswer.childNodes[0].textContent = divValue;
      //displayAnswer.removeEventListener("click", checkUserAnswer, false);
      displayAnswer.classList.add("disable_btn");
      positionToCheck = undefined;
    } else {
      displayAnswer.style.backgroundColor = "FF0000";
      setTimeout(function () {
        displayAnswer.style.backgroundColor = "FFFFFF";
      }, 500);
    }
  }
}
