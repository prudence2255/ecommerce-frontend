import * as A from 'components/adminImports';
import Layout from 'components/home/layout';
import AuthRoute from 'components/home/auth';
import * as Field from 'components/forms/formComp';
import * as Forms from 'components/forms/forms';
import * as yup from "yup";
import Axios from 'axios';
import Cookies from 'universal-cookie';
import {LeftIcon} from 'components/admin/icons';
import ImageUpload from 'components/forms/imageUpload';
import Contact from 'components/forms/contact';

const cookies = new Cookies();
const apiUrl = process.env.API_URL;

function Form(){
 const {ad} = A.useSelector(A.customerSelector); 
 const isAd = Object.keys(ad).length > 0;
 const router = A.useRouter();
const dispatch = A.useDispatch();
const [photoErr, setPhotoErr] = A.useState(null);
const [contactErr, setContactErr] = A.useState(null);   
const {categoryLocations, photos, contacts, loginCustomer} = A.useSelector(A.customerSelector);
const {schemaObject} = A.useSelector(A.formSelector);
const {locations, categories} = categoryLocations;
const {category, location} = router.query;
const {error} = A.useSelector(A.errorsSelector);



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
    location: childLocation?.name,
    main_category: parentCategory?.name,
    main_location: parentLocation?.name
}

const cats = [
    "Mobile Phones", "Computers & Tablets", "Tvs", "Mobile Phone Accessories",
    "Computer Accessories", "Cameras & Camcorders", "Tv & Video Accessories", 
    "Audio & Mp3", "Cars", "Motorbikes & Scooters", "Auto Parts & Accessories",
    "Electricity, AC & Bathroom",
]

const isCondition = cats.includes(childCategory.name);

const schema = yup.object().shape({
    title: yup.string().required(),
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
           console.log(error.response)
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
        dispatch(isAd ? A.updateAd({ad: {...newData}, url: '/api/ads/', slug: ad.slug}) : A.addAd({ad: {...newData}, url: '/api/ads'})).then(A.unwrapResult)
         .then(() => {
                A.Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${isAd ? 'Ad updated successfully' : 'Ad Saved successfully'}`,
                    showConfirmButton: false,
                    timer: 1800
                  })
    //reset({}) 
    router.push('/ad/account')  
            }).catch(e  => e.message)     
} 

const sendData = async(data) => {
    if(photos.length === 0){
        setPhotoErr('Please upload photo(s)')
        return
    }else{
        setPhotoErr(null);
    }

    if(contacts.length === 0){
        setContactErr('Please add your contact(s)')
        return
    }else{
        setContactErr(null);
    }
    const allUrls = sendFile();
    allUrls.then((nPhotos) => {
        const newData = {...data, 
                        images: nPhotos, 
                        contact: contacts}                
        submit(newData)
    })
    .catch(e => e.message)
}

A.useEffect(() => {
    return () => {}
}, [ad])
    

    return(
        <>
        <Layout>
        {error && (
            <A.ShowError />
        )}
           <div className="container">
           <div className="row">
            <div className="col-md-10 w3-card-2 p-2 mx-auto">
            <div className="row">
            <div className=" back">
            <a className="btn " onClick={() => router.back()}> <LeftIcon /> Back to previous step</a>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12">
            <div className="card">
            <div className="card-header w3-blue">
                <h5 className="text-center">{isAd ? 'Update ad' : 'Post ad'}</h5>
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
                defaultValue={ad.title ?? ''}
                ref={register}
                errors={errors}
            /><br />
            {isCondition && (
                <Field.Radio 
                name="condition"
                title="Condition"
                options={['Used', 'New']}
                defaultChecked={ad.condition ?? 'Used'}
                ref={register}
                errors={errors}
            />
            )}
            <br />
            <div className="sub-form my-3">
            {childCategory.name === "Mobile Phones" && <Forms.MobilePhone 
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}
            {childCategory.name === "Computers & Tablets" && <Forms.Computer 
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}  
             {childCategory.name === "Computer Accessories" && <Forms.ComputerAccessory
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}    
             {childCategory.name === "Tvs" && <Forms.Tv
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}  
            {childCategory.name === "Tv & Video Accessories" && <Forms.TvAccessory
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />} 
              {childCategory.name === "Cameras & Camcorders" && <Forms.Camera
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}    
              {childCategory.name === "Audio & Mp3" && <Forms.Audio
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />} 
                                                    
               {childCategory.name === "Cars" && <Forms.Car
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}    
               {childCategory.name === "Motorbikes & Scooters" && <Forms.Motorbike
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}  

                {childCategory.name === "Auto Parts & Accessories" && <Forms.AutoPart
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />} 
                 {childCategory.name === "Beauty Products" && <Forms.BeautyProduct
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}  
                {childCategory.name === "Clothing & Fashion" && <Forms.Clothing
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />} 
                {childCategory.name === "Shoes & Footwear" && <Forms.FootWear
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}  
               {childCategory.name === "Commercial Property" && <Forms.Property
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />} 
             {childCategory.name === "Houses" && <Forms.House
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />} 
             {childCategory.name === "Apartments" && <Forms.House
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />} 
           {childCategory.name === "Land" && <Forms.Land
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}     
             {childCategory.name === "Electricity, AC & Bathroom" && <Forms.Electricity
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}     
              {childCategory.name === "Furniture" && <Forms.Furniture
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}     
           {childCategory.name === "Home Appliances" && <Forms.HomeAp
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}     
            {childCategory.name === "Domestic & Personal Services" && <Forms.Domestic
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}     
             {childCategory.name === "Events & Hospitality" && <Forms.Hospitality
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}     
            {childCategory.name === "Trade Services" && <Forms.Trade
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}     
            {childCategory.name === "Health & Lifestyle" && <Forms.Health
                                                    control={control} 
                                                    errors={errors}
                                                    ref={register}
                                                    ad={ad}
                                                    />}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            </div>
            <Field.TextArea 
                 name="description"
                title="Description"
                placeholder="More details!"
                defaultValue={ad.description ?? ''}
                ref={register}
                errors={errors}
            /><br/>
            <Field.Input 
                name="price"
                title="Price (GHC)"
                type="number"
                placeholder="Pick a good price!"
                defaultValue={ad.price ?? ''}
                ref={register}
                errors={errors}
            /><br />
            <Field.CheckBox 
                 name="negotiable"
                title=""
                options={['Negotiable']}
                ref={register}
                errors={errors}
                defaultChecked={ad.negotiable ?? ''}
            /><br />
            
            <div className="photos mt-5" >
            <h5 className="ml-2 mt-1">Add Photos (up to 6)</h5> 
            <hr />
            <ImageUpload error={photoErr} ad={ad}/>
            </div>
            <div className="photos mt-5" >
            <h5 className="ml-2 mt-1">Contact details</h5> 
            <hr />
            <Contact error={contactErr} ad={ad} customer={loginCustomer}/> 
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
    async ({store, req, query}) => {
        const {edit} = query;
    const cookie = new A.Cookies(req.headers.cookie);
    await store.dispatch(A.categoryLocation({url: '/api/category-location', cookie: cookie.get('customer_token')}));
    edit && await store.dispatch(A.loadAd({url: `/api/show-ad/${edit}`, cookie: cookie.get('customer_token')}));
    await store.dispatch(A.loadCustomer(cookie.get('customer_token')))}
  )