import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    } else if (value === 'waffle@syrup.com' ){
        error = 'That email is already taken.';
    }
    return error;
  }

 
  function validateName(value) {
    let error;
    if (value === 'admin') {
      error = 'Nice try! You may not use admin';
    }
    return error;
  }



const UserForm = ({ errors, touched, values, status }) => {
    const [user, setUser] = useState([])
   
    useEffect(() => {
        status && 
        setUser(users => [
            ...users, 
            status
        ])
    }, [status])
    
    return (
        <div className="formWrapper">
            <Form className="userForm">

                <h1>User Login</h1> 
                <Field type="text" name="name" placeholder="Name" value={values.name} validate={validateName}/>
                {errors.name && touched.name && <div>{errors.name}</div>}

                <Field type="text" name="email" placeholder="Email" value={values.email} validate={validateEmail}/>
                {errors.email && touched.email && <div>{errors.email}</div>}

                <div className="roleWrapper">
                <label className="roleDropdown" htmlFor="select" ><p>Role: </p></label>
                <Field as="select" name="role" placeholder="Select a Role Below">
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Manager">Manager</option>
                    <option value="Other">Other</option>
                 </Field>
                 </div>
                 
                <Field type="text" name="password" placeholder="Password"  value={values.password}/>

                
                    <div className="checkBoxWrapper">
                    <Field type="checkbox" name="terms" />
                    <label className="termsCheckbox" htmlFor="checkbox" ><p>Agree to Terms</p></label>
                    </div>

                <button type="submit">Submit</button>
            </Form>
            {
                user.map(user => (
                    <ul>
                        <li>Name: {user.name}, {user.role}</li>
                    </ul>
                ))
            }
        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({ user }) {
        return {
            name: "", 
            email: "",
            password: "",
            terms: false,

        };
    }, 
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name Required'),
        email: Yup.string().required('Please enter a valid email address'),
        role: Yup.string(),
        password: Yup.string().required('Password Required'),
        terms: Yup.bool('true').required('Must Agree to Terms')

    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log('submitting form:', values);
        axios.post
        ("https://reqres.in/api/users", values)

        .then( res => {
            console.log('Success:', res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => {
            console.log('Error:', err.response);
        });
    }

})(UserForm);


export default FormikUserForm;

