import React,{useState,useEffect} from 'react'
import  Button  from 'react-bootstrap/Button'
import  Form  from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axioService from '../Utils/Apiservices';

function EditUser() {
  let navigate=useNavigate()
  let params=useParams()//this will retur a object
let [initialValuesMap,setValues]=useState({
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
})
const getUserData=async()=>{
  let {id}=params;
  // console.log(id);
  try {
    let res=await axioService.get(`/user/${id}`)
    // console.log(res.data);
    if(res.status===200){
      // console.log(res.data.auther.bio);
      setValues({
        book:{
          title:res.data.book.title,
          author:res.data.book.author,
          ISBN:res.data.book.ISBN,
          pub: new Date(res.data.book.pub).toISOString().split('T')[0]  // Format the date

        },
        auther:{
          name:res.data.auther.name,
          birth:res.data.auther.birth,
          bio:res.data.auther.bio

        }
      })
    }
    
  } catch (error) {
    alert("error")
    
  }
}
  let formik=useFormik({
    initialValues:initialValuesMap,
    validationSchema: Yup.object({
      book:Yup.object({
        title:Yup.string().required('Title is Required'),
        author:Yup.string().required('Author Name is Required'),
        ISBN:Yup.string().required('ISBN Number is required').matches(/^\d{6}$/, 'Enter a valid ISBN Number'),
        pub:Yup.date().required('Date is Required')
      }),
      auther:Yup.object({
        name:Yup.string().required("Authors name is required"),
        birth:Yup.string().required('BirthDate is Required'),
        bio:Yup.string().required('Biography is required')
      })
    }),
    enableReinitialize:true,
    onSubmit:async(values)=>{
      let {id}=params;
      values.id=id;
      try {
        let res= await axioService.put(`/user/${id}`,values)
        if(res.status===200){
          navigate('/dashboard')
        }
        
      } catch (error) {

      }

    }
  })

  //useEffect - triggers before component rendering
  //useEffect without dependency array - triggers before component rendering and during state changes
  // useEffect(()=>{
  //   console.log("Use Effect Without Dependency Array")
  // })

    //useEffect with empty dependency array - triggers before component rendering only for first time
  // useEffect(()=>{
  //   console.log("Use Effect With Empty Dependency Array")
  // },[])

   //useEffect with dependancy array - triggers before component rendering and specified state changes
  // useEffect(()=>{
  //   console.log("Use Effect With Dependency Array")
  // },[batch,mobile])
  useEffect(()=>{
    getUserData()
  },[])



  return <div id="content-wrapper" className="d-flex flex-column">
  <div id="content">
      <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  {/* <h1 className="h3 mb-0 text-gray-800">Edit User</h1> */}
              </div>
              <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
      <hr/>
        <Form.Label style={{display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'1.5em'}}>Books Details</Form.Label>
        <hr/>
        <Form.Control type="text" placeholder="Book Title" id='title' name='book.title' onChange={formik.handleChange} value={formik.values.book.title} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}}/>
          {formik.touched.book?.title && formik.errors.book?.title ? (<div style={{color:"red"}}>{formik.errors.book.title}</div>) : null}

        <Form.Control type='text' placeholder='Book Author' id='author' name='book.author' onChange={formik.handleChange} value={formik.values.book.author} onBlur={formik.handleBlur}  style={{textAlign:'center', margin:'1em', fontStyle:'italic'}}/>
         {formik.touched.book?.author && formik.errors.book?.author ? (<div style={{color:"red"}}>{formik.errors.book.author}</div>) : null}

        <Form.Control type='text' placeholder='ISBN number' id='ISBN' name='book.ISBN' onChange={formik.handleChange} value={formik.values.book.ISBN} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
          {formik.touched.book?.ISBN && formik.errors.book?.ISBN ? (<div style={{color:"red"}}>{formik.errors.book.ISBN}</div>) : null}

        <Form.Control type='date' placeholder='Publication Date' id='pub' name='book.pub' onChange={formik.handleChange} value={formik.values.book.pub} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
         {formik.touched.book?.pub && formik.errors.book?.pub ? (<div style={{color:"red"}}>{formik.errors.book.pub}</div>) : null}


      </Form.Group>
      <Form.Group className="mb-3">
      <hr/>
        <Form.Label style={{display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'1.5em'}}>Author Details</Form.Label>
        <hr/>

        <Form.Control type='text' placeholder='Author Name' id='author-name' name='auther.name' onChange={formik.handleChange} value={formik.values.auther.name} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
          {formik.touched.auther?.name && formik.errors.auther?.name ? (<div style={{color:"red"}}>{formik.errors.auther.name}</div>) : null}

        <Form.Control type='text' placeholder='Date Of Birth' id='birth' name='auther.birth' onChange={formik.handleChange} value={formik.values.auther.birth} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
          {formik.touched.auther?.birth && formik.errors.auther?.birth ? (<div style={{color:"red"}}>{formik.errors.auther.birth}</div>) : null}

           <Form.Control type='text' placeholder='A Short Biography' id='bio' name='auther.bio' onChange={formik.handleChange} value={formik.values.auther.bio} onBlur={formik.handleBlur} style={{textAlign:'center', margin:'1em', fontStyle:'italic'}} />
             {formik.touched.auther?.bio && formik.errors.auther?.bio ? (<div style={{color:"red"}}>{formik.errors.auther.bio}</div>) : null}

      </Form.Group>
      <div  style={{display:'flex',justifyContent:'center', margin:'1em'}}>
      <Button variant="danger" type='submit'  style={{fontWeight:'bold'}}>
        Submit
      </Button>
      </div>
    
   </Form>   

      </div>
  </div>
</div>
}

export default EditUser