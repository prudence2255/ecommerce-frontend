import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';


const Furniture = A.forwardRef(({control, errors}, ref) => {
        const dispatch = A.useDispatch();



    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                furniture_type: yup.string().required(),
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
            name="furniture_type"
            title="Furniture Type"
            errors={errors}
            options={['Bed / Bedding', 'Shelf / Storage','Chair / Table', 'Textile / Decoration', 'Other']}
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default Furniture