import React, { useContext, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

import { FormContext } from '../createContext';

interface IGroupProps {
  /**
   * groupName accepts a string
   *
   * groupName="value" to create an object
   *
   * groupName="value[0]" to create an array
   * groupName="value[1] to create the second object of array value[0] */
  groupName: string;
  children: ReactNode;
  style?: ViewStyle;
}

const Group: React.FC<IGroupProps> = ({ groupName, children, style }) => {
  const { group, ...form } = useContext(FormContext);

  return (
    <View style={style}>
      <FormContext.Provider
        value={{
          ...form,
          group: `${group.concat(group ? `.${groupName}` : `${groupName}`)}`,
        }}
      >
        {children}
      </FormContext.Provider>
    </View>
  );
};

export { Group };
