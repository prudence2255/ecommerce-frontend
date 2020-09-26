import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';

const House = A.forwardRef(({control, errors}, ref) => {  
        const dispatch = A.useDispatch();

  
    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                beds: yup.string().required(),
                size: yup.string().required(),
                baths: yup.string().required()
              }))
        }, 5000)
        
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            
            <Field.Input 
                name="beds"
                defaultValue=""
                ref={ref}
                title="Beds"
                type="number"
                placeholder="Enter no of beds"
                errors={errors}
            />
            <br />
            <Field.Input 
                name="baths"
                defaultValue=""
                ref={ref}
                title="Baths"
                type="number"
                placeholder="Enter no of baths"
                errors={errors}
            />
            <br />
            <Field.Input 
                name="size"
                defaultValue=""
                ref={ref}
                title="Size"
                type="text"
                placeholder="Enter size in sqm or sqft"
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


export default House