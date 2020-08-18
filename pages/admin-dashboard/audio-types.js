import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItem from 'components/admin/addItem';  
import EditItem from 'components/admin/editItem';  
//const cook = new A.Cookies()

const schema = {
  type: yup.string().required()
}

export default function AudioTypes() {
  const [addModal, setAddModal] = A.useState(false);
  const [editModal, setEditModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const types = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const openAudioTypeModal = () => {
  setAddModal(true);
}
const editItem = (audioType) => {
   setSelectedItem(audioType)
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
     dispatch(A.deleteItem({url: '/api/audio-types/', slug: slug}))
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
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openAudioTypeModal}>Add New</button>
            </div>
      
       <AddItem
        addModal={addModal} setAddModal={setAddModal} 
          schema={schema} inputLabel={'device type'} inputName={'type'}
          title={'Add new audio & mp3 device type'} path={'/api/audio-types'}
        />
       <EditItem
        editModal={editModal} setEditModal={setEditModal} item={selectedItem}
        schema={schema} inputLabel={'Device type'} inputName={'device type'}
          title={'Update audio and mp3 device type'} path={'/api/audio-types/'} defaultValue={selectedItem.type}
        />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Audio & mp3</h5>
  </div>
  <table className="w3-table w3-bordered">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Device type</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {types && types.map(audioType => (
    <tr key={audioType.id}>
      <td>{audioType.type}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(audioType)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(audioType.slug)}>delete</button></td>
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
  await store.dispatch(A.loadItems({url: '/api/audio-types', cookie: cookie.get('token')}))
  }
)