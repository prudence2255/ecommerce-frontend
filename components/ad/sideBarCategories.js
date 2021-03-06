import * as A from 'components/adminImports';

import { PropertyIcon, ClothIcon,
    ServicesIcon, CarIcon, HomeGardenIcon,
    ElectronicsIcon}  from 'components/admin/icons';

const SideBarCategories = () => {
  const [children, setChildren] = A.useState([]);
    const {categoryLocations} = A.useSelector(A.adsSelector);
    const {categories} = categoryLocations;
  const router = A.useRouter();
  const dispatch = A.useDispatch()
    const transFormArray = (array, id, check) => {
        const newArray = array?.filter(item => item[id] === check)
         return newArray;
        }

const parentCategories = transFormArray(categories, 'parent_id', null);


const handleCategory = (category) => {
  const query =  {
    ...router.query,
    category: category
}
router.query.category = category;
dispatch(A.fetchAds({url: `/api/all-ads?page=${query.page}`, item: query}));
  // router.push({
  //     pathname: '/ads',
  //     query: {
  //         ...router.query,
  //         category: category
  //     }
  // })
 
}
const handleChildren = (id) => {
  setChildren(transFormArray(categories, 'parent_id', id))
}

    return(
        <>
        <div className="col mt-4">
        <div className="row mb-1">
            <div className="col">
            Categories:
            </div>
        </div>
        <div className="row categories">
       {parentCategories?.map(item => {
        if(item.name === 'Electronics'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
         <div className={`link ${router.query.category == item.slug ? 'active' : ''}`} onClick={() => handleCategory(item.slug)} >
         <ElectronicsIcon size="20"/>  {item.name} <span className="count">{`(${item.ads_count})`}</span>
         </div>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Property'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
         <div className={`link ${router.query.category == item.slug ? 'active' : ''}`} onClick={() => handleCategory(item.slug)}>
         <PropertyIcon size="20"/> {item.name} <span className="count">{`(${item.ads_count})`}</span>
         </div>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Vehicles'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
         <div className={`link ${router.query.category == item.slug ? 'active' : ''}`} onClick={() => handleCategory(item.slug)}>
         <CarIcon size="20"/>  {item.name} <span className="count">{`(${item.ads_count})`}</span>
         </div>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Services'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
         <div className={`link ${router.query.category == item.slug ? 'active' : ''}`} onClick={() => handleCategory(item.slug)}>
         <ServicesIcon size="20"/> {item.name} <span className="count">{`(${item.ads_count})`}</span>
         </div>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Clothing & Beauty'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
         <div className={`link ${router.query.category == item.slug ? 'active' : ''}`} onClick={() => handleCategory(item.slug)}>
         <ClothIcon size="20"/> {item.name} <span className="count">{`(${item.ads_count})`}</span>
         </div>
        </div>
          )
        }
       })
       }
       {Array.isArray(parentCategories) && parentCategories.map(item => {
        if(item.name === 'Home & Garden'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
           
         <div className={`link ${router.query.category == item.slug ? 'active' : ''}`} onClick={() => handleCategory(item.slug)}>
         <HomeGardenIcon size="20"/>  {item.name} <span className="count">{`(${item.ads_count})`}</span>
         </div>
        </div>
          )
        }
       })
       }
      </div>
     
        </div>
        <style jsx>
        {`

        .link{
               cursor: pointer;
               color: #6495ED;
                }
                .count{
                  color: #1a1a1a;
                }
         .active{
          color: #1a1a1a;
         }       
        `}
        </style>
        </>
    )
}


export default SideBarCategories;