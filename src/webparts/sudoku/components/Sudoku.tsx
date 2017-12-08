import * as React from 'react';
import styles from './Sudoku.module.scss';
import { ISudokuProps, ISudokuState } from './ISudokuProps';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Helper } from '../../../Helper/Helper';
import { AvailableValues } from '../../../Helper/AvailableValues';

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
      status: undefined,
      tempCount: 0
    };
  }

  public render(): React.ReactElement<ISudokuProps> {
    return (
      <div className={styles.sudoku}>
        <PrimaryButton onClick={() => this.increaseCounter()}>Next Move</PrimaryButton>

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

  private increaseCounter() {

    let counter = this.state.tempCount + 1;
    this.sudokuTemp = this.state.sudokuGrid;
    this.setState({ tempCount: counter }, () => {
      let cellValue = this.getCellValue(this.state.tempCount);
      this.sudokuTemp[this.state.tempCount] = cellValue;
      this.setState({ sudokuGrid: this.sudokuTemp });
    });
  }

  private createSubGrid(id: number): React.ReactElement<ISudokuProps> {
    let minIndex: number = Helper.getFirstIndex(id);
    return (
      <div className={styles.grid}>
        <div className={styles.row}>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
          <div className={`${styles.column} ms-sm4`}>{this.state.sudokuGrid[minIndex += 1]}
          </div>
        </div>
      </div>
    );
  }

  public componentWillMount(): void {
    this.initializeSudoku();
  }

  private initializeSudoku(): void {

    // Initilaize the sudoku
    let sudoku: number[] = [];
    this.sudokuTemp.push(-1); // pushing this value to start index from 1
    for (var i = 1; i <= this.totalCellCount; i++) {
      sudoku.push(i);
      this.sudokuTemp.push(0);
    }

    this.fillByCell(sudoku);
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

  // ------------------------------- Start Processing ----------------------------------- //

  /**
   * Start filling the sudoku cells
   */
  private fillByCell(sudoku: number[]): void {

    // while (sudoku.length > 0) {
    //   let index: number = sudoku.splice(0, 1)[0];
    //   let cellValue = this.getCellValue(index);
    //   this.sudokuTemp.push(cellValue);
    // }

    this.setState({ sudokuGrid: this.sudokuTemp, gameGenerated: true });
  }

  /**
   * Fills the value for the current cell
   * @param cellId Cell Id for which value is required
   */
  private getCellValue(cellId: number): number {

    let cellValue: number = 0;
    let possibleMoves: number[] = this.getPossibleValues(cellId); // Get the possible values for the current cell ID

    // If there are no possible moves than backtrack and try other options
    if (possibleMoves.length == 0) {
      cellValue = this.backtrack(cellId - 1, cellId);
    }
    else {
      // Get the index using random to fill in the value
      let index: number = possibleMoves.length == 1 ? 1 : Helper.getRandomValue(1, possibleMoves.length);
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

    // if (backtrackCellId >= 0) {
    //   let backTrackValue: number = this.sudokuTemp[backtrackCellId];

    //   this.sudokuTemp[backtrackCellId] = 0;
    //   let possibleMoves: number[] = this.getPossibleValues(backtrackCellId);

    //   // if the back tracked cell does not have any other option backtrack again
    //   if (possibleMoves.length == 0 || (possibleMoves.length == 1 && possibleMoves[0] == backTrackValue)) {
    //     this.sudokuTemp[backtrackCellId] = backTrackValue;
    //     return this.backtrack(backtrackCellId - 1, originalCellId);
    //   }
    //   else {
    //     let index: number = -1;
    //     let cellValue: number = -1;


    //     while (possibleMoves.length > 0) {

    //       let move: number = possibleMoves.pop();

    //       if (move != backTrackValue) {
    //         this.sudokuTemp[backtrackCellId] = move;

    //         // Now check if this resolves the conflict
    //         let origCellPossibleMove = this.getPossibleValues(originalCellId);

    //         if (origCellPossibleMove.length > 0) {
    //           index = this.getRandomValue(1, origCellPossibleMove.length);
    //           cellValue = origCellPossibleMove[index - 1];
    //           break;
    //         }
    //       }
    //     }

    //     if (cellValue == -1) {
    //       this.sudokuTemp[backtrackCellId] = backTrackValue;
    //       return this.backtrack(backtrackCellId - 1, originalCellId);
    //     }
    //     else {
    //       return cellValue;
    //     }
    //   }
    // }
    // else {
    //   alert(`could not find value for the cell ${originalCellId}`);
    //   return -1;
    // }
    return -1;
  }


  /**
   * Returns the possible values that can be filled in the cell
   * @param cellId Cell Id for which value is required
   */
  private getPossibleValues(cellId: number): number[] {

    let availValues: AvailableValues = new AvailableValues(this.sudokuTemp);
    let row: number[] = availValues.row(cellId);
    let column: number[] = availValues.column(cellId);
    let square: number[] = availValues.square(cellId);

    // Possible value will be the value which will be common to all the available values from grid,row and column
    let possibleValue: number[] = row.filter(item => column.indexOf(item) > -1);
    possibleValue = square.filter(item => possibleValue.indexOf(item) > -1);

    // Check the value should be between 1 and 9
    possibleValue = possibleValue.filter(item => item > 0 && item < 10);

    // if(possibleValue.length == 0){
    console.log(`Cell: ${cellId}`);
    console.log(`Columns: ${JSON.stringify(column)}`);
    console.log(`Rows: ${JSON.stringify(row)}`);
    console.log(`Grid: ${JSON.stringify(square)}`);
    console.log(`final Possibility: ${JSON.stringify(possibleValue)}`);
    console.log(`----------------------------------`);
    // }

    return possibleValue;
  }
}
