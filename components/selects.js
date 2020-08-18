import Select from 'react-select';
import {Controller } from "react-hook-form";
import * as A from './adminImports';


export const SelectOption = ({control, name, options,
                            instanceId, placeholder}) => {
           const [value, setValue] = A.useState({})
           const onChange = (e) => {
               setValue(e.value)
           }
    return (
        <>
<Controller 
as={<Select />}  
  control={control}  
  name={name}     
    options={options} 
    onChange={(e) => onChange(e)}
    instanceId={instanceId}
    placeholder={placeholder}
     value={value}
    isClearable
/>
        </>
    )
}