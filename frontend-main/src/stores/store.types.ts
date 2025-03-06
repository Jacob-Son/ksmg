export type TCreateStore<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined,
) => void;

export type TSetterKeys<T> = `set${Capitalize<string & keyof T>}`;
