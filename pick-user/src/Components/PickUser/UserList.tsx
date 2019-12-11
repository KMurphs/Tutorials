import React from 'react';
import './PickUser.css';
import { userToString, useSafeLink, useIO, TUser } from './PickUser';




type Props = {
  filter: string,
  $selected: any,
}
const UserList: React.FC<Props> = ({filter, $selected}) => {
  
  // $users might be modified by the async fetching function after the component is unmounted.
  // We need to prevent the exception that would happen in that case
  const $users = useSafeLink<TUser[]>([]);

  


  // It's useful to know if there's an I/O pending. Another custom hook.
  const ioComplete = useIO( async () => {
    // This thing can happen after unmount.
    $users.set( await fetchUsers( filter ) );
  }, [ filter ]);

  console.log(ioComplete, $users)
  return (
    <ul className="users-suggestions">
      { 
        !ioComplete 
        ? $users.value.map( user => (
            <li key={user.id}
                className={ $selected.value && $selected.value.id === user.id ? 'selected' : '' }
                onMouseDown={ () => $selected.set( user ) }>
              { userToString( user ) }
            </li>
          )) 
        : <li>Loading...</li> 
      }
    </ul>
  )
}

export default UserList;



const fetchUsers = (like: string)=>{
  return new Promise<TUser[]>(resolve => {
    setTimeout(()=>{
      let nUsers = Math.floor(10 + 5*Math.random());
      let users: TUser[] = []
      while(nUsers > 0){
        users.push({
          id: Math.floor(1000*Math.random()),
          name: buildString(7),
          email: `${buildString(5 + 5*Math.random())}@${buildString(3)}.com`
        })
        nUsers--;
      }
      console.log('Resolving users: ', users)
      resolve(users)
    }, 1000)
  })
}





export const buildString = (len:number) => {
  let str = ''; 
  const letters: string = 'abcdefghijklmnopqrstuvwxyz';
  let alph = letters.split(''); 
  while(len>0) {
    str += alph[Math.floor(26*Math.random())]
    len--;
  }; 
  return str
}
console.log(buildString(10))