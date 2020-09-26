import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItem from 'components/admin/addItem';  
import EditItem from 'components/admin/editItem';  
//const cook = new A.Cookies()

const schema = {
  feature: yup.string().required()
}
//const cook = new A.Cookies()

export default function MobileFeatures() {
  const [addModal, setAddModal] = A.useState(false);
  const [editModal, setEditModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
  
const {error} = A.useSelector(A.errorsSelector);
const {items} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const features = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const openMobileFeatureModal = () => {
  setAddModal(true);
}
const editItem = (mobileFeature) => {
   setSelectedItem(mobileFeature)
    setEditModal(true);
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
     dispatch(A.deleteItem({url: '/api/mobile-features/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'Deleted successfully',
          'success'
        )
      }).catch((e) => e)
      
    }
  })
}
A.useEffect(() => {
  //dispatch(A.loadItems({url: '/api/Features', cookie: cook.get("token")}))
  return () => {
  }
}, [features]);


    return(
        <>
        {error && (
          <A.ShowError />
        )}
        <A.Layout>
            <div> 
            <div  className="w3-bar">
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openMobileFeatureModal}>Add New</button>
            </div>
      
            <AddItem
        addModal={addModal} setAddModal={setAddModal} 
          schema={schema} inputLabel={'Feature'} inputName={'feature'}
          title={'Add new feature'} path={'/api/mobile-features'}
        />
       <EditItem
        editModal={editModal} setEditModal={setEditModal} item={selectedItem}
        schema={schema} inputLabel={'Feature'} inputName={'feature'}
          title={'Update feature'} path={'/api/mobile-features/'} defaultValue={selectedItem.feature}
        />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Features</h5>
  </div>
  <table className="w3-table w3-bordered text-capitalize">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {features && features.map(mobileFeature => (
    <tr key={mobileFeature.id}>
      <td>{mobileFeature.feature}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(mobileFeature)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(mobileFeature.slug)}>delete</button></td>
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

export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
  await store.dispatch(A.loadItems({url: '/api/mobile-features', cookie: cookie.get('token')}))
  }
)