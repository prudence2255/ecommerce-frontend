import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import Link from 'next/link';
import {UsersIcon, AdminIcon, AdIcon,
        CategoryIcon, LocationIcon, Caret,
    NavIcon, ServicesIcon, CarIcon, PropertyIcon,
    HomeGardenIcon,
ElectIcon} from './icons';        
import {progressStart} from 'store/admin/loadersSlice';     


export default function SideBar({nav}){
    const dispatch = useDispatch();

    const goToPage = () => {
        dispatch(progressStart());
    }
    return(
        <>
        <div className={` w3-bar-block w3-border-right text-capitalize
            d-none d-lg-block w3-mobile w3-animate-left bgColor ${nav ? 'open' : ''}`}
        style={{width: '230px'}}
         >
           <div className="w3-dropdown-hover">
        <button className="w3-button">  <UsersIcon /> Users <Caret /></button>
         <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
       
         <Link href="/admin-dashboard/users">
        <a className="w3-bar-item w3-button" onClick={goToPage}> users <span className="w3-right"> <NavIcon /></span></a>
        </Link>
         </div>
        </div>
        <div className="w3-dropdown-hover">
        <button className="w3-button"> <AdminIcon /> Admins <Caret /></button>
         <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
       
      <Link href="/admin-dashboard/admins">
      <a className="w3-bar-item w3-button" onClick={goToPage}> admins <span className="w3-right"> <NavIcon /></span></a>
      </Link>
         </div>
        </div>
        <div className="w3-dropdown-hover">
        <button className="w3-button">  <AdIcon /> Ads <Caret /></button>
         <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/ads">
       <a className="w3-bar-item w3-button" onClick={goToPage}>  ads <span className="w3-right"> <NavIcon /></span></a>
       </Link>
         </div>
        </div>
       
        <div className="w3-dropdown-hover">
            <button className="w3-button"> <CategoryIcon /> Categories <Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/categories">
         <a className="w3-bar-item w3-button" onClick={goToPage}>categories <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         
        </div>
        </div>
         <div className="w3-dropdown-hover">
            <button className="w3-button"> <LocationIcon /> Locations <Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/locations">
         <a className="w3-bar-item w3-button" onClick={goToPage}>locations <span className="w3-right"> <NavIcon /></span></a>
         </Link>
        
        </div>
        </div>
        <div className="w3-dropdown-hover">
            <button className="w3-button"> <ElectIcon /> Electronics <Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/mobile-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Mobile Phone Brands <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/mobile-models">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Mobile Phone Models <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
        
         <Link href="/admin-dashboard/computer-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Computer Brands <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
        
         <Link href="/admin-dashboard/computer-accessories">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Computer Accessories <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/audio-types">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Audio types <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/camera-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Camera Brands <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/camera-types">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Camera types <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/tv-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Tv Brands <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/tv-accessories">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Tv Accessories <span className="w3-right"> <NavIcon /></span></a>
         </Link>
        </div>
        </div>
        
        <div className="w3-dropdown-hover">
            <button className="w3-button"> <CarIcon /> Vehicles<Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/car-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Car Brands <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/car-models">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Car Models <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         
         <hr />
        
         <Link href="/admin-dashboard/motor-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Motor brands <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/motor-models">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Motor models <span className="w3-right"> <NavIcon /></span></a>
         </Link>
         <Link href="/admin-dashboard/auto-parts">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Auto parts <span className="w3-right"> <NavIcon /></span></a>
         </Link>
        </div>
        </div>
        <div className="w3-dropdown-hover">
            <button className="w3-button"> <PropertyIcon /> Properties <Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/commercial-types">
         <a className="w3-bar-item w3-button" onClick={goToPage}>property <span className="w3-right"> <NavIcon /></span></a>
         </Link>
        
        </div>
        </div>
        
        </div>
        <style jsx>{`
            .dropDown{
                position: relative;
                left: 0px;
            }
            .dropDown a{
                color: #0070f3!important;
            }
            .bgColor{
    background-color: #262626;
    color: #f2f2f2;
    left: 0px;
    top: 40px;
    position: fixed;
    bottom: 0px;
    z-index: 999;
    overflow-y: scroll;

}

.bgColor::-webkit-scrollbar{
width: 8px;
background-color: #262626;
border-radius: 0 8px 8px 0;
}

.bgColor::-webkit-scrollbar-thumb{
    background-color: grey;
    border-radius: 0 8px 8px 0;
}
.open{
    display: block!important;
}

        `}</style>
        </>
    )
}