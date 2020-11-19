import * as A from 'components/adminImports';
import * as yup from "yup";



const ShowEmail = ({emailModal, setEmailModal}) => {
    const [success, setSuccess] = A.useState();
    const {error} = A.useSelector(A.errorsSelector);
    
    const router = A.useRouter()
  
    const dispatch = A.useDispatch();
    const closeModal = (e) => {
        e.preventDefault()
        setEmailModal(false);
    }
    const schema = yup.object().shape({
        email: yup.string().email().required()
      })
          const { register, reset, handleSubmit, errors } = A.useForm({
            resolver: A.yupResolver(schema)  
            })
      
            const submit = (data) => {
              dispatch(A.sendEmail({email: data, url: '/api/create-reset'}))
              .then(A.unwrapResult)
              .then(() => {
                  setSuccess('A password reset link has been sent to your email!')
                  setTimeout(() => {
                    setEmailModal(false)
                  }, 5000)
              }).catch(e  => e.message)  
                   
      }

      A.useEffect(() => {
          return () => {     
          }
      }, [error])
    return (
        <>
    <div className={`w3-modal ${emailModal ? 'openModal' : ''}`}>
    {error && (
            <A.ShowError />
        )}
    <div className="w3-modal-content w3-animate-zoom text-center p-3">
    {success && (
        <div className="alert alert-success" role="alert">
        {success}
        </div>
    )}
    Enter the email you used when creating the account on digishoping.com
    <form className="w3-container mx-auto" onSubmit={handleSubmit(submit)}>
     <p className="my-3 mx-auto">
    <input className="w3-input w3-border w3-round " name="email" type="text" 
      placeholder="Enter your email" ref={register}
    />
    </p>
    <span className="error">{errors.email?.message}</span>
    
    <p>
    <button className="w3-btn w3-blue">Submit</button>
    <button className="w3-btn w3-yellow ml-5" onClick={closeModal}>Cancel</button>
    </p>
    </form>
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
                .w3-modal{
                    transition: all 4s
                }
            `}
           </style>
        </>
    )
}


export default ShowEmail;