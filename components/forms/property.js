import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';
import Select from 'react-select';


const Property = A.forwardRef(({control, errors}, ref) => {  
        const dispatch = A.useDispatch();

const {parentItems} = A.useSelector(A.customerSelector);

  
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          property_id: yup.string().required(),
          size: yup.string().required()
        }))
      }, 5000)
        
        dispatch(A.parentOptions({url: '/api/property'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <label htmlFor="property_id" className="label">Commercial Property Type</label>
            <A.Controller
            control={control}
            defaultValue=""
            name="property_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={parentItems?.map(item => ({
              label: item.type,
              value: item.id,
            }))}
            name="property_id"
            instanceId="property_id"
            isSearchable
            placeholder="Search property types..."
            defaultValue=""
          />
          
            )}
        />
        <span className="error">{errors.property_id?.message}</span>
            <br />
            <Field.Input 
                name="size"
                defaultValue=""
                ref={ref}
                title="Size"
                type="text"
                placeholder="Size in sqm or sqft"
                errors={errors}
            />
            <br />
            <Field.Input 
                name="landmark"
                defaultValue=""
                ref={ref}
                title="Street / Landmark (optional)"
                type="text"
                placeholder="Enter street or landmark"
                errors={errors}
            />
            <br />
           
            </div>
        </div> 
        </>
    )
})


export default Property