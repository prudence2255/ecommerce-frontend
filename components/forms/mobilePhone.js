import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';
import Select from 'react-select';


const MobilePhone = A.forwardRef(({control, errors, required}, ref) => {
        const [models, setModels] = A.useState();   
        const dispatch = A.useDispatch();

const {childItems, parentItems} = A.useSelector(A.customerSelector);

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
      setTimeout(() => {
        dispatch(A.setErrors({
          mobile_brand_id: yup.string().required(),
          mobile_model_id: yup.string().required()
        }))
       }, 5000)
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
            defaultValue=""
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
            defaultValue=""
          />
          
            )}
        />
        <span className="error">{errors.mobile_brand_id?.message}</span>
           <br />
           <label htmlFor="mobile_model_id" className="label">Model</label>
           <A.Controller
            control={control}
            defaultValue=""
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
            defaultValue=""
            isDisabled={models ? false : true}
          />
          
            )}
        />
        <span className="error">{errors.mobile_model_id?.message}</span>
            <br />
            <Field.Input 
                name="edition"
                defaultValue=""
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
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default MobilePhone