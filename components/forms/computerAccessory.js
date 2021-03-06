

import * as A from 'components/adminImports';
import * as yup from "yup";
import Select from 'react-select';


const Computer = A.forwardRef(({control, errors, ad}, ref) => {  
        const dispatch = A.useDispatch();
        const isAd = Object.keys(ad).length > 0 && ad.category === "Computer Accessories";
const {parentItems} = A.useSelector(A.customerSelector);
const upper = new A.TransForm();
 
 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          computer_accessory_id: yup.string().required()
        }))
      }, 2000)
       
        dispatch(A.parentOptions({url: '/api/computer-accessories'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            
            <label htmlFor="type" className="label">Item Type</label>
            <A.Controller
            control={control}
            defaultValue={isAd ? ad.computer_accessory.id : null}
            name="computer_accessory_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={parentItems?.map(item => ({
              label: item.type,
              value: item.id,
            }))}
            name="computer_accessory_id"
            instanceId="computer_accessory_id"
            isSearchable
            placeholder="Search item types..."
            defaultValue={isAd ? {label:  upper.toUpper(ad.computer_accessory.type), value: ad.computer_accessory.id} : null}
          />
          
            )}
        />
        <span className="error">{errors.computer_accessory_id?.message}</span>
           <br />
           
            </div>
        </div> 
        </>
    )
})


export default Computer