export interface ITodos {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type StateType = {
  age: number;
};

export type ActionType = {
  type: string;
};

export type ObjectType = Partial<ITodos>;

/* const obj: ObjectType = {
  id: 123,
  title: 'My Name is Vadim',
}; */
