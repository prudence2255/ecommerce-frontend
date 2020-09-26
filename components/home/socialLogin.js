import * as A from 'components/adminImports';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {socialLogin} from 'store/customer/customerActions';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const cookies = new A.Cookies();

const clientId = process.env.CLIENT_ID;
const appId = process.env.APP_ID;


  export const LoginGoogle = ({setLoginModal}) => {
    const dispatch = A.useDispatch();
    const router = A.useRouter();
    const responseGoogle = async(response) => {
        const res = {
            provider: 'google',
            token: response.accessToken
        };
    await dispatch(socialLogin({customer: res, url: '/api/login/google/callback'}))
    .then(A.unwrapResult)
        .then(() => {
          if(cookies.get('customer_token')){
            setLoginModal(false);
            router.push('/ad/account')
          }
        }).catch(e  => e.message)       
      }
    
      return(
          <>
          <GoogleLogin
          clientId={`${clientId}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        autoLoad={false}
        render={renderProps => (
          <GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled}/>
        )}
        
        />
          </>
      )
  }

export const LoginFacebook = ({setLoginModal}) => {
    const dispatch = A.useDispatch();
    const router = A.useRouter();
    const responseFacebook = async(response) => {
        const res = {
            provider: 'facebook',
            token: response.accessToken
        };
        await dispatch(socialLogin({customer: res, url: '/api/login/facebook/callback'}))
        .then(A.unwrapResult)
        .then(() => {
          if(cookies.get('customer_token')){
            router.push('/ad/account')
          }
          setLoginModal(false); 
        }).catch(e  => e.message)  
      }
    return(
        <>
       <FacebookLogin
            appId={`${appId}`}
      callback={responseFacebook}
       render={renderProps => (
        <FacebookLoginButton onClick={renderProps.onClick}/>
  )} 
            />
        
        </>
    )
}


export const LogoutGoogle = () => {
  const dispatch = A.useDispatch();
  const router = A.useRouter()
  const logout = async(response) => {
      dispatch(A.logout()).then(A.unwrapResult)
          .then(() => {
             if(!cookies.get('customer_token')) router.push('/')
          }).catch(e => e.message)
  }

  return(
    <>
    <GoogleLogout
     clientId={`${clientId}`}
      buttonText="Logout"
      onLogoutSuccess={logout}
      onFailure={logout}
    >
    </GoogleLogout>
    </>
  )
}