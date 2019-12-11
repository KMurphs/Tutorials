import React from 'react';
import { useBoundLink, useThrottle } from './PickUser';

type Props = {
  $value: {value: string, set: (value: string)=>void};
  onBlur: ()=>void;
  timeoutMs?: number;
  placeholder?: string;
  autoFocus?: boolean;
}



const DelayedInput: React.FC<Props> = ({$value, timeoutMs = 1000, ...props}) => {

  // Get a one way synchronized link with useBoundLink and a throttle function to handle immediate and delay actions on input chnage event
  const {set: $link_set, value: link_value, throttleHandler: inputOnChange} = {
    ...useBoundLink( 
      $value 
    ), 
    ...useThrottle(
      (newInputValue: string) => $link_set(newInputValue),
      (newInputValue: string) => $value.set(newInputValue),
      timeoutMs,
      [$value.value]
    )
  }


  console.log(link_value)
  // TODO: How to sync the state back?
  return (
    <input value={link_value} {...props} onChange={(evt => inputOnChange(evt.target.value))}/>
  )
}


DelayedInput.defaultProps = {
  placeholder: "Start typing...",
  autoFocus: true,
  timeoutMs: 1000
}

export default DelayedInput;



