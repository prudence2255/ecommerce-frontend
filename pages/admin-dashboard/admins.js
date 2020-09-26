
import * as A from 'components/adminImports';
import NewAdmin from 'components/admin/newAdmin';

//const cook = new Cookies()

 function Admins() {
  const [adminModal, setAdminModal] = A.useState(false);
  const {items} = A.useSelector(A.adminSelector)
  const admins = items && items.slice().sort((a, b) => b.updated_at?.localeCompare(a.updated_at))
  const {error} = A.useSelector(A.errorsSelector)
const dispatch = A.useDispatch()

  
const openAdminModal = () =>{
  setAdminModal(true)
}
  
  const handleDelete = (slug) => {
    A.Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
       dispatch(A.deleteItem({url: '/api/users/', slug: slug}))
        .then(A.unwrapResult).then(() => {
          A.Swal.fire(
            'Deleted!',
            'Admin has been deleted.',
            'success'
          )
        }).catch((e) => e)
        
      }
    })
  }

  A.useEffect(() => {
   // cook.remove("token", {path: '/'})
   // dispatch(loadAdmins())
    return () => {  
    }
  }, [admins])

    return(
        <>
        <A.Layout>
            <div> 
           
              {error && (
                <A.ShowError />
              )}
          <div className="w3-bar">
      <button className="w3-bar-item w3-button w3-blue w3-right" onClick={openAdminModal}>Add New</button>
        </div>  
        <NewAdmin adminModal={adminModal} setAdminModal={setAdminModal}/>  
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Admins</h5>
  </div>
  <table className="w3-table w3-bordered ">
  <thead className="thead-dark">
    <tr>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {admins && admins.map(admin => (
    <tr key={admin.id}>
      <td className="text-capitalize">{admin.name}</td>
      <td>{admin.email}</td>
      <td><button className="w3-btn w3-red" onClick={() => handleDelete(admin.slug)}>delete</button></td>
      </tr>
  ))}
  </tbody>
    </table>
</div>
 </div>
        </A.Layout>
        </>
    )
}

export default A.AuthRoute(Admins)

export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
  await store.dispatch(A.loadItems({url: '/api/users', cookie: cookie.get('token')}))
  }
)