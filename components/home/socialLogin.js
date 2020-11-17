import * as A from 'components/adminImports';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {socialLogin} from 'store/customer/customerActions';
import { GoogleLoginButton } from "react-social-login-buttons";

const cookies = new A.Cookies();

const clientId = process.env.CLIENT_ID;


  export const LoginGoogle = ({setLoginModal}) => {
    const dispatch = A.useDispatch();
    const router = A.useRouter();
    const onSuccess = (response) => {
        const res = {
            provider: 'google',
            token: response.accessToken
        };
     dispatch(socialLogin({customer: res, url: '/api/login/google/callback'}))
    .then(A.unwrapResult)
        .then(() => {
          if(cookies.get('customer_token')){
            setLoginModal(false);
            router.push('/ad/account')
          }
        }).catch(e  => e.message)       
      }

      const onFailure = (response) => {
            console.log('Error logging in', response)
        }


      return(
          <> 
          <GoogleLogin
           clientId={clientId}
          render={renderProps => (
         <GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
       )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        />
          </>
      )
  }


export const LogoutGoogle = () => {
  const dispatch = A.useDispatch();
  const router = A.useRouter()
  const onLogoutSuccess = (response) => {
      dispatch(A.logout()).then(A.unwrapResult)
          .then(() => {
             if(!cookies.get('customer_token')) router.push('/')
          }).catch(e => e.message)
  }
  
    
  return(
    <>
   <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
    >
    </GoogleLogout>
    </>
  )
}