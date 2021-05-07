import Layout from 'components/home/layout';
import UserNav from 'components/home/userNav';
import AuthRoute from 'components/home/auth';
import { useRef, useEffect } from 'react';
import * as A from 'components/adminImports';
import {TransForm} from 'components/classes';
import Paginator from 'components/ad/paginator';
const cookies = new A.Cookies();

function Account(){
  const {ads, loginCustomer, meta} = A.useSelector(A.customerSelector);
  const {error} = A.useSelector(A.errorsSelector)
  const {status} = A.useSelector(A.loadersSelector);
    const myRef = useRef(null);
    const title = new TransForm();
    const dispatch = A.useDispatch();
  const router = A.useRouter();
    const handleDelete = (slug) => {
      A.Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
         dispatch(A.deleteAd({url: '/api/ads/', slug: slug}))
          .then(A.unwrapResult).then(() => {
            A.Swal.fire(
              'Deleted!',
              'Ad has been deleted.',
              'success'
            )
          }).catch((e) => e)
          
        }
      })
    }
    useEffect(() => {
      //dispatch(A.loadAds({url: '/api/customer-ads'})) 
        return () => {          
        }
    }, [error]);
    return(
        <>
         {error && (
            <A.ShowError />
        )}
           <Layout>
           <div className="container">
           <div className="row">
            <div className="col-md-2 w3-card">
                <UserNav />
            </div>
            <div className="col-md-8 ml-md-5 w3-card m-top " ref={myRef}>
                <h5 className="text-center ">{loginCustomer?.name}</h5>
            <hr />
    <div className="card pb-4">
    <div className="card-header w3-blue mb-2">
    <h5 className="text-center ">Ads</h5>
    </div>
    {status === 'succeeded' && ads.length === 0 && (
      <div className="text-center mt-4">
        <h6>You don't have ads</h6>
       <div className="col">
       <button className="btn w3-yellow my-4" onClick={() => router.push('/ad/post-ad')}>
        Post ad now
        </button>
       </div>
      </div>
    )}
     {ads.map(ad => {
        const images = ad?.images?.filter(image => image !== null);
       return(
        <div className="ad" key={ad.id}>
        <div className="row" >
        <div className="col-md-12">
        <div className="media">
  <img className="align-self-start mr-3" src={images?.length > 0 ? images[0].small : ad.title} alt="img" 
  style={{width: '100px', height: '80px'}}/>
  <div className="media-body">
    <h6 className="mt-0"><b>{title.shortenLength(ad.title, 20)} {ad.condition ? `(${ad.condition})` : null}</b></h6>
   <p>{ad.location ?? 'Ghana'}, {ad.category}</p>
   <p><b>GHC {ad.price}</b></p>
  </div>
</div>
</div>
  </div>
  <div className="row">
<div className="col-md-12 m-2">
    <a className=" edit btn w3-green" href={`/ad/post-ad/details?category=${ad.child_category_id}&location=${ad.child_location_id}&edit=${ad.slug}`}>Edit</a>
<button className=" del btn w3-red ml-3" onClick={()=>handleDelete(ad.slug)}>Delete</button>
</div>
</div>
 <hr />
  </div>
      )})}
      <div className="row">
    <div className="col ml-2">
   <Paginator pages={meta}/>
    </div>
  </div>
  </div>
 
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

                .del, .edit{
                  width: 80px;
                }
                .col-md-2, .col-md-8{
                  background: white;
                }
            `}
           </style>
        </>
    )
}


export default AuthRoute(Account);

export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store, req, query}) => {
  const cookie = new A.Cookies(req.headers.cookie);
  await store.dispatch(A.loadAds({url: `/api/customer-ads?page=${query.page}`, cookie: cookie.get('customer_token')}))
  await store.dispatch(A.loadCustomer(cookie.get('customer_token')))
  }
)