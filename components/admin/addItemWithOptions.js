import * as yup from "yup";
import * as A from '../adminImports';
import Select from 'react-select';


export default function AddItemWithOptions(props) {
 
  const {
schema, optionName, setAddOptionsModal,
addOptionsModal, path, title, inputLabel,
inputName, options, optionsLabel, instanceId,
placeholder,
  } = props
    const {error} = A.useSelector(A.errorsSelector)
    const dispatch = A.useDispatch()
    const schemaObject = yup.object().shape(schema);
  
    const { register, reset, handleSubmit, errors, control } = A.useForm({
      resolver: A.yupResolver(schemaObject),   
      })
     

    const closeModal = (e) => {
      e.preventDefault();
      setAddOptionsModal(false);
   
  }

      const submit = (data) => {
        const newData = {...data, [optionName]: data[optionName]?.value}
              dispatch(A.addItem({item: newData, url: path})).then(A.unwrapResult)
              .then(() => {
                  setAddOptionsModal(false);
                  A.Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Saved successfully',
                      showConfirmButton: false,
                      timer: 1800
                    })
               reset({})     
              }).catch(e  => e.message)  
                   
    }
    
    return(
        <> 
        <div>
        <div className={`w3-modal ${addOptionsModal ? 'openModal' : ''}`}>
        {error && (
            <A.ShowError />
        )}
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
  type="text" ref={register}/>
  <span className="error">{errors[inputName]?.message}</span>
  </p>
  <div>
  <label>{optionsLabel}</label><br />
  <A.Controller
      as={<Select />}
        control={control}
        name={optionName}
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
                .w3-modal-content{
                  max-width: 500px;
                }
            `}
        </style>
        </>
    )
}


