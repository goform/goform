import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import dot from 'dot-object';
import { FormContext } from '../createContext';

import { IFormContext } from '../types';

interface IUtils<T> {
  error: string | undefined;
  clearFieldError(): void;
  value: T;
  defaultValue: T;
  setValue(value: string | number | any): void;
}

const useUtil = <T>(fildName: string): IUtils<T> => {
  const {
    errors,
    group,
    setValue: setGlobalData,
    clearError,
    getData,
  } = useContext<IFormContext>(FormContext);
  const originalGlobalData = getData();

  const [data, setData] = useState<T>();

  const name = useMemo(() => {
    return group ? `${group}.${fildName}` : fildName;
  }, [fildName, group]) as string;

  useEffect(() => {
    const valueGlobal = dot.pick(name, originalGlobalData);
    setGlobalData({ [name]: valueGlobal || '' });
  }, []);

  const error = useMemo(() => {
    return errors && errors[name];
  }, [errors, name]);

  const setValue = useCallback(
    (value: string | number | any): void => {
      setGlobalData<T>({ [name]: value });
      setData(value);
    },
    [name, setGlobalData],
  );

  const clearFieldError = useCallback(() => {
    clearError(name);
  }, [clearError, name]);

  const value = useMemo((): T => {
    return data || dot.pick(name, originalGlobalData);
  }, [originalGlobalData, name, data]);

  const defaultValue = useMemo((): T => {
    return dot.pick(name, originalGlobalData);
  }, [originalGlobalData, name]);

  return {
    error,
    clearFieldError,
    value,
    defaultValue,
    setValue,
  };
};

export { useUtil };
