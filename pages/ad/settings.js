import Layout from 'components/home/layout';
import UserNav from 'components/home/userNav';
import { useRef, useEffect, useState } from 'react';
import * as yup from "yup";
import * as A from 'components/adminImports';
import AuthRoute from 'components/home/auth';
import Select from 'react-select';

const cookies = new A.Cookies();

 function Settings(){
     const [region, setRegion] = useState();
     const [town, setTown] = useState();
     const [towns, setTowns] = useState()
    const {loginCustomer, categoryLocations} = A.useSelector(A.customerSelector);
    const {error} = A.useSelector(A.errorsSelector);
    const {locations} = categoryLocations;

    const transFormArray = (array, id, name, check) => {
      const newArray = array?.filter(region => region[id] === check).map(region => ({
         label: region[name],
         value: region.id
       }));
   return newArray?.sort((a, b) => {
     let x = a.label.toLowerCase();
     let y = b.label.toLowerCase();
     if (x < y) {return -1;}
     if (x > y) {return 1;}
     return 0;
   });
  }
  const regions = transFormArray(locations, 'parent_id', 'name', null);
 
                  
  
    const router = A.useRouter()
  
    const dispatch = A.useDispatch()

    const handleRegion = (value) => {
      setRegion(value)
     setTowns(transFormArray(locations, 'parent_id', 'name', value?.value));
    }

    const handleTown = (value) => {
      setTown(value)
    }
    const onLogout = () => {
        if(loginCustomer.provider === 'facebook'){
          dispatch(A.logout()).then(A.unwrapResult)
          .then(() => {
             if(!cookies.get('customer_token')){
                window.FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {

                      let accessToken = response.authResponse.accessToken;
                      window.FB.logout(accessToken);
                    } 
                  } );
               
                router.push('/');
             } 
          }).catch(e => e.message)
        }else{
            dispatch(A.logout()).then(A.unwrapResult)
            .then(() => {
               if(!cookies.get('customer_token')) router.push('/')
            }).catch(e => e.message)
        }
    }

const schema = yup.object().shape({
  name: yup.string().required()
})
    const { register, reset, handleSubmit, errors } = A.useForm({
      resolver: A.yupResolver(schema)  
      })

      const submit = (data) => {
        dispatch(A.updateCustomer({customer: data, url: '/api/update-customer'}))
        .then(A.unwrapResult)
        .then(() => {
            A.Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Updated successfully',
                showConfirmButton: false,
                timer: 1800
              })  
        }).catch(e  => e.message)  
             
}

      useEffect(() => {
        const myRef = document.querySelector(".m-top");
        window.scrollTo(0, myRef.offsetTop) 
        return () => {          
        }
    }, [loginCustomer])
    return(
        <>
        {error && <A.ShowError />}
          <Layout>
           <div className="container">
           <div className="row">
            <div className="col-md-2 w3-card-2 p-2">
                <UserNav />
            </div>
            <div className="col-md-8 ml-md-5 w3-card-2 p-2 m-top" >
                <h5 className="text-center w-100">Settings</h5>
                <hr />
                <div className="card">
             <div className="card-header w3-blue">
             <h5 className="text-center ">Change details</h5>
            </div>
               <div className="settings">
               <p className="ml-2"> Email: <span className="text-primary">{loginCustomer.email}</span></p>
               <form className="w3-container pt-1 " >
            <p>
         <label>Name:</label>
         <input className="w3-input w3-border w3-round" type="tex" name="name"
            ref={register} defaultValue={loginCustomer.name}
         />
         <span className="error">{errors.name?.message}</span>
        </p>
        {/* <div className="w3-row">
        <div className="w3-half">
        <div className="select">
        <label>Region:</label><br />
        <Select
        name="region"
        value={region}
        onChange={handleRegion}
        options={regions}
        instanceId="regions"
        isSearchable
        isClearable
        placeholder="Search regions..."
         />
        <span className="error">{errors.region?.message}</span>
        </div>
        </div>
        <div className="w3-half">
        <div className="select">
        <label>City/District/Town:</label><br />
        <Select
        name="town"
        value={town}
        onChange={handleTown}
        options={towns}
        instanceId="towns"
        isSearchable
        isClearable
        placeholder="Search sublocations..."
        isDisabled={region ? false : true}
      />
        <span className="error">{errors.town?.message}</span>
        </div>
        </div>
        </div> */}
        <div className="pb-2 my-3">
        <button className="w3-btn w3-blue" onClick={handleSubmit(submit)}>Update details</button>
        </div>
        </form>
       {loginCustomer.provider === null && (
         <div>
         <h5 className="my-3 ml-2">Change password</h5>
        <hr />
    <form className="w3-container ">
  <p className="my-3">
  <input className="w3-input w3-border w3-round " name="cur_password" type="password" 
      placeholder="Current password"
  />
  </p>
  <p className="my-3">
  <input className="w3-input w3-border w3-round " name="new_password" type="password"
      placeholder="New password"
  />
  </p>
  <p className="my-3">
  <input className="w3-input w3-border w3-round " name="confirm_new_password" type="password"
      placeholder="Confirm new password"
  />
  </p>
  <p>
  <button className="w3-btn w3-blue">Update password</button>
  </p>
    </form>
         </div>
       )}
    <div className="m-3">
        <button className="btn w3-card w3-yellow"
        onClick={onLogout}
        >
        Logout
        </button>
    </div>
               </div>
            </div>
            </div>
            </div>
           </div>
           </Layout>
           <style jsx>
            {`
                @media(max-width: 768px){
                    .m-top{
                        margin-top: 50px;
                    }
                    .w3-half{
                        margin-bottom: 20px;
                    }
                }

                .settings{
                   margin: 10px;
                }

                input, .select{
                    max-width: 250px
                }
                
            }
            `}
           </style>
        </>
    )
}


export default AuthRoute(Settings)

export const getServerSideProps = A.wrapper.getServerSideProps(
    async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
    await store.dispatch(A.categoryLocation({url: '/api/category-location', cookie: cookie.get('customer_token')}))
    await store.dispatch(A.loadCustomer(cookie.get('customer_token')))
    }
  )