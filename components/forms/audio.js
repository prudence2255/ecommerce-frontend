import * as A from 'components/adminImports';
import * as yup from "yup";
import Select from 'react-select';


const Audio = A.forwardRef(({control, errors}, ref) => {
        const dispatch = A.useDispatch();

const {parentItems} = A.useSelector(A.customerSelector);



  
 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          audio_type_id: yup.string().required()
        }))
      }, 5000)
        
        dispatch(A.parentOptions({url: '/api/audio-types'}))
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
            name="audio_type_id"
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
            instanceId="audio_type_id"
            isSearchable
            placeholder="Search item types..."
            defaultValue=""
          />
          
            )}
        />
        <span className="error">{errors.audio_type_id?.message}</span>
            
            </div>
        </div> 
        </>
    )
})


export default Audio