import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import React, { useEffect, useState } from 'react';


// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [invites, setInvites] = useState([])

  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(json => {
      setUsers(json.data)
    }).catch((err) => {
      console.warn(err)
      alert("что-то пошло не так...")
    }).finally(() => setLoading(false))
  }, [])


  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onCLickInvite = (id) => {
    if (invites.includes(id)){
      setInvites(prev => prev.filter((_id) => _id != id))
    }else{
      setInvites(prev => [...prev, id])
    }
  }
  return (
    <div className="App">
      {success == false ? <Users setSuccess={setSuccess} invites={invites} onClickInvite={onCLickInvite} onChangeSearchValue={onChangeSearchValue} searchValue={searchValue} items={users} isLoading={isLoading} /> : <Success />} 
    </div>
  );
}

export default App;
