export class Helper {

    private static allowedValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    /**
     * Returns the random value between the min and max value
     * @param minValue Minimum value of the random number
     * @param maxValue Maximum value of the random number
     */
    public static getRandomValue(minValue: number, maxValue: number): number {

        let random: number = 0;

        do {
            random = Math.round(Math.random() * 10);
        } while (random < minValue || random > maxValue);

        return random;
    }

    /**
     * Return the possible values that can be filled
     * @param array Array of values which needs to be checked
     */
    public static getAvailableValues(unavailableValues: number[]): number[] {
        return Helper.allowedValues.filter(item => unavailableValues.indexOf(item) < 0);
    }

    /**
     * Returns the first index of the subgrid
     * @param gridID 
     */
    public static getFirstIndex(gridID: number): number {
        return ((gridID - 1) * 9) + 1;
    }

    /**
     * Returns the last index of the subgrid
     * @param gridID 
     */
    public static getLastIndex(gridID: number): number {
        return (gridID * 9);
    }

    /**
     * Returns the Grid id to which the current cell belongs
     * @param cellId 
     */
    public static getSquare(cellId: number): number {

        return ((cellId - (cellId % 9)) / 9) + 1;
    }

    public static getSquares(cellId: number, type: string): number[] {

        switch (type) {
            case 'Row':
                {
                    let subGridId: number = this.getSquare(cellId);
                    if (subGridId <= 3) {
                        return [1, 2, 3];
                    }
                    else if (subGridId > 3 && subGridId <= 6) {
                        return [4, 5, 6];
                    }
                    else {
                        return [7, 8, 9];
                    }
                }
            case 'Column':
                {
                    let subGridId: number = this.getSquare(cellId);
                    if (subGridId == 1 || subGridId == 4 || subGridId == 7) {
                        return [1, 4, 7];
                    }
                    else if (subGridId == 2 || subGridId == 5 || subGridId == 8) {
                        return [2, 5, 8];
                    }
                    else {
                        return [3, 6, 9];
                    }
                }
        }
    }

    public static log(message: string): void {
        console.log(message);
    }

    /**
     * Retuturns the first index of the row in the square corresponding to the cell
     * @param cellId 
     * @param square 
     */
    public static getRowFirstIndex(cellId: number, square: number): number {

        let mod9: number = cellId % 9 == 0 ? 9 : cellId % 9;

        let rowIndex: number = mod9 / 3;
        rowIndex = mod9 % 3 == 0 ? rowIndex - 1 : rowIndex;

        let firstIndex: number = Helper.getFirstIndex(square);
        firstIndex = firstIndex + (3 * (rowIndex));
        return 0;
    }
}