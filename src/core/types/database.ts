type OpType = {
  [key: string]: symbol;
};

export const Operations: OpType = {
  and: Symbol('and'),
  or: Symbol('or'),
  eq: Symbol('eq'),
  ne: Symbol('ne'),
  is: Symbol('is'),
  not: Symbol('not'),
  col: Symbol('col'),
  gt: Symbol('gt'),
  gte: Symbol('gte'),
  lt: Symbol('lt'),
  lte: Symbol('lte'),
  between: Symbol('between'),
  notBetween: Symbol('notBetween'),
  all: Symbol('all'),
  in: Symbol('in'),
  notIn: Symbol('notIn'),
  like: Symbol('like'),
  notLike: Symbol('notLike'),
  iLike: Symbol('iLike'),
  notILike: Symbol('notILike'),
  regexp: Symbol('regexp'),
  notRegexp: Symbol('notRegexp'),
  iRegexp: Symbol('iRegexp'),
  notIRegexp: Symbol('notIRegexp'),
  any: Symbol('any'),
  match: Symbol('match'),
};

export interface QueryFilter {
  [key: string]: {
    [key: string]: number | null | boolean | string | number[];
  };
}
