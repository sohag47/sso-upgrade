type TSharedState = {
  value: number;
  auth: TAuth | null;
};

export const initialState: TSharedState = {
  value: 0,
  auth: null,
};
