import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';


const Health = A.forwardRef(({control, errors, ad}, ref) => {
        const dispatch = A.useDispatch();



    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                service_type: yup.string().required(),
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
            name="service_type"
            defaultChecked={ad.service_type ?? ''}
            title="Service Type"
            errors={errors}
            options={['Wellness & beauty', 'Fitness & Training','Fashion & Grooming', 'Medical Services']}
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default Health