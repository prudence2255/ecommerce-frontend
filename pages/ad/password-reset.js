import * as A from 'components/adminImports';
import * as yup from "yup";
import Layout from 'components/home/layout';



const ShowReset = () => {
    const {error} = A.useSelector(A.errorsSelector);
    
    const router = A.useRouter()
  
    const dispatch = A.useDispatch();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirm_password: yup.string().required().oneOf([yup.ref("password")]),
      })
          const { register, reset, handleSubmit, errors } = A.useForm({
            resolver: A.yupResolver(schema)  
            })
      
            const submit = (data) => {
              dispatch(A.updatePassword({item: data, url: '/api/password-reset'}))
              .then(A.unwrapResult)
              .then(() => {
                  A.Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Password reset successfully, you can now login!',
                      showConfirmButton: false,
                      timer: 1800
                    }) 
                    router.push('/'); 
              }).catch(e  => e.message)  
                   
      }

      A.useEffect(() => {
          return () => {     
          }
      }, [error])
    return (
        <>
        <Layout>
    <div className="container">
        {error && (
          <A.ShowError />
        )}
        <div className="row">
        <div className="card col-md-6 mx-auto">
         <div className="card-header w3-blue">
          <h5 className=" text-center">Reset password</h5>
        </div>
    <div className="card-body">
    <form className="w3-container pt-3" onSubmit={handleSubmit(submit)}>
  <p>
  <input className="w3-input w3-border w3-round" name="email" type="text" ref={register}
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
  
  <input className="w3-input w3-border w3-round" name="confirm_password" type="password" ref={register}
      placeholder="Confirm password"
  />
   <input className="w3-input w3-border w3-round" name="token" type="text" ref={register}
       hidden defaultValue={router.query.token ? router.query.token : ''}
  />
  </p>
  <span className="error">{errors.confirm_password?.message}</span>
  <p>
  <button className="w3-btn w3-blue">Reset</button>
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
            `}
        </style>
        </Layout>
        </>
    )
}


export default ShowReset;