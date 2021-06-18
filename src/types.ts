import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface IValue<T = any> {
  [key: string]: string | object | T;
}

export interface IFormError {
  [key: string]: string | undefined;
}

export interface IFormContext {
  getData<T = any>(): T | IValue | object | undefined;
  setValue<T>(value: IValue<T>): void;
  nextPage(): void;
  errors: IFormError;
  setErrors(errors: object): void;
  group: string;
  clearError(name: string): void;
  activePage: number;
  isLastPage: boolean;
  proviousPage(): void;
}

export interface IFormFunctions {
  getErrors(): IFormError;
  setErrors(errors: object): void;
  handleSubmit(): void;
  nextPage(): void;
  proviousPage(): void;
  isLastPage: boolean;
  activePage: number;
}

export interface IPropsForm {
  animationStyle?: 'opacity' | 'scale';
  animationDuration?: number;
  children: ReactNode;
  style?: ViewStyle;
  initialValueofFields?: IValue;
  onSubmit?: (value: IValue | object) => void;
}
