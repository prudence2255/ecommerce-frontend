import Link from 'next/link';
import {useState} from 'react';
import Login from './login';
import {UserIcon } from 'components/admin/icons';
import * as A from 'components/adminImports';

const cookies = new A.Cookies();

export const MobileSticky = () => {
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
    <div className="mobile col">
    <div className="d-flex mx-auto">
    <div className="d-block flex-item d-lg-none">
    <a className="w3-btn ad-btn w3-yellow" 
              onClick={sellNow}
              >Sell now
      </a>
    </div>
   
    <div className="d-block flex-item d-lg-none ml-3">
    <a className="w3-btn w3-green" onClick={onLogin}> 
            <span className="">
            <span className="icon">
           <UserIcon />
             </span>
            <span > {
             user ? (<span>My account</span>) :
               (<span>Login</span>)
        }</span>
            </span>
     </a>
    </div>
    
    </div>
    </div>
    <style jsx>
            {`
    
    a{
      color: #f6f6fd;
      font-size: 15px;
      font-weight: bold;
      width: 150px;
      border-radius: 15px;
    }

    .mobile{
      position: fixed;
      bottom: 0px;
      z-index: 999;
    }
       `}
        </style>
    </>
  )
}


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
           <Link href="/">
              <a className="w3-bar-item btn">Logo</a>
            </Link>
            <Link href="/ads">
              <a className="w3-bar-item btn ">All ads</a>
            </Link>
             <div className="d-none d-lg-block">
             <a className="w3-bar-item btn ad-btn " 
              onClick={sellNow}
              >Sell now</a>
             </div>
            <a className="btn" onClick={onLogin}> 
             <span className="d-none d-lg-block">
             <span className="icon">
            <UserIcon />
            </span> {
             user ? (<span>My account</span>) :
               (<span>Login</span>)
             }</span>
            </a>
            <a className="btn" onClick={onLogin}> 
             <span className="d-block d-lg-none">
             <span className="icon">
            <UserIcon />
            </span> {
            }</span>
            </a>
            </div>
            </div>

            <style jsx>
            {`
            .headerBg{
    background-color: #228B22!important;
    color: #f6f6fd;
    padding: 8px 0px;
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