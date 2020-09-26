import {useDispatch} from 'react-redux';
import Layout from 'components/admin/layout';
import AuthRoute from 'components/admin/auth';
import {UserIcon, AdminIcon, AdIcon,
    CategoryIcon, LocationIcon, NavIcon} from 'components/admin/icons';
import {wrapper} from 'store/store';
import Link from 'next/link';
import {progressStart} from 'store/admin/loadersSlice';     


 function Dashboard(){
    const dispatch = useDispatch();

    const goToPage = () => {
        dispatch(progressStart());
    }
    return(
    <>
   <Layout>
       <div className="w3-row-padding mb-5">
           <div className="w3-col m6 card-box users">
           <div className="card w3-margin-top">
        <h5 className="card-header">Users</h5>
            <div className="card-body">
            <div className="icon my-3">
                <UserIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <Link href="/admin-dashboard/users">
        <a className="w3-bar-item w3-button" onClick={goToPage}> view all users <span className="w3-right"> <NavIcon /></span></a>
        </Link>
        </div>
            </div>
           </div> 
           <div className="w3-col m6 card-box admins">
           <div className="card w3-margin-top">
            <h5 className="card-header">Admins</h5>
            <div className="card-body">
            <div className="icon my-3">
                <AdminIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <Link href="/admin-dashboard/admins">
      <a className="w3-bar-item w3-button" onClick={goToPage}> view all admins <span className="w3-right"> <NavIcon /></span></a>
      </Link>
             </div>
            </div>
           </div>
       </div>
       <div className="w3-row-padding">
           <div className="w3-col m6 card-box ads">
           <div className="card w3-margin-top">
        <h5 className="card-header w3-green">Ads</h5>
            <div className="card-body">
            <div className="icon my-3">
                <AdIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <Link href="/admin-dashboard/ads">
       <a className="w3-bar-item w3-button" onClick={goToPage}> view all ads <span className="w3-right"> <NavIcon /></span></a>
       </Link>
        </div>
            </div>
           </div> 
           <div className="w3-col m6 card-box categories">
           <div className="card w3-margin-top">
            <h5 className="card-header w3-yellow">Categories</h5>
            <div className="card-body">
            <div className="icon my-3">
            <CategoryIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <Link href="/admin-dashboard/categories">
         <a className="w3-bar-item w3-button" onClick={goToPage}> view categories <span className="w3-right"> <NavIcon /></span></a>
         </Link>
             </div>
            </div>
           </div>
       </div>
       <div className="w3-row-padding">
           <div className="w3-col m6 card-box locations">
           <div className="card w3-margin-top" >
        <h5 className="card-header w3-blue">Locations</h5>
            <div className="card-body">
        <div className="icon my-3">
        <LocationIcon />
        </div>
        <div className="tag-no">
            <span className="w3-badge">20</span>
        </div>
        <Link href="/admin-dashboard/locations">
         <a className="w3-bar-item w3-button" onClick={goToPage}>locations <span className="w3-right"> <NavIcon /></span></a>
         </Link>
        
        </div>
            </div>
           </div> 
       </div>
   </Layout>


   <style jsx>{`
    .card-box{
        text-align: center;
    }
    .icon{
        font-size: 50px;
    }
    .users .card-header{
        background-color: yellow;
        color: black;
    }
.admins .card-header{
    background-color: #008B8B;
    color: white;
}

`}</style>
    </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({store} ) => {
    }
  )

export default AuthRoute(Dashboard)

