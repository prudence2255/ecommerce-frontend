import * as A from 'components/adminImports';
import * as yup from "yup";
import Select from 'react-select';

const AutoPart = A.forwardRef(({control, errors, ad}, ref) => {        
        const dispatch = A.useDispatch();
        const upper = new A.TransForm();
        const isAd = Object.keys(ad).length > 0 && ad.category === "Auto Parts & Accessories";
const {parentItems} = A.useSelector(A.customerSelector);

     A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          item_type_id: yup.mixed().required(),
        }))
      }, 2000)
        
        dispatch(A.parentOptions({url: '/api/auto-parts'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <label htmlFor="item_type_id" className="label">Item Type</label>
            <A.Controller
            control={control}
            defaultValue={isAd ? ad.auto_part?.id : null}
            name="item_type_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={parentItems?.map(item => ({
              label: item.type,
              value: item.id,
            }))}
            name="item_type_id"
            instanceId="item_type_id"
            isSearchable
            placeholder="Search item types..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.auto_part.type), value: ad.auto_part.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.item_type_id?.message}</span>
            </div>
        </div> 
        </>
    )
})


export default AutoPart