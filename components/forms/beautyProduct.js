import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';


const BeautyProduct = A.forwardRef(({control, errors}, ref) => {
        const dispatch = A.useDispatch();

    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                item_type: yup.string().required(),
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
            name="item_type"
            title="Beauty Product Type"
            errors={errors}
            options={['Cosmetics', 'Grooming / Bodycare','Hair Product', 'Perfume', 'Other']}
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default BeautyProduct