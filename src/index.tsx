import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import dot from 'dot-object';
import { View, Animated } from 'react-native';

import { FormContext } from './createContext';

import {
  IFormFunctions,
  IPropsForm,
  IFormContext,
  IValue,
  IFormError,
} from './types';

const FormProvider: ForwardRefRenderFunction<IFormFunctions, IPropsForm> = (
  {
    children,
    initialValueofFields = {},
    onSubmit = () => null,
    multiStep = false,
    style,
    animationStyle,
    animationDuration = 240,
  },
  formRef,
) => {
  const animation = useRef(new Animated.Value(1));
  const progressPage = useRef(false);

  const data = useRef<IValue>(initialValueofFields);

  const [activePage, setActivePage] = useState(0);

  const [errors, setError] = useState<IFormError | any | object>({});

  const lenghtPage = React.Children.map(
    children as React.ReactElement,
    child => {
      if (
        !React.isValidElement<{ children: React.ReactNode }>(children) &&
        child.props.children
      ) {
        return child;
      }

      return child;
    },
  ).length;

  const forms = multiStep
    ? React.Children.map(
        children,
        (child, index) => index === activePage && child,
      )
    : children;

  const handleNewPage = useCallback(
    (direction: 'next' | 'previous') => {
      if (animationStyle) {
        progressPage.current = true;

        Animated.timing(animation.current, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(() => {
          direction === 'next'
            ? setActivePage(activePage + 1)
            : setActivePage(activePage - 1);

          Animated.timing(animation.current, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
          }).start(() => {
            progressPage.current = false;
          });
        });
      } else {
        direction === 'next'
          ? setActivePage(activePage + 1)
          : setActivePage(activePage - 1);
      }
    },
    [activePage, animation, animationDuration, animationStyle],
  );

  const getData = useCallback(() => dot.object(data.current), [data]);

  const nextPage = useCallback(() => {
    if (activePage === lenghtPage - 1 || progressPage.current) return;
    handleNewPage('next');
  }, [activePage, lenghtPage, handleNewPage, progressPage]);

  const proviousPage = useCallback(() => {
    if (activePage === 0 && !progressPage.current) return;
    handleNewPage('previous');
  }, [activePage, handleNewPage, progressPage]);

  const setErrors = useCallback((error: IFormError | object) => {
    const transformDotError = dot.dot(error);

    setError(transformDotError);
  }, []);

  const setValue = useCallback(
    (value: IValue) => {
      data.current = { ...data.current, ...value };
    },
    [data],
  );

  const clearError = useCallback((name: string) => {
    setError((oldValue: IFormError) => ({
      ...oldValue,
      [name]: undefined,
    }));
  }, []);

  const formSubmit = useCallback(() => {
    const newData = dot.object(data.current);
    return onSubmit(newData);
  }, [onSubmit]);

  useImperativeHandle<{}, IFormFunctions>(formRef, () => ({
    getErrors() {
      return errors;
    },
    setErrors(formErrors) {
      return setErrors(formErrors);
    },
    handleSubmit() {
      formSubmit();
    },
    nextPage() {
      nextPage();
    },
    proviousPage() {
      proviousPage();
    },
    isLastPage: activePage === lenghtPage - 1,
    activePage,
  }));

  const animationStart =
    animationStyle === 'scale'
      ? { transform: [{ scale: animation.current }] }
      : animationStyle === 'opacity' && { opacity: animation.current };

  const value = React.useMemo(
    () => ({
      nextPage,
      proviousPage,
      getData,
      setErrors,
      setValue,
      group: '',
      errors,
      clearError,
      activePage,
      isLastPage: activePage === lenghtPage - 1,
    }),
    [
      nextPage,
      proviousPage,
      setErrors,
      errors,
      clearError,
      getData,
      setValue,
      activePage,
      lenghtPage,
    ],
  );

  return (
    <FormContext.Provider value={value}>
      <Animated.View style={[animationStart, { flex: 1 }]}>
        <View style={style}>{forms}</View>
      </Animated.View>
    </FormContext.Provider>
  );
};

function useForm(): IFormContext {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }

  return context;
}

export const Form = forwardRef(FormProvider);
export * from './utils/Group';
export { useForm, IFormFunctions };
