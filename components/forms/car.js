import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';
import Select from 'react-select';


const Car = A.forwardRef(({control, errors, ad}, ref) => {
        const [models, setModels] = A.useState();   
        const dispatch = A.useDispatch();
        const upper = new A.TransForm();
        const isAd = Object.keys(ad).length > 0 && ad.category === "Cars";
const {childItems, parentItems} = A.useSelector(A.customerSelector);


const transFormArray = (array, id, name, check) => {
  const newArray = array?.filter(item => item[id] === check).map(item => ({
     label: item[name],
     value: item.id
   }));
   return newArray;
  }
  const handleModels = (e) => {
    setModels(transFormArray(childItems, 'car_brand_id', 'model', e))
  }
   A.useEffect(() => {
  if(isAd){
    setModels(transFormArray(childItems, 'car_brand_id', 'model', ad.car_brand.id))
  }
   return () => {}
 }, [isAd, childItems])
 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          car_brand_id: yup.string().required(),
          car_model_id: yup.string().required(),
          model_year: yup.string().required(),
          mileage: yup.string().required(),
          transmission: yup.string().required(),
          fuel_type: yup.string().required(),
          engine_capacity: yup.string().required()  
        }))
      }, 2000)
        
        dispatch(A.parentOptions({url: '/api/car-brands'}))
        dispatch(A.childOptions({url: '/api/car-models'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <label htmlFor="car_brand_id" className="label">Brand</label>
            <A.Controller
            control={control}
            defaultValue={isAd ? ad.car_brand.id : null}
            name="car_brand_id"
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
            name="car_brand_id"
            instanceId="car_brand_id"
            isSearchable
            placeholder="Search brands..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.car_brand.brand), value: ad.car_brand.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.car_brand_id?.message}</span>
           <br />
           <label htmlFor="car_model_id" className="label">Model</label>
           <A.Controller
            control={control}
            defaultValue={isAd ? ad.car_model.id : null}
            name="car_model_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={models}
            name="car_model_id"
            instanceId="car_model_id"
            isSearchable
            placeholder="Search models..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.car_model.model), value: ad.car_model.id} : null}
            isDisabled={models ? false : true}
          />
          
            )}
        />
        <span className="error">{errors.car_model_id?.message}</span>
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
            <Field.Radio 
            name="transmission"
            title="Transmission"
            errors={errors}
            options={['Manual', 'Automatic','Other']}
            ref={ref}
            defaultChecked={ad.transmission ?? ''}
            />
            <br />
            <Field.CheckBox 
            name="fuel_type"
            defaultChecked={ad.fuel_type ?? ''}
            title="Fuel Type"
            errors={errors}
            options={['Diesel', 'Petrol','CNG', 'Hybrid', 'Electric', 'Other']}
            ref={ref}
            />
            <br />
            <Field.Input 
                name="engine_capacity"
                defaultValue={ad.engine_capacity ?? ''}
                ref={ref}
                type="number"
                title="Engine Capacity (Liter)"
                placeholder="Engine Capacity"
                errors={errors}
            />
            </div>
        </div> 
        </>
    )
})


export default Car