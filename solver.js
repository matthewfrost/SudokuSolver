function start(){
    const easyPuzzle = [[0,0,7,5,0,0,6,0,3], [4,3,0,0,0,6,0,0,5], [6,0,8,1,0,9,0,2,7], [2,0,6,4,5,0,0,0,0], [0,0,1,0,6,0,3,4,0], [7,0,0,0,0,8,0,5,0], [8,0,0,7,0,0,1,3,0], [0,7,4,0,2,0,5,9,0], [1,0,9,3,0,5,0,0,0]]
    if(!verifyFormat(easyPuzzle)){
        return;
    }
    console.log("Solving puzzle");
    beginSolve(easyPuzzle);
}

const possibleValues = [1,2,3,4,5,6,7,8,9]

function beginSolve(puzzle){
    var unknownValues;
    do{
        unknownValues = 0;
        for(const [rowIndex, row] of puzzle.entries()){
            for(const [colIndex, cell] of row.entries()){
                if(cell > 0){
                    continue;
                }
                console.log(`Row: ${rowIndex} Column: ${colIndex}`)
                let rowValues = getPossibleRowValues(row);
                console.log(`Row values ${rowValues}`);
                
                let columnValues = getPossibleColumnValues(puzzle, colIndex);
                console.log(`Column values ${columnValues}`);

                let gridValues = getPossibleGridValues(puzzle, rowIndex, colIndex);
                console.log(`Grid value ${gridValues}`);

                let colRowValues = rowValues.filter(val => columnValues.includes(val));
                let allValues = colRowValues.filter(val => gridValues.includes(val));
                if(allValues.length == 1){
                    row[colIndex] = allValues[0];
                }
                else{
                    unknownValues++;
                }
            }
        }
    }
    while(unknownValues != 0)

    console.log(puzzle);
}

/**
 * 
 * @param {*} puzzle 
 * @param {int} columnNumber 0 based column index
 */
function getPossibleColumnValues(puzzle, columnNumber){
    let columnValues = [];
    for(let row of puzzle){
        let rowValue = row[columnNumber];
        if(rowValue != 0){
            columnValues.push(rowValue);
        }
    }

    let remainingValues = possibleValues.filter(val => !columnValues.includes(val));
    return remainingValues;
}

function getPossibleRowValues(row){
    let remainingValues = possibleValues.filter(val => !row.includes(val));
    return remainingValues;
}

/**
 * 
 * @param {*} puzzle 
 * @param {Int} rowIndex 0 based row index
 * @param {Int} columnIndex 0 based column index
 */
function getPossibleGridValues(puzzle, rowIndex, columnIndex){

    let [minX, maxX] = getMinMaxValues(columnIndex);
    let [minY, maxY] = getMinMaxValues(rowIndex);
    console.log(`minX ${minX} maxX ${maxX} minY ${minY} maxY ${maxY}`);
    let gridValues = [];
    for(var i = minY; i <= maxY; i++){
        for(var j = minX; j <= maxX; j++){
            if(puzzle[i][j] != 0){
                gridValues.push(puzzle[i][j]);
            }
        }
    }

    console.log(`Found grid values ${gridValues}`);

    let remainingValues = possibleValues.filter(val => !gridValues.includes(val));

    return remainingValues;
}

function getMinMaxValues(value){
    let [min, max] = [0,0];

    if(value <= 2){
        min = 0;
        max = 2;
    }
    else if(value > 2 && value <= 5){
        min = 3;
        max = 5;
    }
    else{
        min = 6;
        max = 8;
    }

    return [min, max];
}

//Making sure there is 9 rows with 9 columns
function verifyFormat(puzzle){
    if(puzzle.length != 9){
        return false;
    }
    for(let row of puzzle){
        if(row.length != 9){
            return false;
        }
    }

    return true;
}

start();