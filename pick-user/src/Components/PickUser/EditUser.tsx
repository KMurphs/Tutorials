import React from 'react';
import './PickUser.css';
import { UserLink } from './PickUser';
import { useLink } from '../../hooks';
import UserList from './UserList';
import DelayedInput from './DelayedInput';


type Props = {
  $currentUser: UserLink
  onClose: ()=>void
}
const EditUser: React.FC<Props> = ({$currentUser, onClose}) => {

  const $filter = useLink<string>('')
  
  return (
    <>
      <DelayedInput $value={$filter} onBlur={onClose}/>

      {
        $filter.value
        ? <UserList filter={$filter.value} $selected={$currentUser}/>
        : void 0
      }
    </>
  )
}

export default EditUser;