interface Solution {
    [key: string]: string;
}


interface GridData{
    [key: string]: string | null;
}


export const solutionIndexes : Solution = {
    "1:1": "0",
    "1:3": "4",
    "1:5": "5",
    "5:1": "1",
    "5:3": "3",
    "5:5": "6",
    "5:7": "8",
    "6:2": "2",
    "6:6": "7",
}

export const solutionDefaultValue : Solution = {
    "1:1": "A",
    "1:3": "E",
    "1:5": "F",
    "5:1": "B",
    "5:3": "D",
    "5:5": "G",
    "5:7": "I",
    "6:2": "C",
    "6:6": "H",
}

export const Alphaindex : Solution = {
    "A": "1",
    "B": "2",
    "C": "3",
    "D": "4",
    "E": "5",
    "F": "6",
    "G": "7",
    "H": "8",
    "I": "9",
}

export const gridData: GridData = {
    "1:4": "-",
    "1:7": "66",
    "2:1": "+",
    "2:3": "x",
    "2:5": "-",
    "2:7": "=",
    "3:1": "13",
    "3:3": "12",
    "3:5": "11",
    "3:7": "10",
    "4:1": "x",
    "4:3": "+",
    "4:5": "+",
    "4:7": "-",
    "6:1": ":",
    "6:3": "+",
    "6:5": "x",
    "6:7": ":",
};
    