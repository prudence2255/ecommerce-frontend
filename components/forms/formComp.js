import {forwardRef} from 'react';
import Select from 'react-select';
import * as A from 'components/adminImports';



const Input = forwardRef(({title, name , step, type, placeholder, errors, defaultValue, required}, ref) => {
    return(
        <>
        <div>
            <label htmlFor={name} className="label">{title}</label>
            <input 
            className="w3-input w3-border w3-round"
            id={name}
            name={name}
            step={step}
            defaultValue={defaultValue}
            type={type} 
            placeholder={placeholder}
            required={required}
            ref={ref}/>
            <span className="error">{errors[name]?.message}</span>
        </div>
        </>
    )
})

const Radio = forwardRef(({title,  errors, name, options, required, defaultChecked}, ref) => {
    return(
        <>
         <div>
            <label htmlFor={name} className="label">{title}</label><br />
           {options.map(option => (
            <div className="form-check form-check-inline ml-2" key={option}>
             <label className="form-check-label">
            <input type="radio" 
            className="form-check-input" 
            name={name} 
            id={option}
            value={option} 
            required={required}
            defaultChecked={defaultChecked === option ? true : false}
            ref={ref}/>{option}
            
             </label>
            </div>
           ))}
            <span className="error">{errors[name]?.message}</span>
            </div>
        </>
    )
})

const TextArea = forwardRef(({name, title, defaultValue, placeholder, errors, required}, ref) => {
    return(
        <>
         <div>
            <label htmlFor={name} className="label">{title}</label>
           <textarea className="w3-input w3-border w3-round"
            name={name} type="text"
            placeholder={placeholder}
            required={required}
            rows="5" ref={ref} defaultValue={defaultValue}>
         
           </textarea>
            <span className="error">{errors[name]?.message}</span>
            </div>
        </>
    )
})

const CheckBox = forwardRef(({name, title, errors, options, required, defaultChecked}, ref) => {

    const checker = new A.TransForm();
    return(
        <>
         <div>
            <label htmlFor={name} className="label">{title}</label><br />
           {options.map(option => (
            <div className="form-check form-check-inline ml-2" key={option}>
             <label className="form-check-label">
            <input type="checkbox" 
            className="form-check-input" 
            required={required}
            name={name} 
            id={`${option}-1`}
            value={option} 
            defaultChecked={checker.check(defaultChecked, option)}
            ref={ref}/>{option}
            
             </label>
            </div>
           ))}
            <span className="error">{errors[name]?.message}</span>
            </div>
        </>
    )
})

const SelectOption = ({name, title, value, err, handleChange,
                     options, instanceId, placeholder, disabled}) => {
    const [child, setChild] = A.useState();            
    return(
        <>
        <div>
        {/* <label className="label">{title}</label><br />
        <A.Controller
            control={control}
            defaultValue={defaultValue1}
            name={name}
            render={({onChange}) => (
            <Select
            onChange={(e) => {
              onChange(e.value)
            }}
            options={child}
            name={name}
            instanceId={instanceId}
            isSearchable
            placeholder={placeholder}
            defaultValue={defaultValue2}
            isDisabled={child ? false : true}
          />
          
            )}
        /> */}
        </div>
        </>
    )
}

export {
    Input,
    CheckBox,
    Radio,
    TextArea,
    SelectOption
}