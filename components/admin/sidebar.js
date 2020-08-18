import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import Link from 'next/link';
import {UsersIcon, AdminIcon, AdIcon,
        CategoryIcon, LocationIcon, Caret} from './icons';        
import {progressStart} from 'store/admin/loadersSlice';     


export default function SideBar({nav}){
   const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    const goToPage = () => {
        dispatch(progressStart());
    }
    return(
        <>
        <div className={` w3-bar-block w3-border-right 
        d-none d-lg-block w3-mobile w3-animate-left bgColor ${nav ? 'open' : ''}`}
        style={{width: '230px'}}
         >
        <Link href="/admin-dashboard/users">
        <a className="w3-bar-item w3-button" onClick={goToPage}> <UsersIcon /> Users</a>
        </Link>
        <div className="w3-dropdown-hover">
        <button className="w3-button"> <AdminIcon /> Admins <Caret /></button>
         <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
       
      <Link href="/admin-dashboard/admins">
      <a className="w3-bar-item w3-button" onClick={goToPage}>All admins</a>
      </Link>
         </div>
        </div>
        <Link href="/admin-dashboard/ads">
       <a className="w3-bar-item w3-button" onClick={goToPage}> <AdIcon /> Ads</a>
       </Link>
        <div className="w3-dropdown-hover">
            <button className="w3-button"> <CategoryIcon /> Categories <Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/categories">
         <a className="w3-bar-item w3-button" onClick={goToPage}>All categories</a>
         </Link>
         
        </div>
        </div>
         <div className="w3-dropdown-hover">
            <button className="w3-button"> <LocationIcon /> Locations <Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/locations">
         <a className="w3-bar-item w3-button" onClick={goToPage}>All locations</a>
         </Link>
        
        </div>
        </div>
        <div className="w3-dropdown-hover">
            <button className="w3-button"> <LocationIcon /> Electronics <Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/mobile-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Mobile Phone Brands</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/mobile-models">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Mobile Phone Models</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/mobile-features">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Mobile Phone Features</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/computer-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Computer Brands</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/computer-types">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Computer types</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/computer-accessories">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Computer Accessories</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/audio-types">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Audio types</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/camera-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Camera Brands</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/camera-types">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Camera types</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/tv-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Tv Brands</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/tv-accessories">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Tv Accessories</a>
         </Link>
        </div>
        </div>
        
        <div className="w3-dropdown-hover">
            <button className="w3-button"> <LocationIcon /> Vehicles<Caret /></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-2 dropDown">
         <Link href="/admin-dashboard/car-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Car Brands</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/car-models">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Car Models</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/car-bodies">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Car body types</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/car-transmissions">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Car transmissions</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/car-fuels">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Car fuel types</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/motor-brands">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Motor brands</a>
         </Link>
         <hr />
         <Link href="/admin-dashboard/motor-models">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Motor models</a>
         </Link>
         <Link href="/admin-dashboard/auto-parts">
         <a className="w3-bar-item w3-button" onClick={goToPage}>Auto parts</a>
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

.open{
    display: block!important;
}

        `}</style>
        </>
    )
}