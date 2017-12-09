import * as React from 'react';
import styles from './Sudoku.module.scss';
import { ISudokuProps, ISudokuState } from './ISudokuProps';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Helper } from '../../../Helper/Helper';
import { AvailableValues } from '../../../Helper/AvailableValues';

export default class Sudoku extends React.Component<ISudokuProps, ISudokuState> {

  private totalCellCount: number = 81;
  private sudokuTemp: number[] = [];
  private allowedValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(props: ISudokuProps, state: ISudokuState) {
    super(props);
    this.state = {
      sudokuGrid: [],
      gameGenerated: true,
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

    this.initializeSudoku();
    // let counter = this.state.tempCount + 1;
    // this.sudokuTemp = this.state.sudokuGrid;
    // this.setState({ tempCount: counter }, () => {
    //   let cellValue = this.getCellValue(this.state.tempCount);
    //   this.sudokuTemp[this.state.tempCount] = cellValue;
    //   this.setState({ sudokuGrid: this.sudokuTemp });
    // });
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
    //this.initializeSudoku();
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

  // ------------------------------- Start Processing ----------------------------------- //

  /**
   * Start filling the sudoku cells
   */
  private fillByCell(sudoku: number[]): void {

    while (sudoku.length > 0) {
      let index: number = sudoku.splice(0, 1)[0];
      let cellValue = this.getCellValue(index);
      this.sudokuTemp[index] = cellValue;
    }

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
  private backtrack1(backtrackCellId: number, originalCellId: number): number {

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

  private backtrack(backtrackCellId: number, currentCellId: number): number {

    let avail: AvailableValues = new AvailableValues(this.sudokuTemp);
    let rowIndex: number[] = avail.getIndexes(currentCellId, 'Row');
    let colIndex: number[] = avail.getIndexes(currentCellId, 'Column');
    let indexes: number[] = rowIndex.concat(colIndex);
    let cellValue: number = -1;

    while (indexes.length > 0) {

      let index: number = indexes.pop();
      // Check if the value is between 1 and 9 and is not current cell
      if (this.sudokuTemp[index] > 0 && this.sudokuTemp[index] < 10 && index != currentCellId) {

        let btPossibleValues: number[] = this.getPossibleValues(index);
        let backTrackValue: number = this.sudokuTemp[index];

        while (btPossibleValues.length > 0) {

          let move: number = btPossibleValues.pop();

          if (move != backTrackValue) {
            this.sudokuTemp[backtrackCellId] = move;

            // Now check if this resolves the conflict
            let origCellPossibleMove = this.getPossibleValues(currentCellId);

            if (origCellPossibleMove.length > 0) {
              index = Helper.getRandomValue(1, origCellPossibleMove.length);
              cellValue = origCellPossibleMove[index - 1];
              btPossibleValues = [];
              indexes = [];
            }
          }
        }
      }
    }

    return cellValue;

    // #region TO BE DELETED
    // if (backtrackCellId >= 0) {

    //   let backTrackValue: number = this.sudokuTemp[backtrackCellId];
    //   this.sudokuTemp[backtrackCellId] = 0;
    //   let possibleMoves: number[] = this.getPossibleValues(backtrackCellId);

    //   // if the back tracked cell does not have any other option backtrack again
    //   if (possibleMoves.length == 0 || (possibleMoves.length == 1 && possibleMoves[0] == backTrackValue)) {
    //     this.sudokuTemp[backtrackCellId] = backTrackValue;
    //     return this.backtrack(backtrackCellId - 1, currentCellId);
    //   }
    //   else {
    //     let index: number = -1;
    //     let cellValue: number = -1;

    //     while (possibleMoves.length > 0) {

    //       let move: number = possibleMoves.pop();

    //       if (move != backTrackValue) {
    //         this.sudokuTemp[backtrackCellId] = move;

    //         // Now check if this resolves the conflict
    //         let origCellPossibleMove = this.getPossibleValues(currentCellId);

    //         if (origCellPossibleMove.length > 0) {
    //           index = Helper.getRandomValue(1, origCellPossibleMove.length);
    //           cellValue = origCellPossibleMove[index - 1];
    //           break;
    //         }
    //       }
    //     }

    //     // If still cell Value is not found backtrack again
    //     if (cellValue == -1) {
    //       this.sudokuTemp[backtrackCellId] = backTrackValue;
    //       return this.backtrack(backtrackCellId - 1, currentCellId);
    //     }
    //     else {
    //       return cellValue;
    //     }
    //   }
    // }
    // else {
    //   alert(`could not find value for the cell ${currentCellId}`);
    //   return -1;
    // }
    // #endregion
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
