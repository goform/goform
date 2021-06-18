<h1 align="center">React Native goForm</h1>


<br>

<h2 align="center">
Staged Form Support</h2>

<br>

<p align="center">
  <img alt="Principal linguagem do projeto" src="https://img.shields.io/github/languages/top/goform/goform?color=56BEB8">

  <img alt="Quantidade de linguagens utilizadas" src="https://img.shields.io/github/languages/count/goform/goform?color=56BEB8">

  <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/goform/goform?color=56BEB8">

  <img alt="Licença" src="https://img.shields.io/github/license/goform/goform?color=56BEB8">

  <img alt="Github issues" src="https://img.shields.io/github/issues/goform/goform?color=56BEB8" />

  <img alt="Github forks" src="https://img.shields.io/github/forks/goform/goform?color=56BEB8" />

  <img alt="Github stars" src="https://img.shields.io/github/stars/goform/goform?color=56BEB8" />
</p>

<p align="center">
  <a href="#wrench-installation">Installation</a> &#xa0; | &#xa0;
  <a href="#sparkles-functionalities">Functionalities</a> &#xa0; | &#xa0;
  <a href="#blush-simple-documentation-for-the-form-component">Documentation</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="#rocket-technology">Technology</a> &#xa0; | &#xa0;
  <a href="https://github.com/goform" target="_blank">Autor</a>
  &#xa0; | &#xa0;
  <a href="https://github.com/goform/react-native-exemplo" target="_blank">Demo</a>
</p>

<br>

## :wrench: Installation ##


```bash
# Install React Native goForm

yarn add goform

# or if you prefer

npm install goform

```

## :sparkles: Functionalities ##

:heavy_check_mark: Creating simple forms.
:heavy_check_mark: Creating more complex forms.
:heavy_check_mark: Easy to use

## :blush: Simple documentation for the Form component. ##

```ts
    import Form from 'goform';

    //Activate the form in stages, by default it is false
    multiStep: boolean

    //Receives an object containing the initial value for each form field.
    initialValueofFields = {},

    //Receives a function and returns the filled data as a parameter.
    onSubmit = (data) => console.log(data)

    //It has 2 animations for transitioning forms ('opacity' | 'scale').
    animationStyle = "opacity" -> default value null,

    //Duration of animation on form switch.
    animationDuration = 240,

    //Reference of the form, has how to return some features.
    ref

```

References useRef<IFormFunctions>(null)
```ts
    //Returns the active page number
    activePage: number

    //Skip to next page function
    nextPage(): void

    //Function to return to previous next
    proviousPage(): void

    //Returns true if it is the last page
    isLastPage: boolean

    //Submit form and receive data in the Form component's onSubmit
    handleSubmit(): void

    //Receive an object with errors
    setErrors(object)

    //Return errors
    getErrors: () => errors
```

## :blush: Simple documentation for the Group component. ##

```ts
    import { Group } from 'goform';

    //Receive the group name within the form
    groupName = {},
```

## :star: Simple Exemple ##

```tsx
  // Input component
  import React from 'react';
  import { useUtil } from 'goForm/utils';

  const Input = ({name}) => {
  const { setValue, defaultValue, value } = useUtil(
    name,
  );

    return (
      <>
       <TextInput
        defaultValue={defaultValue}
        value={value}
        onChangeText={setValue}
       />
      </>
    )
  }

  export {Input}

  //App Component

  import React, {useRef} from 'react';
  import {Pressable, Text} from 'react-native';

  import Form, {IFormFunctions} from 'goform';
  import { Input } from './input';

  const App = () => {
    const formRef = useRef<IFormFunctions>(null)

    const handleSubmit = (data) => {
      console.log(data)//{email: '...', password: '...'}
    }

    return (
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="email" />
        <Input name="password" />

        <Pressable onPress={formRef.current?.handleSubmit()}>
          <Text>Enviar</Text>
        </Pressable>
      </Form>
    )
  };

  export default App;
```


## :star: complex example ##

```tsx
  // styled components
  import styled, {css} from 'styled-components/native';

  interface IPropInput{
    isErrored: boolean;
    isFocused: boolean;
  }

  export const Container = styled.View<IPropInput>`
    background-color: #999;
    border-width: 2px;
    border-color: #999;

    ${props =>
      props.isErrored &&
      css`
        border-color: #c53030;
      `}

    ${props =>
      props.isFocused &&
      css`
        border-color: #fff;
      `}
  `;


  // Input component
  import React from 'react';
  import { useUtil } from 'goForm/utils';

  import { Container } from './styles';

  const Input = ({name}) => {
    const [isFocused, setIsFocused] = useState(false);

    const { setValue, error, defaultValue, clearFieldError, value } = useUtil(
    name,
    );

    const handleInputFocus = useCallback(() => {
    if (error) clearFieldError();
    setIsFocused(true);
  }, [error, clearFieldError]);

     const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    }, []);

    return (
      <Container isFocused={isFocused} isErrored={!!error}>
        <TextInput
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          value={value}
          onChangeText={setValue}
        />
      </Container>
    )
  }

  export {Input}

  //App Component

  import React, {useRef} from 'react';
  import {Pressable, Text} from 'react-native';

  import Form, { IFormFunctions,Group } from 'goform';
  import { Input } from './input';

  const App = () => {
    const formRef = useRef<IFormFunctions>(null)

    const handleSubmit = (data) => {
      console.log(data) //Result below
      // {
      //   name: '...',
      //   email: '...',
      //   password: '...',
      //   address: [
      //     {
      //       road: '...',
      //       district: '...',
      //       city: '...',
      //       state: '...'
      //     },
      //     {
      //       road: '...',
      //       district: '...',
      //       city: '...',
      //       state: '...'
      //     }
      //   ],
      //   profile: {
      //     username: '...',
      //     description: '...',
      //     phone: '...'
      //   }
      // }
    }

    return (
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="name" />
        <Input name="email" />
        <Input name="password" />

        <Group groupName="address[0]">
          <Input name="road" />
          <Input name="district" />
          <Input name="city" />
          <Input name="state" />
        </Group>

        <Group groupName="address[1]">
          <Input name="road" />
          <Input name="district" />
          <Input name="city" />
          <Input name="state" />
        </Group>


        <Group groupName="profile">
          <Input name="username" />
          <Input name="description" />
          <Input name="phone" />
        </Group>


        <Pressable onPress={formRef.current?.handleSubmit()}>
          <Text>Enviar</Text>
        </Pressable>
      </Form>
    )
  };

  export default App;
```


## :star: Complex example with steps ##

```tsx
  //getValidationErrors
  import { ValidationError } from 'yup';

  interface Errors {
    [key: string]: string;
  }

  export default function getValidationErrors(err: ValidationError): Errors {
    const validationErrors: Errors = {};

    err.inner.forEach(error => {
      validationErrors[error.path] = error.message;
    });

    return validationErrors;
  }


  // styled components
  import styled, {css} from 'styled-components/native';

  interface IPropInput{
    isErrored: boolean;
    isFocused: boolean;
  }

  export const Container = styled.View<IPropInput>`
    background-color: #999;
    border-width: 2px;
    border-color: #999;

    ${props =>
      props.isErrored &&
      css`
        border-color: #c53030;
      `}

    ${props =>
      props.isFocused &&
      css`
        border-color: #fff;
      `}
  `;


  // Input component
  import React from 'react';
  import { useUtil } from 'goForm/utils';

  import { Container } from './styles';

  const Input = ({name}) => {
    const [isFocused, setIsFocused] = useState(false);

    const { setValue, error, defaultValue, clearFieldError, value } = useUtil(
    name,
    );

    const handleInputFocus = useCallback(() => {
    if (error) clearFieldError();
    setIsFocused(true);
  }, [error, clearFieldError]);

     const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    }, []);

    return (
      <Container isFocused={isFocused} isErrored={!!error}>
        <TextInput
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          value={value}
          onChangeText={setValue}
        />
      </Container>
    )
  }

  export {Input}


  //Page 01
  import {Pressable, Text} from 'react-native';
  import * as Yup from 'yup';
  import { useForm } from 'goform';
  import getValidationErrors from './getValidationErrors';

  interface IFormProps {
    name: string;
    email: string;
    password: string;
  }

  const Page01 = () => {
    const { nextPage, getData, setErrors } = useForm();

    async function handleNextPage(){
      try {
        const data = getData<IFormProps>();

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().required(),
          password: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        nextPage();

      catch(err){
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setErrors(errors);
        }
      }
    }

    return (
      <>
        <Input name="name" />
        <Input name="email" />
        <Input name="password" />

        <Pressable onPress={handleNextPage}>
          <Text>Next</Text>
        </Pressable>
      </>
    )
  }

  export default Page01;



  //Page 02
  import {Pressable, Text} from 'react-native';
  import * as Yup from 'yup';
  import { useForm, Group } from 'goform';
  import getValidationErrors from './getValidationErrors';

  interface IFormProps {
    name: string;
    email: string;
    password: string;
  }

  const Page01 = () => {
    const {proviousPage, getData, setErrors } = useForm();

    async function handleFinish(){
      try {
        const data = getData<IFormProps>();

        const schema = Yup.object().shape({
          profile: Yup.object().shape({
            username: Yup.string().required(),
            phone: Yup.string().required(),
        }),
        address: Yup.array().of(
          Yup.object().shape({
            city: Yup.string().required(),
            state: Yup.string().required(),
          }),
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //Here it can be any action you want.

      catch(err){
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setErrors(errors);
        }
      }
    }

    return (
      <>
        <Group groupName="address[0]">
          <Input name="city" />
          <Input name="state" />
        </Group>

        <Group groupName="address[1]">
          <Input name="city" />
          <Input name="state" />
        </Group>


        <Group groupName="profile">
          <Input name="username" />
          <Input name="phone" />
        </Group>

        <Pressable onPress={handleFinish}>
          <Text>Submit</Text>
        </Pressable>

        <Pressable onPress={proviousPage}>
          <Text>Previous page</Text>
        </Pressable>
      </>
    )
  }

  export default Page02;



  //App Component
  import React, {useRef} from 'react';

  import Form, { IFormFunctions } from 'goform';

  import Page01 from './page01';
  import Page02 from './page02';

  const App = () => {
    const formRef = useRef<IFormFunctions>(null)

    return (
      //To enable paging in the form, pass multiStep in the Form component
      <Form ref={formRef} style={{flex: 1}} multiStep>
        <Page01 />
        <Page02 />
      </Form>
    )
  };

  export default App;
```

## :rocket: Technology ##

The following tools were used in the construction of the project:

- [Node.js](https://nodejs.org/en/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Dot Object](https://www.npmjs.com/package/dot-object)

## :memo: License ##


This project is under MIT license. See the archive [LICENSE](LICENSE.md) for more details.


Done with :heart: per <a href="https://github.com/goform" target="_blank">Mateus Conceição</a>

&#xa0;

<a href="#top">Back to the top
</a>
