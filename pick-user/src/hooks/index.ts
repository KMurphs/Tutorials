import { useState, useEffect, useRef } from 'react';

// function useLink<T>(initialValue: T) {
export const useLink = <T extends unknown>(initialValue: T) => {
  const [value, set] = useState<T>(initialValue);
  // It can be a class with useful methods, like this one:
  // https://github.com/VoliJS/NestedLink/blob/master/valuelink/src/link.ts
  // But we just use the plain object here to illustrate an idea.
  // console.trace(initialValue, value)
  return {value, set};
}
  
  
  
  
  
  
export const useBoundLink = (source: any):{ value: any, set: (value: any)=>void} => {
  
  // If the source is another Link, extract the value out of it.
  const boundValue = source.value === undefined || source.set === undefined ? source : source.value
  const {value, set} = useLink( boundValue );
  
  // If the value changes, execute link.set( value ) after the render.
  useEffect(() => set( boundValue ), [ boundValue ]);
  
  return {value, set};
}
  
  
  
  
// Executes a function now and delays another by timeout in millis
export const useThrottle = <F extends (...args: any[])=>void>(immediateFn: F, futureFn : F, timeout : number, changes: any[] ) : {throttleHandler:F} => {
  
  // Create the ref to store timer.
  const timer = useRef<NodeJS.Timeout|null>( null );
  
  // Support function to clear timer 
  const cancel = () => {
    if( timer.current ){
        clearTimeout( timer.current );
        timer.current = null;
    }
  }
  
  
  // if the changes array changes, reset the timer
  useEffect( () => cancel, changes );
  
  
  // Function to be returned
  const throttleHandler = function(...args: any[]){
  
    // Immediate Actions
    immediateFn(...args); // Call immediate action
    cancel();             // Reset timer
  
    // Delayed Actions
    timer.current = setTimeout(function(){
        timer.current = null; // Timer has performed its intended function, forget it 
        futureFn(...args);    // Call future action
    }, timeout );
  
  }
  return {throttleHandler: throttleHandler as F} 
}
  
  
  
  
// useEffect( whenDidMount, [] ) behaves as componentDidMount, 
// and it’s cleanup effect as a componentWillUnmount.
export const useIsMountedRef = () => {
  
  // We need something similar to the plain mutable class member.
  const isMounted = useRef( true );
  
  // And, we need something similar to componentWillUnmount.
  useEffect( () => {
    // Whatever we return is a cleanup effect.
    return () => { // <- componentWillUnmount
      isMounted.current = false
    }
  }, []); // [] never changes, so the "cleanup" function will be fired on unmount only.
  
  return isMounted;
}
  
  
  
  
// All asynchronous state updates from I/O functions must be guarded against 
// possible component unmount.
export const useSafeLink = <T extends unknown>(initialState: T) => {
  const $value = useLink<T>( initialState )
  const isMounted = useIsMountedRef();
  const { set } = $value;
  
  $value.set = x => isMounted.current && set( x );

  return $value;
}
  
  
  
// useIO will return true when the promise is resolved, and false otherwise
export const useIO = ( fn: (...args: any[])=>any, conditions: any[] ):number => {
  // Counter of open I/O requests. If it's 0, I/O is completed.
  // Counter is needed to handle the situation when the next request
  // is issued before the previous one was completed.
  const {value, set} = useSafeLink<number|null>( null );
  
  useEffect(()=>{
    // function in set instead of value to avoid race conditions with counter increment.
    set( (x) => ( x || 0 ) + 1 );
  
    fn().finally(() => set( (x) => ( x || 1 ) - 1 ));
  }, conditions);
  
  // null is used to detect the first render when no requests issued yet
  // but the I/O is not completed.
  return value === null ? 1 : value;
}
  