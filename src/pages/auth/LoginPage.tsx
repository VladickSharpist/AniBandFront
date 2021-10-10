import react from 'react'
import {useCookies} from 'react-cookie'
import { withCookies } from 'react-cookie';
import axios, { AxiosError } from 'axios'   
import { useMutation } from 'react-query';
import { api } from '../../api/api';
import { openRouteHome } from '../../routes';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { useAuthState } from '../../hooks/useAuthState';

const LoginPage = () => {

    const REFRESH_TOKEN = 'refresh_token'
    const ACCESS_TOKEN = 'access_token'
    const user = useAuthState()
    const [cookies, setCookie] = useCookies()

     const initialValues = {
         email: '',
         password: ''
     }

     const login = useMutation(
        api.account.login, 
        {
          onSuccess: (response) => {
            if(response.isSuccessful){
                refresh.mutate(response.data.refreshToken)
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

      const refresh = useMutation(
          api.account.refresh,
          {
              onSuccess: (response) => {
                  if(response.isSuccessful){
                    user.login(response.data)
                    openRouteHome()
                  } else {
                    var errors = response.errors as Array<string>
                    errors.forEach(error => toast(error))
                  }
              }, 

              onError: (error: AxiosError) => {
                toast(error.response?.data.Errors)
              },
          }
      )

      const loginForm = useFormik({
        initialValues: initialValues,
        onSubmit: (values) =>
            login.mutate(values)
      })

    return(
        <StyledForm onSubmit={loginForm.handleSubmit}>

          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            name="email" 
            type="text" 
            placeholder="email"
            onChange={loginForm.handleChange}
            value={loginForm.values.email} />

          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Password"
            onChange={loginForm.handleChange}
            value={loginForm.values.password} />

          <button type="submit">Submit</button>
        </StyledForm>
        );
}

const StyledForm = styled.form`
  display: flex;  
  flex-direction: column;
  width: 200px
` 

export default withCookies(LoginPage)