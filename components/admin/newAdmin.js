
import * as yup from "yup"
import * as A from '../adminImports';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    c_password: yup.string().required().oneOf([yup.ref("password")]),
  });


export default function NewAdmin({adminModal, setAdminModal}) {
    const {error} = A.useSelector(A.errorsSelector)
    const dispatch = A.useDispatch()
    const { register, reset, handleSubmit, errors } = A.useForm({
        resolver: A.yupResolver(schema)
      })

    const closeModal = (e) => {
        e.preventDefault()
        setAdminModal(false);
    }
   

    const submit = (data) => {
        dispatch(A.addItem({item: data, url: '/api/register'})).then(A.unwrapResult)
        .then(() => {
            setAdminModal(false);
            A.Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Admin has been saved',
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
        <div className={`w3-modal ${adminModal ? 'openModal' : ''}`}>
        <div className="w3-modal-content w3-animate-zoom">
        <div className="w3-container">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" text-center"> Add new admin</h5>
        </div>
    <div className="card-body">
    <form className="w3-container w3-card-2 w3-light-grey" onSubmit={handleSubmit(submit)}>
  <p>
  <label>Name</label>
  <input className="w3-input w3-border w3-round" name="name" type="text" ref={register}/>
  <span className="error">{errors.name?.message}</span>
  </p>
  <p>
  <label>Email</label>
  <input className="w3-input w3-border w3-round" name="email" type="email" ref={register}/>
  <span className="error">{errors.email?.message}</span>
  </p>
  <p>
  <label>Password</label>
  <input className="w3-input w3-border w3-round" name="password" type="password" ref={register}/>
  <span className="error">{errors.password?.message}</span>
  </p>
  <p>
  <label>Confirm password</label>
  <input className="w3-input w3-border w3-round" name="c_password" type="password" ref={register}/>
  <span className="error">{errors.c_password?.message}</span>
  </p>
  <p>
  <button className="w3-btn w3-blue">submit</button>
  <button className="w3-btn w3-yellow ml-5" onClick={closeModal}>Cancel</button>
  </p>
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
            `}
        </style>
        </>
    )
}