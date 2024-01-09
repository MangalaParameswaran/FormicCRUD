import React, { useState } from 'react'
import DashBoard from './components/DashBoard'
import SideBar from './components/SideBar'
import Class from './components/Class'
import User from './components/User'
import Money from './components/Money'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'


function App() {
  let [user, setUser]=useState([{
    id:1,
    name:"Magi",
    email:'magi@gmail.com',
    num:'980765432',
    batch:'B53'
  },
  {
    id:2,
    name:"Kanchana",
    email:'kanchana@gmail.com',
    num:'980765432',
    batch:'B53'
  },
  {
    id:3,
    name:"Begam",
    email:'baby@gmail.com',
    num:'980765432',
    batch:'B53'
  },
  {
    id:4,
    name:"Mani",
    email:'mani@gmail.com',
    num:'980765432',
    batch:'B53'
  }
])
  return <>
  <div id="wrapper">
  <BrowserRouter>
  <SideBar/>
  <Routes>
    <Route path='/dashboard' element={<DashBoard user={user} setUser={setUser} />} />
    <Route path='/add-user' element={<AddUser user={user} setUser={setUser}/>}/>
    <Route path='/edit-user/:id' element={<EditUser user={user} setUser={setUser}/>} />
    <Route path='/user' element={<User/>} />
    <Route path='/class' element={<Class/>} />
    <Route path='/money' element={<Money/>} />
    <Route path='*' element={<Navigate to='/dashboard'/> }/>

  </Routes>
  </BrowserRouter>
  </div>
  </>
}

export default App