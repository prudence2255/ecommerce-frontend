import Link from 'next/link';
import {useState} from 'react';
import Login from './login';
import {UserIcon } from 'components/admin/icons';
import * as A from 'components/adminImports';

const cookies = new A.Cookies();

export default function Header() {
const [loginModal, setLoginModal] = useState(false);
const [user, setUser] = A.useState();
const router = A.useRouter()

const onLogin = (e) => {
  e.preventDefault()
  if(cookies.get('customer_token')){
    router.push('/ad/account')
  }else{
    setLoginModal(true);
  }
}

const sellNow = (e) => {
  e.preventDefault()
  if(cookies.get('customer_token')){
    router.push('/ad/post-ad')
  }else{
    setLoginModal(true);
  }
}

A.useEffect(() => {
  if(cookies.get('customer_token')){
    setUser(true)
  }else{
    setUser(false)
  } 
  return () => {
  }
}, [user])

    return (
        <>
        <Login loginModal={loginModal} setLoginModal={setLoginModal}/>
        
            <div className="headerBg w3-card-2">
            <div className="w3-bar header container d-flex justify-content-between">
           <Link href="#">
              <a className="w3-bar-item btn">Logo</a>
            </Link>
            <Link href="#">
              <a className="w3-bar-item btn ">All ads</a>
            </Link>
              <a className="w3-bar-item btn ad-btn" 
              onClick={sellNow}
              >Sell now</a>
            <a className="btn" onClick={onLogin}> 
          <span className="icon">
          <UserIcon />
          </span>
             <span className=""> {
             user ? (<span>My account</span>) :
               (<span>Login</span>)
             }</span>
            </a>
            </div>
            </div>

            <style jsx>
            {`
            .headerBg{
    background-color: #228B22!important;
    color: #f6f6fd;
    padding: 5px 0px;
    z-index: 999;
    width: 100%;
    }

    .header a, button{
       color: #f6f6fd;
    }
    a{
      font-weight: bold
    }
    .ad-btn{
      background: #FFD700;
      color: #333333!important;
      font-size: 18px;
    }
       `}
        </style>
        </>
    )
}