import axios from 'axios' 
import { useFormik } from 'formik';
import styled from 'styled-components';
import react from 'react'
import { useMutation } from 'react-query';
import { api } from '../../api/api';
import { toast } from 'react-toastify'
import { AxiosError } from 'axios';

type RegistrationVm = {
    username: string, 
    email: string, 
    password: string, 
    confirmPassword: string 
  }

function RegistrationPage(){

    const initialValues: RegistrationVm = {
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    };

    const register = useMutation(
      api.account.register, 
      {
        onSuccess: (response) => {
          if(response.isSuccessful){
            toast("Registered")
          }
          else{
            var errors = response.errors as Array<string>
            errors.forEach(error => toast(error))
          }
        },
      
        onError: (error: AxiosError) => {
          toast(error.response?.data.Errors)
        },
      }
    )

    const registrationForm = useFormik({
        initialValues: initialValues,
        onSubmit: (values) =>
          register.mutate(values)
      })

    return(
        <StyledForm onSubmit={registrationForm.handleSubmit}>

          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            placeholder="Username" 
            onChange={registrationForm.handleChange}
            value={registrationForm.values.username} />

          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            name="email" 
            type="text" 
            placeholder="email"
            onChange={registrationForm.handleChange}
            value={registrationForm.values.email} />

          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Password"
            onChange={registrationForm.handleChange}
            value={registrationForm.values.password} />

          <label htmlFor="confirmPassword">Repeat password</label>
          <input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            placeholder="Confirm password"
            onChange={registrationForm.handleChange}
            value={registrationForm.values.confirmPassword} />

          <button type="submit">Submit</button>
        </StyledForm>);
}

const StyledForm = styled.form`
  display: flex;  
  flex-direction: column;
  width: 200px
` 

export { RegistrationPage };