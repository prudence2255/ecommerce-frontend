import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';
import Select from 'react-select';


const Motorbike = A.forwardRef(({control, errors}, ref) => {
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
    setModels(transFormArray(childItems, 'motor_brand_id', 'model', e))
  }
 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          motor_brand_id: yup.string().required(),
          motor_model_id: yup.string().required(),
          model_year: yup.string().required(),
          mileage: yup.string().required(),
          engine_capacity: yup.string().required()  
        }))
      }, 5000)
        
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
            defaultValue=""
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
            defaultValue=""
          />
          
            )}
        />
        <span className="error">{errors.motor_brand_id?.message}</span>
           <br />
           <label htmlFor="motor_model_id" className="label">Model</label>
           <A.Controller
            control={control}
            defaultValue=""
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
            defaultValue=""
            isDisabled={models ? false : true}
          />
          
            )}
        />
        <span className="error">{errors.motor_model_id?.message}</span>
            <br />
            <Field.Input 
                name="edition"
                defaultValue=""
                ref={ref}
                type="text"
                title="Trim / Edition (optional)"
                placeholder="Trim /Edition"
                errors={errors}
            />
            <br />
            <Field.Input 
                name="model_year"
                defaultValue=""
                ref={ref}
                type="number"
                title="Model Year"
                placeholder="Model Year"
                errors={errors}
            />
            <br />
            <Field.Input 
                name="mileage"
                defaultValue=""
                ref={ref}
                type="number"
                title="Mileage (Km)"
                placeholder="Mileage"
                errors={errors}
            />
            <br />
           
            <Field.Input 
                name="engine_capacity"
                defaultValue=""
                ref={ref}
                type="number"
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