import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItem from 'components/admin/addItem';  
import EditItem from 'components/admin/editItem';  
//const cook = new A.Cookies()

const schema = {
  type: yup.string().required()
}

export default function TvAccessoryTypes() {
  const [addModal, setAddModal] = A.useState(false);
  const [editModal, setEditModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const types = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const openTvAccessoryTypeModal = () => {
  setAddModal(true);
}
const editItem = (tvAccessoryType) => {
   setSelectedItem(tvAccessoryType)
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
     dispatch(A.deleteItem({url: '/api/tv-accessories/', slug: slug}))
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
  //dispatch(A.loadItems({url: '/api/types', cookie: cook.get("token")}))
  return () => {
  }
}, [types]);


    return(
        <>
        {error && (
          <A.ShowError />
        )}
        <A.Layout>
            <div> 
            <div  className="w3-bar">
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openTvAccessoryTypeModal}>Add New</button>
            </div>
      
       <AddItem
        addModal={addModal} setAddModal={setAddModal} 
          schema={schema} inputLabel={'Tv accessory type'} inputName={'type'}
          title={'Add new Tv accessory type'} path={'/api/tv-accessories'}
        />
       <EditItem
        editModal={editModal} setEditModal={setEditModal} item={selectedItem}
        schema={schema} inputLabel={'Accessory type'} inputName={'type'}
          title={'Update Tv accessory type'} path={'/api/tv-accessories/'} defaultValue={selectedItem.type}
        />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Tv Accessories</h5>
  </div>
  <table className="w3-table w3-bordered text-capitalize">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Device type</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {types && types.map(tvAccessoryType => (
    <tr key={tvAccessoryType.id}>
      <td>{tvAccessoryType.type}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(tvAccessoryType)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(tvAccessoryType.slug)}>delete</button></td>
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
  await store.dispatch(A.loadItems({url: '/api/tv-accessories', cookie: cookie.get('token')}))
  }
)