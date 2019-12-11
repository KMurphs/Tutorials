import React from 'react';
import './App.css';
import PickUser, { useLink, TUser } from './Components/PickUser/PickUser';

const App: React.FC = () => {
  const $selectedUser = useLink<TUser>({id: 0, name: 'stephane', email: 'kibongesp@gmail.com'})
  return (
    <div className="App">
      <PickUser $selectedUser={$selectedUser}/>
    </div>
  );
}

export default App;
