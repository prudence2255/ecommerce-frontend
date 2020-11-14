import * as A from 'components/adminImports';

import { PropertyIcon, ClothIcon,
    ServicesIcon, CarIcon, HomeGardenIcon,
    ElectronicsIcon}  from 'components/admin/icons';

const CategoryLocation = () => {
    const {categoryLocations} = A.useSelector(A.adsSelector);
    const {locations, categories} = categoryLocations;
  const router = A.useRouter();
    const transFormArray = (array, id, check) => {
        const newArray = array?.filter(item => item[id] === check)
         return newArray;
        }

const parentCategories = transFormArray(categories, 'parent_id', null);
const parentLocations = transFormArray(locations, 'parent_id', null);

const handleCategory = (category) => {
  router.push({
      pathname: '/ads',
      query: {
          ...router.query,
          category: category
      }
  })
}

const handleLocation = (location) => {
  router.push({
      pathname: '/ads',
      query: {
          ...router.query,
          location: location
      }
  })
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
         <div className="link" onClick={() => handleCategory(item.slug)}>
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
         <div className="link" onClick={() => handleCategory(item.slug)}>
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
         <div className="link" onClick={() => handleCategory(item.slug)}>
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
         <div className="link" onClick={() => handleCategory(item.slug)}>
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
         <div className="link" onClick={() => handleCategory(item.slug)}>
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
           
         <div className="link" onClick={() => handleCategory(item.slug)}>
         <HomeGardenIcon size="20"/>  {item.name} <span className="count">{`(${item.ads_count})`}</span>
         </div>
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
         <div className="link" onClick={() => handleLocation(location.slug)}>
             {location.name} <span className="count">{`(${location.ads_count})`}</span>
         </div>
        </div>
       ))}
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
        `}
        </style>
        </>
    )
}


export default CategoryLocation;