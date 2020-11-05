import Head from 'next/head';
import Layout from 'components/home/layout';
import * as A from 'components/adminImports';
import Ad, {Loader} from 'components/ad/ad';
import Search from  'components/ad/search';
import {LocationIcon, CategoryIcon, Caret,  FilterIcon} from 'components/admin/icons';
import Filters, {MobileFilters} from 'components/ad/filters';
import Location from 'components/ad/locations';
import Category from 'components/ad/categories';
import CategoryLocation from 'components/ad/categoryLocations';
import Paginator from 'components/ad/paginator';
import {MobileSticky} from 'components/home/header';
const transform = new A.TransForm();

export default function Home() {
  const [categoryModal, setCategoryModal] = A.useState(false);
  const [locationModal, setLocationModal] = A.useState(false);
  const [filterModal, setFilterModal] = A.useState(false);
  const {ads, adsLoading} = A.useSelector(A.adsSelector);
  const {status} = A.useSelector(A.loadersSelector);
 
  const [isCategory, setCategory] = A .useState('Category')
  const [isLocation, setLocation] = A .useState('Location')
  const router = A.useRouter();
 
 const openCategoryModal = () => {
    setCategoryModal(true)
 }

 const openLocationModal = () => {
  setLocationModal(true)
 }

 const openFilterModal = () => {
   setFilterModal(true)
 }
 A.useEffect(() => {
   let isLocation = router.query.location ?? 'Location';
   let isCategory = router.query.category ?? 'Category';
  setCategory(transform.slugToUpper(isCategory))
  setLocation(transform.slugToUpper(isLocation))
   return () => {
   }
 }, [ads])
  return (
   <Layout>
   <MobileSticky />
   <Location locationModal={locationModal} setLocationModal={setLocationModal}

   />
  <Category categoryModal={categoryModal} setCategoryModal={setCategoryModal}
  />
  <MobileFilters filterModal={filterModal} setFilterModal={setFilterModal}/>
      <div className="ads-page px-2">
      <div className="search-box">
      <div className="row">
        <Search />
      </div>
      <div className="row">
        <div className="d-flex col my-3 select-btns">
          <button className="btn category" onClick={openLocationModal}>
           <LocationIcon /> {transform.shortenLength(isLocation, 10) } <Caret />
           </button>
          <button className="btn ml-4 location" onClick={openCategoryModal}>
          <CategoryIcon /> {transform.shortenLength(isCategory, 12) } <Caret />
          </button>
          <button className="btn d-block d-lg-none ml-4 ml-2" onClick={openFilterModal}>
         <FilterIcon />
          </button>
        </div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-3 filters d-none d-lg-block">
     <div className="row ">
     <Filters setFilterModal={setFilterModal}/>
     </div>
     <div className="row">
     <CategoryLocation />
     </div>
      </div>
      <div className="col-md-6 mt-5"> 
      <div className="row">
      <div className="col">
      {adsLoading ? <Loader />
      : ads.map(ad => <Ad  ad={ad} key={ad.id}/>)}
      {router.query.search && ads.length === 0 && status === 'succeeded' && (
        <div className="text-center">
        <h6>There are no results for <b>{router.query.search}</b>!</h6>
        <button className="btn w3-green mt-4"
        onClick={() => router.push('/ads')}
        >Browse all ads</button>
        </div>
      )}

      {!router.query.search && ads.length === 0 && status === 'succeeded' && (
        <div className="text-center">
        <h6 className="text-center">There are no ads in this section!</h6>
        <button className="btn w3-green mt-4"
        onClick={() => router.push('/ads')}
        >Browse all ads</button>
        </div>
      )}
      </div>
      </div>
     
      </div>
      
      </div>
      <div className="row mt-4">
      <div className="col-md-6 mx-auto">
      <Paginator />
     </div>
      </div>
     </div>
     <style jsx>
      {`
      .ads-page{
        background: white;
        padding-top: 25px;
       padding-bottom: 100px;
       width: 100%;
      }

      .btn{
        border: 1px solid green;
        font-weight: bold;
        font-size: 15px;
      }
      .filters{
        border-right: 1px solid lightgrey;
        border-length: 500px; 
        padding-top: 40px;
      }
      .search-box{
        border-bottom: 1px solid lightgrey;
        padding-bottom: 20px;
      }
      .category, .location{
        width: 200px;
      }
      `}
     </style>
   </Layout>
  )
}

export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store, query}) => {
     await store.dispatch(A.fetchCategoryLocation({url: '/api/category-locations'}))
    const data = {
      ...query,
    }
     await store.dispatch(A.fetchAds({url: `/api/all-ads?page=${query.page}`, item: data}))
}
)