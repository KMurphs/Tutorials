import { createStore } from 'redux';

/*/************************
     PART 1: SETTING UP
/**************************/

const reducer = (state = 0, action) => {
  console.log(action);

  switch(action.type) {
    case 'ADD':
      return state + action.payload.value;
    case 'SUBTRACT':
      return state - action.payload.value;
    case 'RESET':
      return 0;
    case 'LOAD':
      return action.payload.value;
    default:
      return state;
  }
};

const store = createStore(reducer);

/*/************************
  PART 2: UTILITY METHODS
/**************************/

/**
 * Gets the value of the input field
 *
 * @return {Number} Value of the input field
 */
const getValue = () => {
  const value = parseInt(document.getElementById('op-number').value);
  return isNaN(value) ? 0 : value;
};

/**
 * Sets the total value as returned by the store
 */
const setTotal = value => {
  document.getElementById('grand-total').innerHTML = value;
};
/**
 * Sets the total value as returned by the store
 */
const setTotalCopy = value => {
  document.getElementById('grand-total-copy').innerHTML = value + `${value > 0 ? ' - You\'re doing gooood man': ' - Danger! Your Store is in the Negative'}`;
};

/*/************************
  PART 3: ACTION CREATORS
/**************************/

/**
 * Action Creator. Returns an action of the type 'ADD'
 */
const add = () => ({
  type: 'ADD',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'SUBTRACT '
 */
const subtract = () => ({
  type: 'SUBTRACT',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'LOAD'
 */
const load = () => ({
  type: 'LOAD',
  payload: { value: getValue() },
});

/**
 * Action Creator. Returns an action of the type 'RESET'
 */
const reset = () => ({ type: 'RESET' });

/*/************************
  PART 4: HOOK BEHAVIOR
/**************************/

// Subscribe to updates
store.subscribe(() => {
  setTotal(store.getState());
});
// Subscribe to updates
store.subscribe(() => {
  setTotalCopy(store.getState());
});

// Update Store Value every 100ms
setInterval(()=>{
	document.querySelector('#grand-total-time-updated').innerHTML = `<span>${(new Date()).toString()}<br>Current Store Value<br>${store.getState()}</span>`
}, 1000)



// Handle add button click
document.getElementById('add-btn').addEventListener('click', () => {
  store.dispatch(add());
});

// Handle subtract button click
document.getElementById('subtract-btn').addEventListener('click', () => {
  store.dispatch(subtract());
});

// Handle reset button click
document.getElementById('reset-btn').addEventListener('click', () => {
  store.dispatch(reset());
});

// Handle load button click
document.getElementById('load-btn').addEventListener('click', () => {
  store.dispatch(load());
});

