
import Layout from 'components/admin/layout';
import AuthRoute from 'components/admin/auth';
import {UserIcon, AdminIcon, AdIcon,
    CategoryIcon, LocationIcon} from 'components/admin/icons';
import {wrapper} from 'store/store';



 function Dashboard(){
    return(
    <>
   <Layout>
       <div className="w3-row-padding mb-5">
           <div className="w3-col m6 card-box users">
           <div className="card w3-margin-top">
        <h5 className="card-header">Users</h5>
            <div className="card-body">
            <div className="icon">
                <UserIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <a href="#" className="btn btn-primary my-5">View all users</a>
        </div>
            </div>
           </div> 
           <div className="w3-col m6 card-box admins">
           <div className="card w3-margin-top">
            <h5 className="card-header">Admins</h5>
            <div className="card-body">
            <div className="icon">
                <AdminIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <a href="#" className="btn btn-primary my-5">View all admins</a>
             </div>
            </div>
           </div>
       </div>
       <div className="w3-row-padding">
           <div className="w3-col m6 card-box ads">
           <div className="card w3-margin-top">
        <h5 className="card-header w3-green">Ads</h5>
            <div className="card-body">
            <div className="icon">
                <AdIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <a href="#" className="btn btn-primary my-5">View all ads</a>
        </div>
            </div>
           </div> 
           <div className="w3-col m6 card-box categories">
           <div className="card w3-margin-top">
            <h5 className="card-header w3-yellow">Categories</h5>
            <div className="card-body">
            <div className="icon">
            <CategoryIcon />
            </div>
            <div className="tag-no">
            <span className="w3-badge">20</span>
            </div>
            <a href="#" className="btn btn-primary my-5">View all categories</a>
             </div>
            </div>
           </div>
       </div>
       <div className="w3-row-padding">
           <div className="w3-col m6 card-box locations">
           <div className="card w3-margin-top" >
        <h5 className="card-header w3-blue">Locations</h5>
            <div className="card-body">
        <div className="icon">
        <LocationIcon />
        </div>
        <div className="tag-no">
            <span className="w3-badge">20</span>
        </div>
            <a href="#" className="btn btn-primary my-5">View all locations</a>
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

