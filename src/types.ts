export type actionsType = "deposit" | "withdraw" | "transfer";

export type tableDataType = {
  // date: string;
  date: Date;
  amount: number;
  balance: number;
  type: actionsType;
};

export type actionDataType = {
  amount: string;
  email?: string;
};

export type pageDataType = {
  currentPage: number;
  lastPage: number;
};
