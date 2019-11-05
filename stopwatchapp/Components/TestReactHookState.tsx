import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';



export default function TestReactHookState(){
  const [count, setCount] = useState(0);
  
  return(
    <View>
      <Text style={{color: 'white'}}>You clicked {count} times.</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me"
        color="red"
        accessibilityLabel="Click this button to increase count"
      />
    </View>
  )

}
