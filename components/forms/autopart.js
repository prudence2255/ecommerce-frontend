import * as A from 'components/adminImports';
import * as yup from "yup";
import Select from 'react-select';


const AutoPart = A.forwardRef(({control, errors}, ref) => {
          
        const dispatch = A.useDispatch();

const {parentItems} = A.useSelector(A.customerSelector);


  
 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          type_id: yup.string().required(),
        }))
      }, 5000)
        
        dispatch(A.parentOptions({url: '/api/auto-parts'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            <label htmlFor="type_id" className="label">Item Type</label>
            <A.Controller
            control={control}
            defaultValue=""
            name="type_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={parentItems?.map(item => ({
              label: item.type,
              value: item.id,
            }))}
            name="type_id"
            instanceId="type_id"
            isSearchable
            placeholder="Search item types..."
            defaultValue=""
          />
          
            )}
        />
        <span className="error">{errors.type_id?.message}</span>
            </div>
        </div> 
        </>
    )
})


export default AutoPart