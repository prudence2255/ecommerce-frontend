import * as yup from "yup";
import {LoginGoogle} from './socialLogin';
import * as A from 'components/adminImports';
import Signup from './signup';
import ShowEmail from './showEmail';

const cookies = new A.Cookies();

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

export default function Login({loginModal, setLoginModal}){
    const [signupModal, setSignupModal] = A.useState(false);
    const [emailModal, setEmailModal] = A.useState(false);
    const {error} = A.useSelector(A.errorsSelector);
    const dispatch = A.useDispatch();
    const router = A.useRouter()
    const closeModal = (e) => {
        e.preventDefault()
        setLoginModal(false);
    }
   
    const signup = (e) => {
        e.preventDefault()
        setLoginModal(false)
        setSignupModal(true);
      }
const emailForm = (e) => {
  e.preventDefault()
  setLoginModal(false)
  setEmailModal(true);
}
      const { register, handleSubmit, errors } = A.useForm({
        resolver: A.yupResolver(schema)
      })
      const submit = (data) => {
         dispatch(A.login(data)).then(A.unwrapResult)
         .then( () => {
          if(cookies.get('customer_token')){
            setLoginModal(false);
            router.push('/ad/account')
          }
         })
         .catch(e => e.message)
      };

   return (
        <>
        <ShowEmail emailModal={emailModal} setEmailModal={setEmailModal}/>
        <Signup signupModal={signupModal} setSignupModal={setSignupModal}/>
        <A.GridLoader />
    <div className={`w3-modal ${loginModal ? 'openModal' : ''}`}>
    {error && (
            <A.ShowError />
        )}
        <div className="w3-modal-content w3-animate-zoom">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" text-center"> Login</h5>
        </div>
    <div className="card-body">
    <div className="social-btn my-2">
    <LoginGoogle setLoginModal={setLoginModal}/> 
    </div>
        <p className="my-3 text-center w-100">OR</p>
    <form className="w3-container pt-1" onSubmit={handleSubmit(submit)}>
  <p>
  <input className="w3-input w3-border w3-round" type="email" name="email" placeholder="Email address"
      ref={register}
  />
   <span className="error">{errors.email?.message}</span>
  </p>
  <p>
  <input className="w3-input w3-border w3-round" name="password" placeholder="Password"
    type="password"  ref={register}
  />
   <span className="error">{errors.password?.message}</span>
  </p>
  <div className="pb-2">
  <button className="w3-btn w3-blue" >Login</button>
  <button className="w3-btn w3-yellow ml-5" onClick={closeModal}>Cancel</button>
  <p className="mt-2">
        <button className="btn" onClick={emailForm}>
        Forgot password?
      </button>
  </p>
  <p>
      Don't have account yet? - 
      <button className="btn text-primary" onClick={signup}>
        <a><b>Signup</b></a>
      </button>
  </p>
  </div>
    </form>
     </div>
        </div>
        </div>
        </div>
        <style jsx>
            {`
            .openModal{
                display: block;
            }
            .w3-modal-content{
                max-width: 500px!important;
            }
            `}
        </style>
    </>
   )
}