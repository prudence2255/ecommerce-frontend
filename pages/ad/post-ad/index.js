import {useState, useEffect} from 'react';
import Layout from 'components/home/layout';
import Select from 'react-select';
import AuthRoute from 'components/home/auth';
import * as A from 'components/adminImports';



function PostAd(){
const [category, setCategory] = useState(null);
const [region, setRegion] = useState(null);
const [subLocation, setSubLocation] = useState(null);
const [subCategory, setSubcategory] = useState(null);
const [subLocations, setSubLocations] = useState(null);
const [subCategories, setSubCategories] = useState(null);
const [selectErrors, setSelectErrors] = useState({
                                  region: null,
                                  town: null,
                                  category: null,
                                  subcategory: null
                                });
 const router = A.useRouter()

const handleValidation = (region, town, category, subcategory) => {
  let errors = {};
  if(region === null){
    errors = {...errors, region: `Region is required`}
  }
  if(town === null){
    errors = {...errors, town: `sublocation is required`}
  }
  if(category === null){
    errors = {...errors, category: `category is required`}
  }
  if(subcategory === null){
    errors = {...errors, subcategory: `subcategory is required`}
  }
  if(Object.keys(errors).length > 0){
    setSelectErrors(errors)
  }

  return errors
}
const {categoryLocations} = A.useSelector(A.customerSelector);
const {locations, categories} = categoryLocations;

const transFormArray = (array, id, name, check) => {
    const newArray = array?.filter(region => region[id] === check).map(region => ({
       label: region[name],
       value: region.id
     }));
 return newArray?.sort((a, b) => {
   let x = a.label.toLowerCase();
   let y = b.label.toLowerCase();
   if (x < y) {return -1;}
   if (x > y) {return 1;}
   return 0;
 });
}

const regions = transFormArray(locations, 'parent_id', 'name', null);
const cats = transFormArray(categories, 'parent_id', 'name', null);

const handleRegions = (value) => {
  setSelectErrors({...selectErrors, region: null, })
  setRegion(value)
  setSubLocations(transFormArray(locations, 'parent_id', 'name', value?.value));
}

const handleCats = (value) => {
  setSelectErrors({...selectErrors, category: null, })
  setCategory(value)
  setSubCategories(transFormArray(categories, 'parent_id', 'name', value?.value));
}

const handleTown = (value) => {
  setSelectErrors({...selectErrors, town: null, })
  setSubLocation(value);
}

const handleSubCategories = (value) => {
  setSelectErrors({...selectErrors, subcategory: null, })
    setSubcategory(value)
}
    
const handleForm = () => {
  const errors = handleValidation(region, subLocation, category, subCategory)
  if(Object.keys(errors).length > 0){
    return
  }
router.push(`/ad/post-ad/details?category=${subCategory.value}&location=${subLocation.value}`)
}


useEffect(() => {
  return () => {
  }
}, [selectErrors])
    return(
        <>
       <Layout>
           <div className="row">
            <div className="col-md-10 w3-card-2 p-2 mx-auto">
            <div className="card">
            <div className="card-header w3-blue">
                <h5 className="text-center">Post ad</h5>
            </div>
          <div className={`category-location `}>
          <h5 className="ml-3 mt-1">Select category and location</h5> 
          <hr />
        <form className="w3-container pt-1 ">
        <div className="w3-row">
        <div className="w3-half">
        <div className="select">
        <label>Region:</label><br />
        <Select
        name="region"
        value={region}
        onChange={handleRegions}
        options={regions}
        instanceId="regions"
        isSearchable
        isClearable
        placeholder="Search regions..."
      />
        <span className="error">{selectErrors?.region}</span>
        </div>
        <div className="select mt-3">
        <label>City/District/Town:</label><br />
        <Select
        name="town"
        value={subLocation}
        onChange={handleTown}
        options={subLocations}
        instanceId="towns"
        isSearchable
        isClearable
        placeholder="Search sublocations..."
        isDisabled={region ? false : true}
        />
        <span className="error">{selectErrors?.town}</span>
        </div>
        </div>
        <div className="w3-half">
        <div className="select">
        <label>Category:</label><br />
        <Select
        name="category"
        value={category}
        onChange={handleCats}
        options={cats}
        instanceId="categories"
        isSearchable
        isClearable
        placeholder="Search categories..."
      />
        <span className="error">{selectErrors?.category}</span>
        
        </div>
        <div className="select mt-3">
        <label>Subcategory:</label><br />
        <Select
        name="subcatcategory"
        value={subCategory}
        onChange={handleSubCategories}
        options={subCategories}
        instanceId="subcategories"
        isSearchable
        isClearable
        isDisabled={category ? false : true}
        placeholder="Search subcategories..."
      />
        <span className="error">{selectErrors?.subcategory}</span>
        </div>
        </div>
     </div> 
        <div className="pb-2 next col-md-4 mx-auto my-5">
        <a className="btn " onClick={handleForm}>Next</a>
        </div>
        </form>
          </div>
        </div>
            </div>
           </div>
       </Layout>
       <style jsx>
        {`
            .select{
                max-width: 300px;
            }
            .next a{
                width: 100%;
                background: green;
                color: white;
            }
            
            @media(max-width: 768px){
                    .w3-half{
                        margin-bottom: 20px;
                    }

                }    
        `}
       </style>
        </>
    )
}

export default AuthRoute(PostAd)

export const getServerSideProps = A.wrapper.getServerSideProps(
    async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
    await store.dispatch(A.categoryLocation({url: '/api/category-location', cookie: cookie.get('customer_token')}))

    }
  )