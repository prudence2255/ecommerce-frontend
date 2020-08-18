import * as yup from "yup"
import * as A from '../adminImports';





export default function EditItem(props) {
    
    const {error} = A.useSelector(A.errorsSelector)
    const dispatch = A.useDispatch();
  const {
      schema, editModal, setEditModal,
     title, inputName, path, inputLabel, item,
     defaultValue,
    } = props;
    const schemaObject = yup.object().shape(schema);
    const { register, reset, handleSubmit, errors } = A.useForm({
      resolver: A.yupResolver(schemaObject),   
      })

    const closeModal = (e) => {
      e.preventDefault();
      setEditModal(false);
   
  }
 
      const submit = (data) => {
              dispatch(A.updateItem({item: data, url: path, slug: item.slug})).then(A.unwrapResult)
              .then(() => {
                  setEditModal(false);
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
        <div className={`w3-modal ${editModal ? 'openModal' : ''}`}>
        <div className="w3-modal-content w3-animate-zoom">
        <div className="w3-container">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" text-center">{title} </h5>
        </div>
    <div className="card-body">
    <form className="w3-container w3-card-2 w3-light-grey" onSubmit={handleSubmit(submit)}>
  <p>
  <label>{inputLabel}</label>
  <input className="w3-input w3-border w3-round" name={inputName}
  defaultValue={defaultValue}
  type="text" ref={register}/>
  <span className="error">{errors[inputName]?.message}</span>
  </p>
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


