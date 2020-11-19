import * as A from 'components/adminImports';
import * as yup from "yup";



const UpdatePassword = () => {
    const {error} = A.useSelector(A.errorsSelector);
    
    const router = A.useRouter()
  
    const dispatch = A.useDispatch();

    const schema = yup.object().shape({
        current_password: yup.string().required(),
        new_password: yup.string().required(),
        confirm_password: yup.string().required().oneOf([yup.ref("new_password")]),
      })
          const { register, reset, handleSubmit, errors } = A.useForm({
            resolver: A.yupResolver(schema)  
            })
      
            const submit = (data) => {
              dispatch(A.updatePassword({item: data, url: '/api/update-password'}))
              .then(A.unwrapResult)
              .then(() => {
                  A.Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Password updated successfully',
                      showConfirmButton: false,
                      timer: 1800
                    }) 
                    router.push('/ad/account'); 
              }).catch(e  => e.message)  
                   
      }

      A.useEffect(() => {
          return () => {     
          }
      }, [error])
    return (
        <>
<form className="w3-container " onSubmit={handleSubmit(submit)}>
  <p className="my-3">
  <input className="w3-input w3-border w3-round " name="current_password" type="password" 
      placeholder="Current password" ref={register}
  />
  </p>
  <span className="error">{errors.current_password?.message}</span>
  <p className="my-3">
  <input className="w3-input w3-border w3-round " name="new_password" type="password"
      placeholder="New password" ref={register}
  />
  </p>
  <span className="error">{errors.new_password?.message}</span>
  <p className="my-3">
  <input className="w3-input w3-border w3-round " name="confirm_password" type="password"
      placeholder="Confirm new password" ref={register}
  />
  </p>
  <span className="error">{errors.confirm_password?.message}</span>
  <p>
  <button className="w3-btn w3-blue">Update password</button>
  </p>
    </form>
    <style jsx>
            {`
                input, .select{
                    max-width: 250px
                }
                
            }
            `}
           </style>
        </>
    )
}


export default UpdatePassword;