import * as React from 'react';
import styles from './Sudoku.module.scss';
import { ISudokuProps, ISudokuState } from './ISudokuProps';

export default class Sudoku extends React.Component<ISudokuProps, ISudokuState> {

  private totalCellCount: number = 81;
  private sudokuTemp: number[] = [];
  private totalSubGrids: number = 9;
  private allowedValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(props: ISudokuProps, state: ISudokuState) {
    super(props);
    this.state = {
      sudokuGrid: [],
      gameGenerated: false,
      status: undefined
    };
  }

  public render(): React.ReactElement<ISudokuProps> {
    return (
      <div className={styles.sudoku}>
        <div className={styles.container}>
          {this.state.gameGenerated ?
            <div className={styles.grid}>
              <div className={styles.row}>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(1)}
                </div>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(2)}
                </div>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(3)}
                </div>
              </div>
              <div className={styles.row}>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(4)}
                </div>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(5)}
                </div>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(6)}
                </div>
              </div>
              <div className={styles.row}>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(7)}
                </div>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(8)}
                </div>
                <div className={`${styles.column} ms-sm4`}>
                  {this.createSubGrid(9)}
                </div>
              </div>
            </div>
            :
            <div>
              Something running
            </div>
          }
        </div>
      </div>
    );
  }

  private createSubGrid(id: number): React.ReactElement<ISudokuProps> {
    let minIndex: number = this.getSubGirdFirstIndex(id);
    return (
      <div className={styles.grid}>
        <div className={styles.row}>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex - 1]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex + 1]}
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex + 2]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex + 3]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex + 4]}
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex + 5]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex + 6]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex + 7]}
          </div>
        </div>
      </div>
    );
  }

  public componentWillMount(): void {
    this.createSudoku();
  }

  private createSudoku(): void {

    // Initilaize the sudoku
    let sudoku: number[] = [];
    for (var i = 0; i < this.totalCellCount; i++) {
      sudoku.push(0);
    }
    this.sudokuTemp = sudoku;
    this.fillByCell(sudoku);

    // #region TO BE DELETED
    // this.sudokuTemp = sudokuGrid
    // //  this.setState({ sudokuGrid: sudokuGrid, gameGenerated: true });
    // // Initialize sudoku grid with the default values
    // this.setState({ sudokuGrid: sudokuGrid }, () => {

    //   let totalSubGrid: number[] = [1, 2];

    //   while (totalSubGrid.length > 0) {
    //     let subGrid: number = Math.round(Math.random() * 10);
    //     let position: number = totalSubGrid.indexOf(subGrid);

    //     // Checking if the grid is still left to be filled
    //     if (position >= 0) {
    //       // Removing the found element 
    //       totalSubGrid.splice(position, 1)
    //       this.fillSubGrid(subGrid);
    //     }
    //   }

    //   this.setState({ sudokuGrid: this.sudokuTemp, gameGenerated: true });
    // });
    // #endregion
  }

  // #region TO BE DELETED
  // private fillSubGrid(subGridId: any): void {

  //   let gridFirstIndex: number = this.getSubGirdFirstIndex(subGridId);
  //   let gridLastIndex: number = this.getSubGridLastIndex(subGridId);
  //   let counter: number = this.getSubGirdFirstIndex(subGridId);
  //   this.sudokuTemp = this.state.sudokuGrid;

  //   while (counter <= gridLastIndex) {

  //     // Generate the random value to fill in the cell
  //     let cellValue: number = Math.round(Math.random() * 10);

  //     // value should be more than 0 and less than 10 ie.. between 0 & 9
  //     if (cellValue > 0 && cellValue < 10) {

  //       // Check if the value is not present in the Row, Column and SubGrid
  //       if (this.checkColumns(counter, cellValue) && this.checkRow(counter, cellValue) && this.checksubGrid(gridFirstIndex, cellValue)) {

  //         this.sudokuTemp[counter - 1] = cellValue;
  //         console.debug(`${JSON.stringify(this.sudokuTemp)}:`);
  //         counter++;
  //       }
  //     }

  //   }
  // }

  // /**
  //  * Returns true if no cell matches with the parameter value in the vertical cells
  //  * @param cellId : Cell ID for which value needs to be checked
  //  * @param cellValue : Value that needs to be checked
  //  */
  // private checkColumns(cellId: number, cellValue: number): boolean {

  //   let isValid: boolean = true;
  //   let subGridId: number = this.getSubGridByCellId(cellId);
  //   let cellPositionInSubGrid: number = this.cellPositionInSubGrid(cellId);
  //   let searchableSubGrids: number[] = [];

  //   // iterate over each subGrid and identify the subGrids that lies int he same column
  //   let counter: number = 1;
  //   while (counter <= this.totalSubGrids) {

  //     if (counter % 3 == subGridId % 3) {
  //       searchableSubGrids.push(counter);
  //     }
  //     counter++;
  //   }


  //   let minGrid = searchableSubGrids.reduce((a, b) => { return Math.min(a, b); });
  //   let maxGrid = searchableSubGrids.reduce((a, b) => { return Math.max(a, b); });
  //   let minIndex: number = (((minGrid - 1) * 9) + (cellId % 3));
  //   let maxIndex: number = (((maxGrid - 1) * 9) + ((cellId % 3) + 6));
  //   counter = 1;

  //   while (minIndex <= maxIndex) {

  //     if (this.sudokuTemp[minIndex - 1] == cellValue) {
  //       isValid = false;
  //       break;
  //     }

  //     if (counter % 3 == 0) {
  //       minIndex += 21;
  //       counter = 1;
  //     }
  //     else {
  //       minIndex += 3;
  //       counter += 1;
  //     }
  //   }

  //   return isValid;
  // }

  // // Checks if the subgrid contains the cell Value
  // private checksubGrid(gridFirstIndex: number, cellValue: number): boolean {

  //   let isValid: boolean = true;
  //   let gridLastIndex: number = gridFirstIndex + 8;
  //   while (gridFirstIndex <= gridLastIndex) {
  //     if (this.sudokuTemp[gridFirstIndex - 1] == cellValue) {
  //       isValid = false;
  //       break;
  //     }
  //     gridFirstIndex += 1;
  //   }

  //   return isValid;
  // }

  // private checkRow(cellId: number, cellValue: number): boolean {
  //   let isValid: boolean = true;
  //   let searchableSubGrids: number[] = [];
  //   let subGridId: number = this.getSubGridByCellId(cellId) - 1;

  //   // iterate over each subGrid and identify the subGrids that lies in the same row
  //   let counter: number = 0;
  //   while (counter <= this.totalSubGrids - 1) {

  //     if (Math.floor(counter / 3) == Math.floor(subGridId / 3)) {
  //       searchableSubGrids.push(counter + 1);
  //     }
  //     counter++;
  //   }

  //   let rowInSubGrid: number = (((cellId % 9) - 1) / 3);
  //   let minGrid = searchableSubGrids.reduce((a, b) => { return Math.min(a, b); });
  //   let maxGrid = searchableSubGrids.reduce((a, b) => { return Math.max(a, b); });

  //   let firstIndex: number = this.getSubGirdFirstIndex(minGrid);
  //   firstIndex = firstIndex + ((3 * rowInSubGrid));

  //   let lastIndex: number = this.getSubGirdFirstIndex(maxGrid);
  //   lastIndex = lastIndex + ((3 * rowInSubGrid) + 2);

  //   counter = 1;

  //   while (firstIndex <= lastIndex) {

  //     if (this.sudokuTemp[firstIndex - 1] == cellValue) {
  //       isValid = false;
  //       break;
  //     }

  //     if (counter % 3 == 0) {
  //       firstIndex += 7;
  //       counter = 1;
  //     }
  //     else {
  //       firstIndex += 1;
  //       counter += 1;
  //     }
  //   }

  //   return isValid;
  // }

  // /**
  //  * Returns the cell postion in the sub grid
  //  * @param cellId 
  //  */
  // private cellPositionInSubGrid(cellId: number): number {

  //   // Check the cell position in a sub grid
  //   let positionInSubGrid: number = cellId % 9;

  //   // If modulus is 0 then it's the last cell in the subgrid
  //   positionInSubGrid = positionInSubGrid == 0 ? 9 : positionInSubGrid;

  //   return positionInSubGrid;
  // }

  // #endregion

  /** ------------------------------- Start Processing ----------------------------------- */

  /**
   * Start filling the sudoku cells
   */
  private fillByCell(sudoku:number[]): void {

    sudoku.forEach((element,index) => {
      console.log(index);
      element = this.getCellValue(index);
      console.log(element);
    });

    this.setState({ sudokuGrid: this.sudokuTemp, gameGenerated: true });
  }

  /**
   * Fills the value for the current cell
   * @param cellId Cell Id for which value is required
   */
  private getCellValue(cellId: number): number {

    let cellValue: number = 0;
    let possibleMoves: number[] = this.getPossibleValues(cellId);

    // If there are no possible moves than backtrack and try other options
    if (possibleMoves.length == 0) {
      cellValue = this.backtrack(cellId - 1, cellId);
    }
    else {
      // Get the index using random to fill in the value
      let index: number = possibleMoves.length == 1 ? 0 : this.getRandomValue(1, possibleMoves.length);
      cellValue = possibleMoves[index - 1];
    }
    return cellValue;
  }

  /**
   * Backtracks and look for the possiblity of the values that can be fit to meet the conditions
   * @param backtrackCellId previous cellId which needs to be changed
   * @param originalCellId original cell id which met conflict
   */
  private backtrack(backtrackCellId: number, originalCellId: number): number {

    if (backtrackCellId >= 0) {
      let backTrackValue: number = this.sudokuTemp[backtrackCellId];

      this.sudokuTemp[backtrackCellId] = 0;
      let possibleMoves: number[] = this.getPossibleValues(backtrackCellId);

      // if the back tracked cell does not have any other option backtrack again
      if (possibleMoves.length == 0 || (possibleMoves.length == 1 && possibleMoves[0] == backTrackValue)) {
        this.sudokuTemp[backtrackCellId] = backTrackValue;
        return this.backtrack(backtrackCellId - 1, originalCellId);
      }
      else {
        let index: number = 0;
        do {
          index = this.getRandomValue(1, possibleMoves.length);
        } while (possibleMoves[index] == backTrackValue);

        // Update the value of the back tracked cell Id 
        this.sudokuTemp[backtrackCellId] = possibleMoves[index];

        // Now check if this resolves the conflict
        possibleMoves = this.getPossibleValues(originalCellId);

        if (possibleMoves.length > 0) {
          index = this.getRandomValue(1, possibleMoves.length);
          return possibleMoves[index];
        }
        else {
          this.sudokuTemp[backtrackCellId] = backTrackValue;
          return this.backtrack(backtrackCellId - 1, originalCellId);
        }
      }
    }
    else {
      alert(`could not find value for the cell ${originalCellId}`);
      return -1;
    }
  }


  /** ------------------------------ Helper Methods starts  ------------------------------- */

  /**
   * Returns the random value between the min and max value
   * @param minValue Minimum value of the random number
   * @param maxValue Maximum value of the random number
   */
  private getRandomValue(minValue: number, maxValue: number): number {

    let random: number = 0;

    do {
      random = Math.round(Math.random() * 10);
    } while (random >= minValue && random <= maxValue);

    return random;
  }

  /**
   * Return the possible values that can be filled
   * @param array Array of values which needs to be checked
   */
  private getAvailableValues(array: number[]): number[] {
    return this.allowedValues.filter(item => array.indexOf(item) < 0);
  }

  /**
   * Returns the first index of the subgrid
   * @param gridID 
   */
  private getSubGirdFirstIndex(gridID: number): number {
    return ((gridID - 1) * 9) + 1;
  }

  /**
   * Returns the last index of the subgrid
   * @param gridID 
   */
  private getSubGridLastIndex(gridID: number): number {
    return (gridID * 9);
  }

  /**
   * Returns the Grid id to which the current cell belongs
   * @param cellId 
   */
  private getSubGridByCellId(cellId: number): number {

    return ((cellId - (cellId % 9)) / 9) + 1;
  }

  /** ------------------------------ Validation methods starts  ------------------------------- */

  /**
   * Returns the possible values in the grid
   * @param cellId Current Cell ID
   */
  private getAvailableValuesByRow(cellId: number): number[] {

    let unavailable: number[] = [];
    let subGridId: number = this.getSubGridByCellId(cellId) - 1; // Subtracting to consider start as 0 index
    let subGridIndentificationValue: number = Math.floor(subGridId / 3);

    // finds the grids which represents the row for the current cellId
    let subGrids: number[] = this.allowedValues.filter(item => Math.floor(item / 3) == subGridIndentificationValue);

    // Finds the row number of the cell in the sub grid
    let rowInSubGrid: number = (((cellId % 9) - 1) / 3);

    // Iterate over each grid and get the assigned values
    subGrids.forEach(grid => {

      // Identify the first index of the subgrid of same row as of current cell ID
      let firstIndex: number = this.getSubGirdFirstIndex(grid);
      firstIndex = firstIndex + ((3 * rowInSubGrid)) - 1;

      unavailable.push(this.sudokuTemp[firstIndex]);
      unavailable.push(this.sudokuTemp[firstIndex += 1]);
      unavailable.push(this.sudokuTemp[firstIndex += 1]);
    });

    // get the possible values that can be filled in a row
    return this.getAvailableValues(unavailable);
  }

  /**
   * Returns the possible values of the cell
   * @param cellId : Cell for which value needs to be filled
   */
  private getAvailableValuesInSubGrid(cellId: number): number[] {

    let available: number[] = [];
    let subGridId: number = this.getSubGridByCellId(cellId);
    let firstIndex: number = this.getSubGirdFirstIndex(subGridId) - 1;
    let lastIndex: number = this.getSubGridLastIndex(subGridId) - 1;
    let subGrid: number[] = this.sudokuTemp.slice(firstIndex, lastIndex);

    available = this.getAvailableValues(subGrid);
    return available;
  }

  /**
   * Returns the possible values that can be filled by column
   * @param cellId Cell Id for which possible value are required
   */
  private getAvailableValuesByColumn(cellId: number): number[] {

    let unavailable: number[] = [];
    let subGridId: number = this.getSubGridByCellId(cellId);
    let subGridIndentificationValue: number = Math.floor(subGridId % 3);

    // finds the grids which represents the row for the current cellId
    let subGrids: number[] = this.allowedValues.filter(item => Math.floor(item % 3) == subGridIndentificationValue);

    // Finds the row number of the cell in the sub grid
    let rowInSubGrid: number = (((cellId % 9) - 1) / 3);

    // Iterate over each grid and get the assigned values
    subGrids.forEach(grid => {

      // Identify the first index of the subgrid of same column as of current cell ID
      let firstIndex = (((grid - 1) * 9) + (cellId % 3)) - 1;

      unavailable.push(this.sudokuTemp[firstIndex]);
      unavailable.push(this.sudokuTemp[firstIndex += 3]);
      unavailable.push(this.sudokuTemp[firstIndex += 3]);
    });

    // return the possible values in the cell by columns
    return this.getAvailableValues(unavailable);
  }

  /**
   * Returns the possible values that can be filled in the cell
   * @param cellId Cell Id for which value is required
   */
  private getPossibleValues(cellId: number): number[] {

    let byRow: number[] = this.getAvailableValuesByRow(cellId);
    let byColumn: number[] = this.getAvailableValuesByColumn(cellId);
    let bySubGrid: number[] = this.getAvailableValuesInSubGrid(cellId);

    // Possible value will be the value which will be common to all the available values from grid,row and column
    let possibleValue: number[] = byRow.filter(item => byColumn.indexOf(item) > -1);
    possibleValue = bySubGrid.filter(item => possibleValue.indexOf(item) > -1);

    // Check the value should be between 1 and 9
    possibleValue = possibleValue.filter(item => item > 0 && item < 10);

    return possibleValue;
  }
}
