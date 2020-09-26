import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';


const FootWear = A.forwardRef(({control, errors}, ref) => {
        const dispatch = A.useDispatch();



    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                gender: yup.string().required(),
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
            name="gender"
            title="Gender"
            errors={errors}
            options={['Men', 'Women','Unisex']}
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default FootWear