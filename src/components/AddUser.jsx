import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axioService from '../Utils/Apiservices';
import { useNavigate } from 'react-router-dom';


function AddUser() {
  let navigate=useNavigate()
  let formik=useFormik({
    initialValues:{
      book:{
        title:'',
        author:'',
        ISBN:'',
        pub:''
      },
      auther:{
        name:'',
        birth:'',
        bio:''
      }
    },
    validationSchema: Yup.object().shape({
      book:Yup.object().shape({
        title:Yup.string().required('Title is Required'),
        author:Yup.string().required('Author Name is Required'),
        ISBN:Yup.string().required('ISBN Number is required').matches(/^\d{6}$/, 'Enter a valid ISBN Number'),
        pub:Yup.date().required('Date is Required')
      }),
      auther:Yup.object().shape({
        name:Yup.string().required("Authors name is required"),
        birth:Yup.string().required('BirthDate is Required'),
        bio:Yup.string().required('Biography is required')
      })
    }),
    onSubmit:async(values)=>{
      try {
        let res= await axioService.post('/user',values)
        if(res.status===201){
          navigate('/dashboard')
        }
        
      } catch (error) {
      }

    }
  })
    
  return <div id="content-wrapper" className="d-flex flex-column">
  <div id="content">
  <div className="container-fluid">
  <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    {/* <h1 className="h3 mb-0 text-gray-800">Add User</h1> */}
                </div>
  <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label style={{display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'1.5em'}}>Books Details</Form.Label>
        <hr/>
        <Form.Control type="text" placeholder="Book Title" id='title' name='book.title' onChange={formik.handleChange} value={formik.values.book.title} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
          {formik.touched.book?.title && formik.errors.book?.title ? (<div style={{color:"red"}}>{formik.errors.book.title}</div>) : null}

        <Form.Control type='text' placeholder='Book Author' id='auther' name='book.author' onChange={formik.handleChange} value={formik.values.book.author} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
         {formik.touched.book?.author && formik.errors.book?.author ? (<div style={{color:"red"}}>{formik.errors.book.author}</div>) : null}

        <Form.Control type='text' placeholder='ISBN number' id='ISBN' name='book.ISBN' onChange={formik.handleChange} value={formik.values.book.ISBN} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
          {formik.touched.book?.ISBN && formik.errors.book?.ISBN ? (<div style={{color:"red"}}>{formik.errors.book.ISBN}</div>) : null}

        <Form.Control type='date' placeholder='Publication Date' id='pub' name='book.pub' onChange={formik.handleChange} value={formik.values.book.pub} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
         {formik.touched.book?.pub && formik.errors.book?.pub ? (<div style={{color:"red"}}>{formik.errors.book.pub}</div>) : null}


      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'1.5em'}}>Author Details</Form.Label>
        <Form.Control type='text' placeholder='Author Name' id='author-name' name='auther.name' onChange={formik.handleChange} value={formik.values.auther.name} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
          {formik.touched.auther?.name && formik.errors.auther?.name ? (<div style={{color:"red"}}>{formik.errors.auther.name}</div>) : null}

        <Form.Control type='text' placeholder='Date Of Birth' id='birth' name='auther.birth' onChange={formik.handleChange} value={formik.values.auther.birth} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
          {formik.touched.auther?.birth && formik.errors.auther?.birth ? (<div style={{color:"red"}}>{formik.errors.auther.birth}</div>) : null}

           <Form.Control type='text' placeholder='A Short Biography' id='bio' name='auther.bio' onChange={formik.handleChange} value={formik.values.auther.bio} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
             {formik.touched.auther?.bio && formik.errors.auther?.bio ? (<div style={{color:"red"}}>{formik.errors.auther.bio}</div>) : null}

      </Form.Group>
      <div style={{display:'flex',justifyContent:'center', margin:'1em'}}>
      <Button variant="danger" type='submit' style={{fontWeight:'bold'}}>
        Submit
      </Button>
      </div>
     
    
   </Form>   

  </div>
  </div>
  </div>
}

export default AddUser