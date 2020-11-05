import Head from 'next/head';
import React, {useState} from 'react';
import Header from './header';
import Footer from './footer';



export default function Layout({children}){
    return(
        <>
       <Head>
         <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
        </Head>
        <div>
     <Header />
      <div>
      <div className="mt-5 container">
       {children}
      </div>
      </div>
      <Footer />
     </div>
        </>
    )
}