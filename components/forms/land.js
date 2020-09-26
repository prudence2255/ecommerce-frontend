import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';


const Land = A.forwardRef(({control, errors}, ref) => {  
        const dispatch = A.useDispatch();
  
    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                land_type: yup.string().required(),
                size: yup.string().required()
              }))
        })
        
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <Field.Radio 
                name="land_type"
                title="Land Type"
                options={['Agricultural', 'Commercial', 'Residential', 'Other']}
                ref={ref}
                errors={errors}
            /><br />

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


export default Land