import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItem from 'components/admin/addItem';  
import EditItem from 'components/admin/editItem';  
//const cook = new A.Cookies()

const schema = {
  transmission: yup.string().required()
}

export default function carTransmissions() {
  const [addModal, setAddModal] = A.useState(false);
  const [editModal, setEditModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const transmissions = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const openCarTransmissionModal = () => {
  setAddModal(true);
}
const editItem = (carTransmission) => {
   setSelectedItem(carTransmission)
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
     dispatch(A.deleteItem({url: '/api/car-transmissions/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'car transmission has been deleted.',
          'success'
        )
      }).catch((e) => e)
      
    }
  })
}
A.useEffect(() => {
  //dispatch(A.loadItems({url: '/api/transmissions', cookie: cook.get("token")}))
  return () => {
  }
}, [transmissions]);


    return(
        <>
        {error && (
          <A.ShowError />
        )}
        <A.Layout>
            <div> 
            <div  className="w3-bar">
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openCarTransmissionModal}>Add New</button>
            </div>
      
       <AddItem
        addModal={addModal} setAddModal={setAddModal} 
          schema={schema} inputLabel={'Transmission'} inputName={'transmission'}
          title={'Add new car transmission'} path={'/api/car-transmissions'}
        />
       <EditItem
        editModal={editModal} setEditModal={setEditModal} item={selectedItem}
        schema={schema} inputLabel={'Transmission'} inputName={'transmission'}
          title={'Update car transmission'} path={'/api/car-transmissions/'} defaultValue={selectedItem.transmission}
        />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">car transmissions</h5>
  </div>
  <table className="w3-table w3-bordered">
  <thead className="thead-dark">
    <tr>
      <th scope="col">transmission</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {transmissions && transmissions.map(carTransmission => (
    <tr key={carTransmission.id}>
      <td>{carTransmission.transmission}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(carTransmission)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(carTransmission.slug)}>delete</button></td>
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
  await store.dispatch(A.loadItems({url: '/api/car-transmissions', cookie: cookie.get('token')}))
  }
)