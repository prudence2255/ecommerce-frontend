import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';
import Select from 'react-select';


const Motorbike = A.forwardRef(({control, errors, ad}, ref) => {
        const [models, setModels] = A.useState();   
        const dispatch = A.useDispatch();
        const upper = new A.TransForm();
        const isAd = Object.keys(ad).length > 0 && ad.category === "Motorbikes & Scooters"
const {childItems, parentItems} = A.useSelector(A.customerSelector);


const transFormArray = (array, id, name, check) => {
  const newArray = array?.filter(item => item[id] === check).map(item => ({
     label: item[name],
     value: item.id
   }));
   return newArray;
  }
  const handleModels = (e) => {
    setModels(transFormArray(childItems, 'motor_brand_id', 'model', e))
  }
 
  A.useEffect(() => {
  if(isAd){
    setModels(transFormArray(childItems, 'motor_brand_id', 'model', ad.motor_brand.id))
  }
   return () => {}
 }, [isAd, childItems])
 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          motor_brand_id: yup.number().required(),
          motor_model_id: yup.number().required(),
          model_year: yup.number().required(),
          mileage: yup.number().required(),
          engine_capacity: yup.number().required()  
        }))
      }, 2000)
        
        dispatch(A.parentOptions({url: '/api/motor-brands'}))
        dispatch(A.childOptions({url: '/api/motor-models'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <label htmlFor="motor_brand_id" className="label">Brand</label>
            <A.Controller
            control={control}
            defaultValue={isAd ? ad.motor_brand.id : null}
            name="motor_brand_id"
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
            name="motor_brand_id"
            instanceId="motor_brand_id"
            isSearchable
            placeholder="Search brands..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.motor_brand.brand), value: ad.motor_brand.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.motor_brand_id?.message}</span>
           <br />
           <label htmlFor="motor_model_id" className="label">Model</label>
           <A.Controller
            control={control}
            defaultValue={isAd ? ad.motor_model.id : null}
            name="motor_model_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={models}
            name="motor_model_id"
            instanceId="motor_model_id"
            isSearchable
            placeholder="Search models..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.motor_model.model), value: ad.motor_model.id} : null}
            isDisabled={models ? false : true}
          />
          
            )}
        />
        <span className="error">{errors.motor_model_id?.message}</span>
            <br />
            <Field.Input 
                name="edition"
                defaultValue={ad.edition ?? ''}
                ref={ref}
                type="text"
                title="Trim / Edition (optional)"
                placeholder="Trim /Edition"
                errors={errors}
            />
            <br />
            <Field.Input 
                name="model_year"
                defaultValue={ad.model_year ?? ''}
                ref={ref}
                type="number"
                title="Model Year"
                placeholder="Model Year"
                errors={errors}
            />
            <br />
            <Field.Input 
                name="mileage"
                defaultValue={ad.mileage ?? ''}
                ref={ref}
                type="number"
                title="Mileage (Km)"
                placeholder="Mileage"
                errors={errors}
            />
            <br />
           
            <Field.Input 
                name="engine_capacity"
                defaultValue={ad.engine_capacity ?? ''}
                ref={ref}
                type="number"
                step="0.1"
                title="Engine Capacity (cc)"
                placeholder="Engine Capacity"
                errors={errors}
            />
            </div>
        </div> 
        </>
    )
})


export default Motorbike