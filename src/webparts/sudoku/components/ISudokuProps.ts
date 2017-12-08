export interface ISudokuProps {
  description: string;
}

export interface ISudokuState {
  sudokuGrid?: number[];
  gameGenerated?:boolean;
  status?:string;
  tempCount?:number;
}
