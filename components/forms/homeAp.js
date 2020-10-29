import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';


const HomeAp = A.forwardRef(({control, errors, ad}, ref) => {
        const dispatch = A.useDispatch();



    A.useEffect(() => {
        setTimeout(() => {
            dispatch(A.setErrors({
                item_type: yup.string().required(),
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
            defaultChecked={ad.item_type ?? ''}
            title="Item Type"
            errors={errors}
            options={['Kitchen / Dining', 'Refrigerator / Freezer','Stove / Microwave', 'Other']}
            ref={ref}
            />
            </div>
        </div> 
        </>
    )
})


export default HomeAp