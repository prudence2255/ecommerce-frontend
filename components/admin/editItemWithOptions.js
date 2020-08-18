import * as yup from "yup"
import * as A from '../adminImports';

export default function EditItemWithOptions(props) {
  const {
schema, optionName, setEditOptionsModal,
editOptionsModal, path, title, inputLabel,
inputName, options, optionsLabel, instanceId,
placeholder, item,
  } = props
    const {error} = A.useSelector(A.errorsSelector)
    const dispatch = A.useDispatch()
    const schemaObject = yup.object().shape(schema);
  
    const { register, reset, handleSubmit, errors, control } = A.useForm({
      resolver: A.yupResolver(schemaObject),   
      })
     

    const closeModal = (e) => {
      e.preventDefault();
      setEditOptionsModal(false);
   
  }
 
      const submit = (data) => {
        const newData = Object.assign({}, {...data, 
                    [optionName]: data[optionName] ? data[optionName].value : null})
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
    
    return(
        <>
        
        {error && (
            <A.ShowError />
        )}
        <div>
        <div className={`w3-modal ${editOptionsModal ? 'openModal' : ''}`}>
        <div className="w3-modal-content w3-animate-zoom">
        <div className="w3-container">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" text-center"> {title}</h5>
        </div>
    <div className="card-body">
    <form className="w3-container w3-card-2 w3-light-grey" onSubmit={handleSubmit(submit)}>
  <p>
  <label>{inputLabel}</label>
  <input className="w3-input w3-border w3-round" name={inputName}
  defaultValue={item.name || item.model} type="text" ref={register}/>
  <span className="error">{errors[inputName]?.message}</span>
  </p>
  <div>  <label>{optionsLabel}</label><br />
  <A.SelectOption 
  control={control}
    options={options}
    name={optionName}
    instanceId={instanceId}
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
        </div>

        <style jsx>
            {`

                .openModal{
                    display: block
                }
            `}
        </style>
        </>
    )
}


