import React from 'react';
import './PickUser.css';
import EditUser from './EditUser';
import { useLink } from '../../hooks';

export interface TUser{
  id: number,
  name: string,
  email: string,
}

export type UserLink = {
  value: TUser,
  set: (user: TUser)=>void
}

type Props = {
  $selectedUser: UserLink
}
export const userToString = (user: TUser):string => `${user.name} <${user.email}>`

const PickUser: React.FC<Props> = ({$selectedUser}) => {
  
  const $editMode = useLink<boolean>(false)
   
  
  return (
    <div className="pick-user-container">
      {
        $editMode.value
        ? <EditUser $currentUser={$selectedUser} onClose={()=>$editMode.set(false)}/>
        : <input type="text" value={userToString($selectedUser.value)} onChange={()=>{}} onClick={(evt) => $editMode.set(true)}/>
      }
      
    </div>
  )
}

export default PickUser;






