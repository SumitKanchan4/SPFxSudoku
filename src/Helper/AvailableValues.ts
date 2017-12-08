import { Helper } from './Helper';

export class AvailableValues {

    private sudoku: number[] = [];

    constructor(sudoku: number[]) {
        this.sudoku = sudoku;
    }

    /**
     * Returns the available values in the row
     * @param cellId Current cell ID
     */
    public row(cellId: number): number[] {

        let unavailable: number[] = [];

        // All the squares in the same row of the curren cell
        let squares: number[] = Helper.getSquares(cellId, 'Row');
        Helper.log(`Row | Cell ID: ${cellId} | squares:${JSON.stringify(squares)}`);

        // Iterate over each grid and get the assigned values
        squares.forEach(square => {

            // Identify the first index of the subgrid of same row as of current cell ID
            let firstIndex: number = Helper.getRowFirstIndex(cellId, square);
            Helper.log(`Row | Square: ${square} | firstIndex:${firstIndex}`);

            unavailable.push(this.sudoku[firstIndex]);
            unavailable.push(this.sudoku[firstIndex += 1]);
            unavailable.push(this.sudoku[firstIndex += 1]);
        });

        return Helper.getAvailableValues(unavailable);
    }

    /**
     * Returns the available values in the column
     * @param cellId 
     */
    public column(cellId: number): number[] {

        let unavailable: number[] = [];

        // finds the squares which represents the row for the current cellId
        let squares: number[] = Helper.getSquares(cellId, 'Column');
        Helper.log(`Column | Cell ID: ${cellId} | squares:${JSON.stringify(squares)}`);
        // Iterate over each grid and get the assigned values
        squares.forEach(square => {

            // Identify the first index of the subgrid of same column as of current cell ID
            let firstIndex = (((square - 1) * 9) + ((cellId) % 3));
            Helper.log(`Column | Square: ${square} | firstIndex:${firstIndex}`);

            unavailable.push(this.sudoku[firstIndex]);
            unavailable.push(this.sudoku[firstIndex += 3]);
            unavailable.push(this.sudoku[firstIndex += 3]);
        });

        // return the possible values in the cell by columns
        return Helper.getAvailableValues(unavailable);
    }

    /**
     * Returns the available values in the square
     * @param cellId 
     */
    public square(cellId: number): number[] {

        let available: number[] = [];
        let subGridId: number = Helper.getSquare(cellId);
        let firstIndex: number = Helper.getFirstIndex(subGridId);
        let square: number[] = this.sudoku.slice(firstIndex, firstIndex + 9);

        return Helper.getAvailableValues(square);
    }
}