
import * as yup from "yup"
import * as A from 'components/adminImports';
import {signUp} from 'store/customer/customerActions'

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    c_password: yup.string().required().oneOf([yup.ref("password")]),
  });


export default function Signup({signupModal, setSignupModal}) {
    const {error} = A.useSelector(A.errorsSelector)
    const dispatch = A.useDispatch()
    const { register, reset, handleSubmit, errors } = A.useForm({
        resolver: A.yupResolver(schema)
      })

    const closeModal = (e) => {
        e.preventDefault()
        setSignupModal(false);
    }
   
    const router = A.useRouter();

    const submit = (data) => {
        dispatch(signUp({customer: data, url: '/api/customer-register'})).then(A.unwrapResult)
        .then(() => {
            setSignupModal(false);
            A.Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Account created successfully',
                showConfirmButton: false,
                timer: 1800
              })
              reset({}) 
              router.push('/ad/account');
        }).catch(e  => e.message)       
    }
    return(
        <>
        <div className={`w3-modal ${signupModal ? 'openModal' : ''}`}>
        {error && (
          <A.ShowError />
        )}
        <div className="w3-modal-content w3-animate-zoom">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" text-center">Signup</h5>
        </div>
    <div className="card-body">
    <form className="w3-container w3-card-2 pt-3" onSubmit={handleSubmit(submit)}>
  <p>
  <input className="w3-input w3-border w3-round" name="name" type="text" ref={register}
      placeholder="Name"
  />
  <span className="error">{errors.name?.message}</span>
  </p>
  <p>
  <input className="w3-input w3-border w3-round" name="email" type="email" ref={register}
      placeholder="Email"
  />
  <span className="error">{errors.email?.message}</span>
  </p>
  <p>
 
  <input className="w3-input w3-border w3-round" name="password" type="password" ref={register}
      placeholder="Password"
  />
  <span className="error">{errors.password?.message}</span>
  </p>
  <p>
  
  <input className="w3-input w3-border w3-round" name="c_password" type="password" ref={register}
      placeholder="Confirm password"
  />
  <span className="error">{errors.c_password?.message}</span>
  </p>
  <p>
  <button className="w3-btn w3-blue">Signup</button>
  <button className="w3-btn w3-yellow ml-5" onClick={closeModal}>Cancel</button>
  </p>
    </form>
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