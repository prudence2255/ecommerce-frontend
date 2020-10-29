import {useState, useEffect} from 'react';
import Layout from 'components/home/layout';
import Select from 'react-select';
import AuthRoute from 'components/home/auth';
import * as A from 'components/adminImports';
import {TransForm} from 'components/classes';
import * as yup from "yup";


function PostAd(){
const {ad} = A.useSelector(A.customerSelector);
const isAd = Object.keys(ad).length > 0;
const upper = new TransForm();
const [subLocations, setSubLocations] = useState(null);
const [subCategories, setSubCategories] = useState(null);                      
const router = A.useRouter();
const [region, setRegion] = A.useState(null);
const [category, setCategory] = A.useState(null);


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

const handleTowns = (value) => { 
  setRegion(value);
  setSubLocations(transFormArray(locations, 'parent_id', 'name', value));
}

const handleSubcategories = (value) => {
  setCategory(value)
  setSubCategories(transFormArray(categories, 'parent_id', 'name', value));
}

const schema = yup.object().shape({
  'region': yup.mixed().required(),
  'town': yup.mixed().required(),
  'category': yup.mixed().required(),
  'subcategory': yup.mixed().required(), 
 });
 
const {control, errors, handleSubmit} = A.useForm({resolver: A.yupResolver(schema),})  
const handleForm = (e) => { 
  router.push(`/ad/post-ad/details?category=${e.subcategory.value}&location=${e.town.value}`)
}

    return(
        <>
       <Layout>
           <div className="row">
            <div className="col-md-10 w3-card-2 p-2 mx-auto">
            <div className="card">
            <div className="card-header w3-blue">
                <h5 className="text-center">{isAd ? 'Update ad' : 'Post ad'}</h5>
            </div>
          <div className={`category-location `}>
          <h5 className="ml-3 mt-1">Select category and location</h5> 
          <hr />
        <form className="w3-container pt-1 " onSubmit={handleSubmit(handleForm)}>
        <div className="w3-row">
        <div className="w3-half">
        <div className="select">
        <label>Region:</label><br />
        <A.Controller
            control={control}
            name="region"
            defaultValue={isAd ? {label: upper.toUpper(ad.parent_location.name), value: ad.parent_location.id} : null}
            render={({onChange}) => (
            <Select
            onChange={(e) => {
            onChange(e)
             handleTowns(e.value)
            }}
            name="region"
            options={regions}
            instanceId="regions"
            isSearchable
            placeholder="Search regions..."
            defaultValue={isAd ? {label: upper.toUpper(ad.parent_location.name), value: ad.parent_location.id} : null}
          />
            )}
        />
        
        <span className="error">{errors.region?.message}</span>
        </div>
        <div className="select mt-3">
        <label>City/District/Town:</label><br />
        <A.Controller
            defaultValue={isAd ? {label: upper.toUpper(ad.child_location.name), value: ad.child_location.id} : null}
            name="town"
            control={control}
            render={({onChange}) => (
            <Select
            onChange={(e) => {
            onChange(e)
            }}
            options={subLocations}
            defaultValue={isAd ? {label: upper.toUpper(ad.child_location.name), value: ad.child_location.id} : null}
            name="town"
            instanceId="towns"
            isSearchable
            placeholder="Search towns..."
            isDisabled={region ? false : true}
          />
          
            )}
        />
        <span className="error">{errors.town?.message}</span>
        </div>
        </div>
        <div className="w3-half">
        <div className="select">
        <label>Category:</label><br />
        <A.Controller
            defaultValue={isAd ? {label: upper.toUpper(ad.parent_category.name), value: ad.parent_category.id} : null}
            name="category"
            control={control}
            render={({onChange}) => (
            <Select
            onChange={(e) => {
            onChange(e)
             handleSubcategories(e.value)
            }}
            options={cats}
            name="category"
            instanceId="category"
            isSearchable
            placeholder="Search categories..."
            defaultValue={isAd ? {label: upper.toUpper(ad.parent_category.name), value: ad.parent_category.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.category?.message}</span>
        
        </div>
        <div className="select mt-3">
        <label>Subcategory:</label><br />
        <A.Controller
            defaultValue={isAd ? {label: upper.toUpper(ad.child_category.name), value: ad.child_category.id} : null}
            name="subcategory"
            control={control}
            render={({onChange}) => (
            <Select
            onChange={(e) => {
            onChange(e)
            }}
            options={subCategories}
            name="subcategory"
            instanceId="subcategories"
            isSearchable
            isDisabled={category ? false : true}
            placeholder="Search sublocations..."
            defaultValue={isAd ? {label: upper.toUpper(ad.child_category.name), value: ad.child_category.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.subcategory?.message}</span>
        </div>
        </div>
     </div> 
        <div className="pb-2 next col-md-4 mx-auto my-5">
        <button className="btn ">Next</button>
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
            .next button{
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
    await store.dispatch(A.categoryLocation({url: '/api/category-location', cookie: cookie.get('customer_token')}));
    }
  )