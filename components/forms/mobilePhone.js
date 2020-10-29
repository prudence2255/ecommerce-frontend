import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';
import Select from 'react-select';


const MobilePhone = A.forwardRef(({control, errors, required, ad}, ref) => {
        const [models, setModels] = A.useState();   
        const dispatch = A.useDispatch();
        const isAd = Object.keys(ad).length > 0 && ad.category === "Mobile Phones";
 const {childItems, parentItems} = A.useSelector(A.customerSelector);
const upper = new A.TransForm();
const transFormArray = (array, id, name, check) => {
  const newArray = array?.filter(item => item[id] === check).map(item => ({
     label: item[name],
     value: item.id
   }));
   return newArray;
  }
  const handleModels = (e) => {
    setModels(transFormArray(childItems, 'mobile_brand_id', 'model', e))
  }
 A.useEffect(() => {
  if(isAd){
    setModels(transFormArray(childItems, 'mobile_brand_id', 'model', ad.mobile_brand.id))
  }
   return () => {}
 }, [isAd, childItems])

    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          mobile_brand_id: yup.string().required(),
          mobile_model_id: yup.string().required()
        }))
       }, 2000)
        dispatch(A.parentOptions({url: '/api/mobile-brands'}))
        dispatch(A.childOptions({url: '/api/mobile-models'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <label htmlFor="mobile_brand_id" className="label">Brand</label>
            <A.Controller
            control={control}
            defaultValue={isAd ? ad.mobile_brand.id : null}
            name="mobile_brand_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
             handleModels(e.value)
            }}
            options={parentItems?.map(item => ({
              label: item.brand,
              value: item.id,
            }))}
            name="mobile_brand_id"
            instanceId="mobile_brand_id"
            isSearchable
            placeholder="Search brands..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.mobile_brand.brand), value: ad.mobile_brand.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.mobile_brand_id?.message}</span>
           <br />
           <label htmlFor="mobile_model_id" className="label">Model</label>
           <A.Controller
            control={control}
            defaultValue={isAd ? ad.mobile_model.id : null}
            name="mobile_model_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={models}
            name="mobile_model_id"
            instanceId="mobile_model_id"
            isSearchable
            placeholder="Search models..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.mobile_model.model), value: ad.mobile_model.id} : null}
            isDisabled={models ? false : true}
          />
          
            )}
        />
        <span className="error">{errors.mobile_model_id?.message}</span>
            <br />
            <Field.Input 
                name="edition"
                defaultValue={ad.edition ?? ''}
                ref={ref}
                title="Edition (optional)"
                type="text"
                placeholder="Edition"
                errors={errors}
            />
            <br />
            <Field.CheckBox 
            name="features"
            title="Features (optional)"
            errors={errors}
            options={[
              'Bluetooth', 'Camera','Dual-lens Camera',
              'Dual SIM', 'Expandable Memory', 'Fingerprint Sensor',
              'GPS', 'Physical Keyboard', 'Motion Sensors', '3G', '4G',
              'GSM', 'Touch Screen'
              ]}
              defaultChecked={ad.features ?? ''}
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default MobilePhone