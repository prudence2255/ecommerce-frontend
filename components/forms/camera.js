import * as A from 'components/adminImports';
import * as yup from "yup";
import Select from 'react-select';


const Camera = A.forwardRef(({control, errors, ad}, ref) => {
        const dispatch = A.useDispatch();
        const upper = new A.TransForm();
        const isAd = Object.keys(ad).length > 0 && ad.category === "Cameras & Camcorders";
const {childItems, parentItems} = A.useSelector(A.customerSelector);



  
 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          camera_brand_id: yup.string().required(),
          camera_type_id: yup.string().required()
        }))
      }, 2000)
        
        dispatch(A.parentOptions({url: '/api/camera-types'}))
        dispatch(A.childOptions({url: '/api/camera-brands'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <label htmlFor="type_id" className="label">Item Type</label>
            <A.Controller
            control={control}
            defaultValue={isAd ? ad.camera_type.id : null}
            name="camera_type_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={parentItems?.map(item => ({
              label: item.type,
              value: item.id,
            }))}
            name="camera_type_id"
            instanceId="camera_type_id"
            isSearchable
            placeholder="Search item types..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.camera_type.type), value: ad.camera_type.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.camera_type_id?.message}</span>
           <br />
           <label htmlFor="camera_brand_id" className="label">Brand</label>
           <A.Controller
            control={control}
            defaultValue={isAd ? ad.camera_brand.id : null}
            name="camera_brand_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={childItems?.map(item => ({
              label: item.brand,
              value: item.id,
            }))}
            name="camera_brand_id"
            instanceId="camera_brand_id"
            isSearchable
            placeholder="Search brands..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.camera_brand.brand), value: ad.camera_brand.id} : null}
            
          />
          
            )}
        />
        <span className="error">{errors.camera_brand_id?.message}</span>
            
            </div>
        </div> 
        </>
    )
})


export default Camera