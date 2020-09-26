import * as A from 'components/adminImports';
import Layout from 'components/home/layout';
import AuthRoute from 'components/home/auth';
import * as Field from 'components/forms/formComp';
import * as Forms from 'components/forms/forms';
import * as yup from "yup";
import Axios from 'axios';
import Cookies from 'universal-cookie';

import ImageUpload from 'components/forms/imageUpload';

const cookies = new Cookies();
const apiUrl = process.env.API_URL;

function Form(){
const [photoErr, setPhotoErr] = A.useState(null);   
const {categoryLocations, photos} = A.useSelector(A.customerSelector);
const {schemaObject} = A.useSelector(A.formSelector);
const {locations, categories} = categoryLocations;
const router = A.useRouter();
const dispatch = A.useDispatch();
const {category, location} = router.query;
const {error} = A.useSelector(A.errorsSelector)


const childCategory = categories?.find(cat => cat.id === Number(category))
const childLocation = locations?.find(loc => loc.id === Number(location))
const parentCategory = categories?.find(cat => cat.id === Number(childCategory.parent_id))
const parentLocation = locations?.find(loc => loc.id === Number(childLocation.parent_id))

const catLoc = {
    parent_category_id: parentCategory?.id,
    child_category_id: childCategory?.id,
    parent_location_id: parentLocation?.id,
    child_location_id: childLocation?.id,
    category: childCategory?.name,
}

const schema = yup.object().shape({
    title: yup.string().required(),
    condition: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().min(0).required(),
    ...schemaObject,
  });

const {register, reset, handleSubmit, errors, control } = A.useForm({
    resolver: A.yupResolver(schema),   
    })

 const fileUpload = async(file) => {
     dispatch(A.startLoading())
    const formData = new FormData();
    formData.append('photo', file);
   try {
    const res = await Axios(`${apiUrl}/api/image-upload`, {
        method: 'POST',
        data: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${cookies.get("customer_token")}`
          }
    })
    return res.data.data     
   } catch (error) {
       if(error.response){
           setPhotoErr('The photo must be a file of type: jpeg, jpg, png.')
           dispatch(A.endLoading())
       }else{
           console.log(error.message)
           dispatch(A.endLoading())
       }
   }
    
 }
 
 const sendFile = async() => {
     let nPhotos = [];
    try {
        for (let i = 0; i < photos.length; i++) {
            let photoUrl = await fileUpload(photos[i])
            nPhotos = [...nPhotos, photoUrl]    
        }
        return nPhotos
    } catch (error) {
        if(error) { return}
    }
 }

const submit = (data) => {
         const newData = {...data, ...catLoc}            
        dispatch(A.addAd({ad: {...newData}, url: '/api/ads'})).then(A.unwrapResult)
         .then(() => {
                A.Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Saved successfully',
                    showConfirmButton: false,
                    timer: 1800
                  })
             reset({})     
            }).catch(e  => e.message) 
               
     
} 

const sendData = async(data) => {
    if(photos.length === 0){
        setPhotoErr('Please upload photo(s)')
        return
    }else{
        setPhotoErr(null);
    }
    const allUrls = sendFile();
    allUrls.then((nPhotos) => {
        const newData = {...data, images: nPhotos}
        submit(newData)
    })
    .catch(e => e.message)
}

A.useEffect(() => { 
    return () => {}
}, [])
    

    return(
        <>
        <Layout>
        {error && (
            <A.ShowError />
        )}
           <div className="row">
            <div className="col-md-10 w3-card-2 p-2 mx-auto">
            <div className="row">
            <div className=" back">
            <a className="btn " onClick={() => router.back()}>Back to previous step</a>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
            <div className="card">
            <div className="card-header w3-blue">
                <h5 className="text-center">Post ad</h5>
            </div>
          
          <div className="w3-container pt-1">
          <h5 className="ml-2 mt-1">Ad Details</h5>
          <hr />
          <form className="w3-container pt-1 " onSubmit={handleSubmit(sendData)} encType="multipart/form-data">
            <div className="col-md-8 mx-auto">
            <Field.Input 
                name="title"
                type="text"
                title="Title"
                placeholder="Keep it short!"
                defaultValue=""
                ref={register}
                errors={errors}
            /><br />
            <Field.Radio 
                name="condition"
                title="Condition"
                options={['Used', 'New']}
                ref={register}
                errors={errors}
            /><br />
            <div className="sub-form my-3">
            {childCategory.name === "Mobile Phones" && <Forms.MobilePhone 
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}
            {childCategory.name === "Computers & Tablets" && <Forms.Computer 
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}  
             {childCategory.name === "Computer Accessories" && <Forms.ComputerAccessory
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}    
             {childCategory.name === "Tvs" && <Forms.Tv
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}  
            {childCategory.name === "Tv & Video Accessories" && <Forms.TvAccessory
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />} 
              {childCategory.name === "Cameras & Camcorders" && <Forms.Camera
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}    
              {childCategory.name === "Audio & Mp3" && <Forms.Audio
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />} 
                                                    
               {childCategory.name === "Cars" && <Forms.Car
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}    
               {childCategory.name === "Motorbikes & Scooters" && <Forms.Motorbike
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}  

                {childCategory.name === "Auto Parts & Accessories" && <Forms.AutoPart
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />} 
                 {childCategory.name === "Beauty Products" && <Forms.BeautyProduct
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}  
                {childCategory.name === "Clothing & Fashion" && <Forms.Clothing
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />} 
                {childCategory.name === "Shoes & Footwear" && <Forms.FootWear
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}  
               {childCategory.name === "Commercial Property" && <Forms.Property
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />} 
             {childCategory.name === "Houses" && <Forms.House
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />} 
             {childCategory.name === "Apartments" && <Forms.House
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />} 
           {childCategory.name === "Land" && <Forms.Land
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}     
             {childCategory.name === "Electricity, AC & Bathroom" && <Forms.Electricity
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}     
              {childCategory.name === "Furniture" && <Forms.Furniture
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}     
           {childCategory.name === "Home Appliances" && <Forms.HomeAp
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}     
            {childCategory.name === "Domestic & Personal Services" && <Forms.Domestic
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}     
             {childCategory.name === "Events & Hospitality" && <Forms.Hospitality
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}     
            {childCategory.name === "Trade Services" && <Forms.Trade
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}     
            {childCategory.name === "Health & Lifestyle" && <Forms.Health
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    />}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            </div>
            <Field.TextArea 
                 name="description"
                title="Description"
                placeholder="More details!"
                value=""
                ref={register}
                errors={errors}
            /><br/>
            <Field.Input 
                name="price"
                title="Price (GHC)"
                type="number"
                placeholder="Pick a good price!"
                defaultValue=""
                ref={register}
                errors={errors}
            /><br />
            <Field.CheckBox 
                 name="negotiable"
                title=""
                options={['Negotiable']}
                ref={register}
                errors={errors}
            /><br />
            
            <div className="photos mt-5" >
            <h5 className="ml-2 mt-1">Add Photos (up to 6)</h5> 
            <hr />
            <ImageUpload error={photoErr}/>
            </div>
            
            </div>
            <div className="pb-2 next col-md-4 mx-auto my-5 post-ad">
               <button className="w3-btn" >Post ad</button> 
            </div>
            </form>
            
          </div>
          </div>
            </div>

            </div>
           
            </div>
           </div>
       </Layout>

       <style jsx>
        {`   
            .back a{
                width: 100%;
                color: green;
            } 
           
          .post-ad button{
            width: 100%;
                background: green;
                color: white;
          } 
        `}
       </style>
        </>
    )
}

export default AuthRoute(Form)

export const getServerSideProps = A.wrapper.getServerSideProps(
    async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
    await store.dispatch(A.categoryLocation({url: '/api/category-location', cookie: cookie.get('customer_token')}))

    }
  )