import * as A from 'components/adminImports';
import { useGoogleLogin } from 'react-google-login'
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
            console.log('Error logging in')
        }

      const { signIn } = useGoogleLogin({
        onSuccess,
        clientId,
        onFailure,
      })

      return(
          <> 
          <GoogleLoginButton onClick={signIn}/>
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
  
  const onFailure = (res) => {
    alert('Logout failed')
  }
    const { signOut } = useGoogleLogout({
    onFailure,
    clientId,
    onLogoutSuccess
  })
  return(
    <>
    <button onClick={signOut} className="w3-card btn w3-yellow">
      Logout
    </button>
    </>
  )
}