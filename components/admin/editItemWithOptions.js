import * as yup from "yup"
import * as A from '../adminImports';
import Select from 'react-select';

export default function EditItemWithOptions(props) {

  const {
schema, optionName, setEditOptionsModal,
editOptionsModal, path, title, inputLabel,
inputName, options, optionsLabel, instanceId,
placeholder, item, 
  } = props;

const editValue = options.find(option => option.value === item[optionName]);

const [value, setValue] = A.useState();

const handleChange = (e) => {
  setValue(e)
}

    const {error} = A.useSelector(A.errorsSelector)
    const dispatch = A.useDispatch()
    const schemaObject = yup.object().shape(schema);
  
    const { register, reset, handleSubmit, errors,} = A.useForm({
      resolver: A.yupResolver(schemaObject),   
      })
     
    const closeModal = (e) => {
      e.preventDefault();
      setEditOptionsModal(false);
      reset({})
  }
 
      const submit = (data) => {
        const newData = {...data, [optionName]: value?.value}
              dispatch(A.updateItem({item: newData, url: path, slug: item.slug})).then(A.unwrapResult)
              .then(() => {
                  setEditOptionsModal(false);
                  A.Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Updated successfully',
                      showConfirmButton: false,
                      timer: 1800
                    })
               reset({})     
              }).catch(e  => e.message)  
                   
    }
    
    A.useEffect(() => {
      setValue(editValue ? {label: editValue?.label, value: editValue?.value} : null)
      return () => {  
      }
    }, [item])
    return(
        <>
        
        {error && (
            <A.ShowError />
        )}
        <div>
        <div className={`w3-modal ${editOptionsModal ? 'openModal' : ''}`}>
        <div className="w3-modal-content w3-animate-zoom">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" text-center"> {title}</h5>
        </div>
    <div className="card-body">
    <form className="w3-container w3-card-2 w3-light-grey" onSubmit={handleSubmit(submit)}>
  <p>
  <label>{inputLabel}</label>
  <input className="w3-input w3-border w3-round" name={inputName}
  defaultValue={item.name || item.model || item.type} type="text" ref={register}/>
  <span className="error">{errors[inputName]?.message}</span>
  </p>
  <div>  <label>{optionsLabel}</label><br />
  <Select
        name={optionName}
        value={value}
        onChange={handleChange}
        options={options}
        instanceId={instanceId}
        isSearchable
        isClearable
        placeholder={placeholder}
      />
  <span className="error">{errors[optionName]?.message}</span>
  </div><br />
  <div className="pb-2">
  <button className="w3-btn w3-blue" >submit</button>
  <button className="w3-btn w3-yellow ml-5" onClick={closeModal}>Cancel</button>
  </div>
    </form>
     </div>
        </div>
        </div>
        </div>
        </div>

        <style jsx>
            {`
                .openModal{
                    display: block
                }
                .default{
                  font-size: 20px;
                }
                .w3-modal-content{
                  max-width: 500px;
                }
            `}
        </style>
        </>
    )
}


