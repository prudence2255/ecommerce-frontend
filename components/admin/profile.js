import * as yup from "yup"
import * as A from '../adminImports';


const schema = yup.object().shape({
    name: yup.string().required(),
  });

export default function Profile({profileModal, setProfileModal}) {
  const dispatch = A.useDispatch()
    const {loginAdmin} = A.useSelector(A.adminSelector)
    const {error} = A.useSelector(A.errorsSelector)
    const { register, handleSubmit, errors, reset } = A.useForm({
      resolver: A.yupResolver(schema)
    })

    A.useEffect(() => {
        return () => {
        }
    }, [loginAdmin])
    const closeModal = (e) => {
        e.preventDefault()
        setProfileModal(false);
    }
    const submit = (data) => {
      dispatch(A.updateItem({item: data, url: '/api/users/', slug: loginAdmin.slug})).then(A.unwrapResult)
      .then(() => {
          setProfileModal(false);
          A.Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'updated successfully',
            showConfirmButton: false,
            timer: 1800
          })
      }).catch(e  => e.message)
      
    }
    return(
        <>
        {error && (
          <A.ShowError />
        )}
        <div>
        <div className={`w3-modal ${profileModal ? 'openModal' : ''}`}>
        <div className="w3-modal-content w3-animate-zoom">
        <div className="w3-container">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" text-center"> Profile</h5>
        </div>
    <div className="card-body">
    <h5>Update details</h5>
    <p><span>Email: </span><span>{loginAdmin.email}</span></p>
    <form className="w3-container w3-card-2 w3-light-grey" onSubmit={handleSubmit(submit)}>
  <p>
  <label>Name</label>
  <input className="w3-input w3-border w3-round" name="name" type="text" 
    defaultValue={loginAdmin.name} ref={register}/>
    <span className="error">{errors.name?.message}</span>
  </p>
    <p>
  <button className="w3-btn w3-blue" type="submit">submit</button>
  </p>
    </form>
    <h5 className="my-2">Change password</h5>
    <form className="w3-container w3-card-2 w3-light-grey">
  <p>
  <label>Current password</label>
  <input className="w3-input w3-border w3-round" name="cur_password" type="password" />
  </p>
  <p>
  <label>New password</label>
  <input className="w3-input w3-border w3-round" name="new_password" type="password"/>
  </p>
  <p>
  <label>Confirm new password</label>
  <input className="w3-input w3-border w3-round" name="confirm_new_password" type="password"/>
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