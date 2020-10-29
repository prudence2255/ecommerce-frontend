import * as A from 'components/adminImports';
import Link from 'next/link';

import { PropertyIcon, ClothIcon,
    ServicesIcon, CarIcon, HomeGardenIcon,
    ElectronicsIcon}  from 'components/admin/icons';

const CategoryLocation = () => {
    const {categoryLocations} = A.useSelector(A.adsSelector);
    const {locations, categories} = categoryLocations;

    const transFormArray = (array, id, check) => {
        const newArray = array?.filter(item => item[id] === check)
         return newArray;
        }

const parentCategories = transFormArray(categories, 'parent_id', null);
const parentLocations = transFormArray(locations, 'parent_id', null);

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
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ElectronicsIcon size="20"/>  {item.name} {`(${item.ads_count})`}
         </div>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Property'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <PropertyIcon size="20"/> {item.name} {`(${item.ads_count})`}
         </div>
        
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Vehicles'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
           <Link href={`/ads?category=${item.slug}`}  >
           <a>
         <div>
         <CarIcon size="20"/>  {item.name} {`(${item.ads_count})`}
         </div>
         
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Services'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ServicesIcon size="20"/> {item.name} {`(${item.ads_count})`}
         </div>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {parentCategories?.map(item => {
        if(item.name === 'Clothing & Beauty'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ClothIcon size="20"/> {item.name} {`(${item.ads_count})`}
         </div>
         
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {Array.isArray(parentCategories) && parentCategories.map(item => {
        if(item.name === 'Home & Garden'){
          return(
           <div className="col-md-12 mx-2 py-1" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
           
         <div>
         <HomeGardenIcon size="20"/>  {item.name} {`(${item.ads_count})`}
         </div>
        
         </a>
         </Link>
        </div>
          )
        }
       })
       }
      </div>
      <div className="row">
       <div className="col mt-3">Locations:</div>
      </div>
      <div className="row">
       {parentLocations?.map(location => (
        <div className="col-md-12 mx-2 py-1" key={location.id}>
           <Link href={`/ads?location=${location.slug}`} >
           <a>
           
         <div>
             {location.name} {`(${location.ads_count})`}
         </div>
        
         </a>
         </Link>
        </div>
       ))}
      </div>
        </div>
        </>
    )
}


export default CategoryLocation;