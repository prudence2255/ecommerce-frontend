import Layout from 'components/home/layout';
import UserNav from 'components/home/userNav';
import AuthRoute from 'components/home/auth';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

function Account(){
    const myRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, myRef.current.offsetTop) 
        return () => {          
        }
    }, [])
    return(
        <>
           <Layout>
           <div className="row">
            <div className="col-md-2 w3-card-2 p-2">
                <UserNav />
            </div>
            <div className="col-md-8 ml-md-5 w3-card-2 p-2 m-top " ref={myRef}>
                <h5 className="text-center w-100">Alidu Latif</h5>
                <hr />
 <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Ads</h5>
  </div>
  <div className="ad">
  <div className="row">
        <div className="col-md-12 m-2">
        <div className="media">
  <img className="align-self-start mr-3" src="/32.jpg" alt="img" 
  style={{width: '100px', height: '80px'}}/>
  <div className="media-body">
    <h5 className="mt-0">Top-aligned media (New)</h5>
   <p>Kumasi, Computers</p>
   <p><b>GHC 1000</b></p>
  </div>
</div>
</div>
  </div>
  <div className="row">
<div className="col-md-12 m-2">
<Link href="#">
    <a className="btn w3-green">Edit</a>
</Link>
<button className="btn w3-red ml-3">Delete</button>
</div>
</div>
  </div>
  <hr />
  <div className="ad">
  <div className="row">
        <div className="col-md-12 m-2">
        <div className="media">
  <img className="align-self-start mr-3" src="/32.jpg" alt="img" 
  style={{width: '100px', height: '80px'}}/>
  <div className="media-body">
    <h5 className="mt-0">Top-aligned media (New)</h5>
   <p>Kumasi, Computers</p>
   <p><b>GHC 1000</b></p>
  </div>
</div>
</div>
  </div>
  <div className="row">
<div className="col-md-12 m-2">
<Link href="#">
    <a className="btn w3-green">Edit</a>
</Link>
<button className="btn w3-red ml-3">Delete</button>
</div>
</div>
  </div>
  <hr />
  <div className="ad">
  <div className="row">
        <div className="col-md-12 m-2">
        <div className="media">
  <img className="align-self-start mr-3" src="/32.jpg" alt="img" 
  style={{width: '100px', height: '80px'}}/>
  <div className="media-body">
    <h5 className="mt-0">Top-aligned media (New)</h5>
   <p>Kumasi, Computers</p>
   <p><b>GHC 1000</b></p>
  </div>
</div>
</div>
  </div>
  <div className="row">
<div className="col-md-12 m-2">
<Link href="#">
    <a className="btn w3-green">Edit</a>
</Link>
<button className="btn w3-red ml-3">Delete</button>
</div>
</div>
  </div>
  <hr />
  </div>
            </div>
            </div>
           </Layout>
           <style jsx>
            {`
                @media(max-width: 768px){
                    .m-top{
                        margin-top: 50px;
                    }

                }

                .btn{
                  width: 80px;
                }
            `}
           </style>
        </>
    )
}


export default AuthRoute(Account);