
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout, loadUser} from 'store/admin/adminActions';
import {useRouter} from 'next/router';
import AdminProfile from 'components/admin/profile';
import { unwrapResult } from '@reduxjs/toolkit'
import {GridLoader} from 'components/loaders'
import Cookies from 'universal-cookie';
import {ProgressBar} from 'components/loaders'

 
const cookies = new Cookies();

import {BarIcon, HomeIcon, 
    DashboardIcon, UserIcon, Caret} from './icons';


export default function Header({toggleNav, openNav}){
    const [profileModal, setProfileModal] = useState(false)
    const openProfileModal = () => {
        setProfileModal(true)
    }
    const dispatch = useDispatch() 
    const loadProfile = () => {
        dispatch(loadUser()).then(unwrapResult)
        .then(() => openProfileModal())
    }
     const router = useRouter()  
        useEffect(() => {
     return () => {
            }
        }, [])

        const onLogout = (e) => {
            e.preventDefault();
             dispatch(logout()).then(unwrapResult)
             .then(() => {
                if(!cookies.get('token')) router.push('/admin-dashboard/login')
             }).catch(e => e.message)
            
        }
    const setNav = () => {
        toggleNav(!openNav);
    }
    return(
        <>
         <ProgressBar />
        <GridLoader />
        <AdminProfile profileModal={profileModal} setProfileModal={setProfileModal}/>
        <div className={`header w3-mobile  headerBg`}>
        <button className="w3-bar-item w3-button w3-hide-large" onClick={setNav}>
            <BarIcon />
        </button>
         <Link href="/"><a className="w3-bar-item w3-button">
             <HomeIcon />
         </a></Link>
        <Link href="/admin-dashboard"><a className="w3-bar-item w3-button">
       <DashboardIcon /> Dashboard</a></Link>
        <div className="w3-dropdown-hover w3-right">
        <button className="w3-button"><UserIcon /><Caret /></button>
        <div className="w3-dropdown-content w3-bar-block w3-border" style={{right: 0 + 'px', zIndex: '999'}}>
        <button className="w3-bar-item w3-button" onClick={() => loadProfile()}>Profile</button>   
        <button className="w3-bar-item w3-button" onClick={onLogout}>Logout</button>
         </div>
        </div>
        </div>

        <style jsx>
            {`
            .headerBg{
    background-color: #228B22!important;
    color: white;
    position: fixed;
    z-index: 999;
    width: 100%;
    }
            `}
        </style>
        </>
    )
}