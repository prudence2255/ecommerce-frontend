
import React, {useState} from 'react';
import Header from './header';
import Footer from './footer';



export default function Layout({children}){
    return(
        <>
      
           <div>
     <Header />
      <div className="col-md-12">
      <div className="container mt-5">
       {children}
      </div>
      </div>
      <Footer />
     </div>
        </>
    )
}