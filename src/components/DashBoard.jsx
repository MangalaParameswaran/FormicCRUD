import React, { useEffect, useState } from 'react'
import Card from './Card'
import  Table  from 'react-bootstrap/Table'
import  Button  from 'react-bootstrap/Button'
import User from './User'
import { useNavigate } from 'react-router-dom'
import axioService from '../Utils/Apiservices'


function DashBoard() {
  let [user,setUser]=useState([])
  let navigate=useNavigate()
    let data=[{
        title:"EARNINGS (MONTHLY)",
        value:"$45,000",
        color:'primary',
        icon:'fa-calendar',
        isProgress:false
    },
    {
        title:"EARNINGS (ANNUAL)",
        value:"$215,000",
        color:'success',
        icon:'fa-dollar-sign',
        isProgress:false
    },
    {
        title:"TASKS",
        value:"20",
        color:'info',
        icon:'fa-clipboard-list',
        isProgress:true
    },
    {
        title:"PENDING REQUEST",
        value:"18",
        color:'warning',
        icon:'fa-comments',
        isProgress:false
    }]

    let handleDelete=async(id)=>{
      try {
        let res=await axioService.delete(`/user/${id}`)
        if(res.status===200){
          getData()
        }
      } catch (error) {
        alert("error")
        
      }
      
        
    }

let getData=async()=>{
 try {
  let res=await axioService.get('/user')
  if(res.status===200){
    setUser(res.data)
  }
  
 } catch (error) {
  alert("Error")
  
 }
}

useEffect(()=>{
  getData()
},[])


  return <div id="content-wrapper" className="d-flex flex-column">
  <div id="content">
  <div className="container-fluid">

<div className="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>    
</div>
<div className="row">
    {
        data.map((data,i)=>{
            return <Card  cardData={data} key={i}/>
        })
    }

  </div>
  <div className="row">
  <Table striped bordered hover>
      <thead>
        <tr style={{textAlign:'center'}}>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>ISB number</th>
          <th>Publication Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {
        user.map((e,i)=>{
            return <tr key={e.id} style={{textAlign:'center'}}>
            <td>{i+1}</td>
            <td>{e.book.title}</td>
            <td>{e.book.author}</td>
            <td>{e.book.ISBN}</td>
            <td>{e.book.pub}</td>
            <td>
            <Button variant="primary" onClick={()=>navigate (`/edit-user/${e.id}`)}>Edit</Button>
            &nbsp;
            &nbsp;
      <Button variant="danger" onClick={()=>{handleDelete(e.id)}}>Delete</Button>
      {/* {console.log(e.id)} */}
            </td>
            
          </tr>
  
        })
       }
      </tbody>
    </Table> 
   <div className="row">
    <Table striped bordered hover>
    <thead>
        <tr style={{textAlign:'center'}}>
          <th>#</th>
          <th>Author Name</th>
          <th>DOB</th>
          <th>Biography</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {
        user.map((e,i)=>{
            return <tr key={e.id}  style={{textAlign:'center'}}>
            <td>{i+1}</td>
            <td>{e.auther.name}</td>
            <td>{e.auther.birth}</td>
            <td>{e.auther.bio}</td>
            <td>
            <Button variant="primary" onClick={()=>navigate (`/edit-user/${e.id}`)}>Edit</Button>
            &nbsp;
            &nbsp;
      <Button variant="danger" onClick={()=>{handleDelete(e.id)}}>Delete</Button>
      {/* {console.log(e.id)} */}
            </td>
            
          </tr>
  
        })
       }
      </tbody>


    </Table>
    
   </div>


  </div> 
  </div>
</div> 
</div>  

}

export default DashBoard