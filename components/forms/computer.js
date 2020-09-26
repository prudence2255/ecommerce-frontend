

import * as A from 'components/adminImports';
import * as yup from "yup";
import * as Field from 'components/forms/formComp';
import Select from 'react-select';


const Computer = A.forwardRef(({control, errors}, ref) => {  
        const dispatch = A.useDispatch();

const {parentItems} = A.useSelector(A.customerSelector);

 
    A.useEffect(() => {
      setTimeout(() => {
        dispatch(A.setErrors({
          computer_brand_id: yup.string().required(),
          model: yup.string().required(),
          device: yup.string().required()
        }))
      })
        dispatch(A.parentOptions({url: '/api/computer-brands'}))
        return () => {
        }
    }, [])
    return(
        <>
        <div>
            <div className="sub-form my-3">
            
            <Field.Radio 
            name="device"
            title="Device Type"
            errors={errors}
            options={['Desktop Computer', 'Laptop / Netbook', 'Tablet']}
            ref={ref}
            />
            <span className="error">{errors.device?.message}</span>
            <br />
            <label htmlFor="computer_brand_id" className="label">Brand</label>
            <A.Controller
            control={control}
            defaultValue=""
            name="computer_brand_id"
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={parentItems?.map(item => ({
              label: item.brand,
              value: item.id,
            }))}
            name="computer_brand_id"
            instanceId="computer_brand_id"
            isSearchable
            placeholder="Search brands..."
            defaultValue=""
          />
          
            )}
        />
        <span className="error">{errors.computer_brand_id?.message}</span>
           <br />
            <Field.Input 
                name="model"
                defaultValue=""
                ref={ref}
                title="Model"
                type="text"
                placeholder="Model"
                errors={errors}
            />
             <span className="error">{errors.model?.message}</span>
            <br />
           
            </div>
        </div> 
        </>
    )
})


export default Computer