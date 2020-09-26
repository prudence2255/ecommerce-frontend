import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {login} from 'store/admin/adminActions';
import {useRouter} from 'next/router';
import { unwrapResult } from '@reduxjs/toolkit';
import {GridLoader} from 'components/loaders'; 
import {wrapper} from 'store/store';
import Cookies from 'universal-cookie';
import {ShowError} from 'components/alerts';
import {errorsSelector} from 'store/admin/errorsSlice'
 
const cookies = new Cookies();




const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login(){
  const { error} = useSelector(errorsSelector);
  const dispatch = useDispatch();
  const router = useRouter()
 useEffect(() => {
if(cookies.get('token')) router.push('/admin-dashboard')
   return () => {
   }
 }, [dispatch])
 
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })
  const submit = (data) => {
     dispatch(login(data)).then(unwrapResult)
     .then( () => {
      if(cookies.get('token')) router.push('/admin-dashboard')
     })
     .catch(e => e.message)
  };
    return (
        <>
        {error && (
          <ShowError />
        )}
         <div className={`form`}>
          <div className="card">
         <div className="card-header site-title">
          <h5 className=" text-center">mysite.com</h5>
        </div>
    <div className="card-body">
    <GridLoader />
<form className="w3-card-2" onSubmit={handleSubmit(submit)}>
  <div className="box">
    <label htmlFor="email"><b>Email</b></label>
    <input type="email" placeholder="Enter Email" name="email"  ref={register}/>
    <p className="error">{errors.email?.message}</p>
    <label htmlFor="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" ref={register}/>
    <p className="error">{errors.password?.message}</p>
    <button type="submit">Login</button>
    <label>
      <input type="checkbox" defaultChecked="checked" name="remember" ref={register}/> Remember me
    </label>
    <span className="psw">Forgot <a href="#">password?</a></span>
  </div>  
</form>
 
     </div>
        </div>
</div>
<style jsx>
    {`
.form{
  display:flex;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  justify-content: center;
  align-items: center;
  background: #E6E6FA;
}
.site-title{
  background:  #228B22;
  color: white;
  text-align: center;
  padding: 5px;
}
input[type=email], input[type=password] {
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}


button:hover {
  opacity: 0.8;
}



.box {
  padding: 16px;
}


span.psw {
  float: right;
  padding-top: 16px;
}

@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
  form{
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  
  form{
    width: 100%;
  }
}
 `}
</style>

        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
  }
)