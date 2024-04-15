function gaussJordan(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let col = 0; col < numCols - 1; col++) {
        let maxRow = col;
        for (let row = col + 1; row < numRows; row++) {
            if (Math.abs(matrix[row][col]) > Math.abs(matrix[maxRow][col])) {
                maxRow = row;
            }
        }
        [matrix[col], matrix[maxRow]] = [matrix[maxRow], matrix[col]];

        for (let row = 0; row < numRows; row++) {
            if (row !== col) {
                const factor = matrix[row][col] / matrix[col][col];
                for (let i = col; i < numCols; i++) {
                    matrix[row][i] -= matrix[col][i] * factor;
                }
            }
        }
    }

    for (let row = 0; row < numRows; row++) {
        const divisor = matrix[row][row];
        for (let col = 0; col < numCols; col++) {
            matrix[row][col] /= divisor;
        }
    }

    return matrix;
}

function multiplyMatrix(matrix1, matrix2) {
    const result = [];
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;

    if (cols1 !== rows2) {
        return result;
    }

    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols2; j++) {
            result[i][j] = 0;
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

function polynomialHorner(x, coefficients) {
    if (coefficients.length === 0) {
        return 0;
    }

    let term = coefficients[0];

    for (let i = 1; i < coefficients.length; i++) {
        term = term * x + coefficients[i];
    }

    return term;
}

function matrixVinograd(matrix1, matrix2) {
    let rows1 = matrix1.length;
    let cols1 = matrix1[0].length;
    let rows2 = matrix2.length;
    let cols2 = matrix2[0].length;

    if (cols1 !== rows2) {
        return null;
    }

    let result = new Array(rows1);
    for (let i = 0; i < rows1; i++) {
        result[i] = new Array(cols2);
        for (let j = 0; j < cols2; j++) {
            result[i][j] = 0;
        }
    }

    let rowFactor = new Array(rows1);
    let colFactor = new Array(cols2);

    for (let i = 0; i < rows1; i++) {
        rowFactor[i] = 0;
        for (let j = 0; j < cols1 / 2; j++) {
            rowFactor[i] += matrix1[i][2 * j] * matrix1[i][2 * j + 1];
        }
    }

    for (let i = 0; i < cols2; i++) {
        colFactor[i] = 0;
        for (let j = 0; j < rows2 / 2; j++) {
            colFactor[i] += matrix2[2 * j][i] * matrix2[2 * j + 1][i];
        }
    }

    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            let sum = 0;
            for (let k = 0; k < cols1 / 2; k++) {
                sum += (matrix1[i][2 * k + 1] + matrix2[2 * k][j]) * (matrix1[i][2 * k] + matrix2[2 * k + 1][j]);
            }
            result[i][j] = sum - rowFactor[i] - colFactor[j];
        }
    }

    return result;
}


module.exports = { gaussJordan, multiplyMatrix, polynomialHorner, matrixVinograd };