export interface PreResults {
  exact: ResultData[];
  onOwn: ResultData[];
  startsWith: ResultData[];
  inParentheses: ResultData[];
  partial: ResultData[];
}

export interface ResultData {
  word: string;
  translate: string;
}
