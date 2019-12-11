import React from 'react';
import './App.css';
import PickUser, {  TUser } from './Components/PickUser/PickUser';
import { useLink } from './hooks';

const App: React.FC = () => {
  const $selectedUser = useLink<TUser>({id: 0, name: 'stephane', email: 'kibongesp@gmail.com'})
  return (
    <div className="App">
      <PickUser $selectedUser={$selectedUser}/>
    </div>
  );
}

export default App;
