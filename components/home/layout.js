import Head from 'next/head';
import React, {useState} from 'react';
import Header from './header';
import Footer from './footer';
import {ErrorBoundary} from 'react-error-boundary';


function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </div>
  )
}


export default function Layout({children}){
    return(
        <>
     <ErrorBoundary FallbackComponent={ErrorFallback}>
       <Head>
         <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
        </Head>
        <div>
     <Header />
      <div>
      <div className="mt-5">
       {children}
      </div>
      </div>
      <Footer />
     </div>
     </ErrorBoundary>
     </>
    )
}