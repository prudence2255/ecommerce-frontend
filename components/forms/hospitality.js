import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';


const Hospitality = A.forwardRef(({control, errors}, ref) => {
        const dispatch = A.useDispatch();



    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                service_type: yup.string().required(),
              }))
        }, 5000)
       
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <Field.Radio 
            name="service_type"
            title="Service Type"
            errors={errors}
            options={['Event & Party Management', 'Wedding Planners', 'Entertainment', 'Food & Catering']}
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default Hospitality