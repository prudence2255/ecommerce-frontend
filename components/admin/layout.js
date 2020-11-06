import Head from 'next/head';
import React, {useState} from 'react';
import Header from './header';
import SideBar from './sidebar';


export default function Layout({children}){
    const [openNav, setOpenNav] = useState(undefined);

    return(
        <>
       <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
        </Head>
           <div>
           <Header toggleNav={setOpenNav} openNav={openNav}/>
       <div className="row">
        <div className="col-md-2">
            <SideBar nav={openNav}/>
        </div>
        <div className="col-md-8 layout ml-md-5" >
        <div className="container">
        {children}
        </div>
        </div>
       </div> 
        </div>
        <style jsx>
            {` 
            .layout{
                margin-top: 60px;
            }
            `}
        </style>
        </>
    )
}