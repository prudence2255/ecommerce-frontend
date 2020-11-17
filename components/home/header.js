import Link from 'next/link';
import {useState} from 'react';
import Login from './login';
import {UserIcon } from 'components/admin/icons';
import * as A from 'components/adminImports';
import {ProgressBar} from 'components/loaders'

const cookies = new A.Cookies();


export const MobileSticky = () => {
  const [loginModal, setLoginModal] = useState(false);
const [user, setUser] = A.useState();
const router = A.useRouter();
const dispatch = A.useDispatch();

const onLogin = (e) => {
  e.preventDefault()
  if(cookies.get('customer_token')){
    dispatch(A.progressStart());
    router.push('/ad/account')
  }else{
    setLoginModal(true);
  }
}

const sellNow = (e) => {
  e.preventDefault()
  if(cookies.get('customer_token')){
     dispatch(A.progressStart());
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
    <ProgressBar />
     <Login loginModal={loginModal} setLoginModal={setLoginModal}/>
    <div className="mobile d-block d-lg-none">
    <div className="d-flex justify-content-center">
    <div className="">
    <a className="w3-btn ad-btn w3-yellow" 
              onClick={sellNow}
              >Sell now
      </a>
    </div>
   
    <div className="ml-3">
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
      left: 0px;
      right: 0px;
      display: flex;
      justify-content-center;
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

const dispatch = A.useDispatch()

const goToPage = () => {
  dispatch(A.progressStart());
}
const onLogin = (e) => {
  e.preventDefault()
  if(cookies.get('customer_token')){
    dispatch(A.progressStart());
    router.push('/ad/account')
  }else{
    setLoginModal(true);
  }
}

const sellNow = (e) => {
  e.preventDefault()
  if(cookies.get('customer_token')){
    dispatch(A.progressStart());
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
        <ProgressBar />
        <Login loginModal={loginModal} setLoginModal={setLoginModal}/>
        
            <div className="headerBg w3-card-2">
            <div className="w3-bar header container d-flex justify-content-between">
           <Link href="/">
              <a className={`w3-bar-item btn `} onClick={goToPage}>
              Logo
              </a>
            </Link>
            <Link href="/ads">
              <a className={`w3-bar-item btn ${router.pathname == '/ads' ? 'header-active' : ''}`} onClick={goToPage}>
              All ads
              </a>
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
    padding: 10px 0px;
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
    .header-active{
  background-color: #006400;
}
       `}
        </style>
        </>
    )
}