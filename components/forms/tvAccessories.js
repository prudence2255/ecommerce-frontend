
import * as Field from 'components/forms/formComp';
import * as A from 'components/adminImports';
import * as yup from "yup";

const TvAccessory = A.forwardRef(({control, errors, ad}, ref) => {  
        const dispatch = A.useDispatch()
    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                item_type: yup.string().required()
              }))
        }, 2000) 
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            
            <Field.Radio 
                name="item_type"
                title="Item Type"
                options={['Projector', 'Video Player', 'Other']}
                ref={ref}
                errors={errors}
                defaultChecked={ad.item_type ?? ''}
            />
        <span className="error">{errors.item_type?.message}</span>
           <br />
           
            </div>
        </div> 
        </>
    )
})


export default TvAccessory