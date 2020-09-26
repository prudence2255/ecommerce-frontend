

import * as A from 'components/adminImports';
import * as yup from "yup";
import Select from 'react-select';


const Computer = A.forwardRef(({control, errors}, ref) => {  
        const dispatch = A.useDispatch();

const {parentItems} = A.useSelector(A.customerSelector);

 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          computer_accessory_id: yup.string().required()
        }))
      }, 5000)
       
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
            defaultValue=""
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
            defaultValue=""
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