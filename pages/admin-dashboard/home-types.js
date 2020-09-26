import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItemWithOptions from 'components/admin/addItemWithOptions';  
import EditItemWithOptions from 'components/admin/editOptions';  
//const cook = new A.Cookies()
const schema = {
  type: yup.string().required(),
  home_parent_id: yup.mixed().required()
}

const editSchema = {
  type: yup.string().required(),
}
export default function HomeTypes() {
  const [addOptionsModal, setAddOptionsModal] = A.useState(false);
  const [editOptionsModal, setEditOptionsModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items, options} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const types = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const typeOptions = options.map(option => ({
  "value": option.id,
  "label": option.parent
}));
const openHomeTypeModal = () => {
  setAddOptionsModal(true);
}
const editItem = (homeType) => {
   setSelectedItem(homeType)
    setEditOptionsModal(true);
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
     dispatch(A.deleteItem({url: '/api/home-types/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'home type has been deleted.',
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
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openHomeTypeModal}>Add New</button>
            </div>
      
            <AddItemWithOptions 
        addOptionsModal={addOptionsModal} setAddOptionsModal={setAddOptionsModal}
        schema={schema} optionsLabel={'Choose home & garden type'} optionName={'parent_home_id'}
        placeholder={'Choose type...'} path={'/api/home-types'} title={'Add new type'}
        instanceId={'type_id'} inputName={'type'} inputLabel={'type'} options={typeOptions}
      />
      <EditItemWithOptions 
        editOptionsModal={editOptionsModal} setEditOptionsModal={setEditOptionsModal}
        schema={editSchema} optionsLabel={'Choose home & garden type'} optionName={'parent_home_id'}
        placeholder={'Choose type...'} path={'/api/home-types/'} title={'Update type'}
        instanceId={'type_id_1'} inputName={'type'} inputLabel={'type'} options={typeOptions}
        item={selectedItem}
      />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">home & garden</h5>
  </div>
  <table className="w3-table w3-bordered text-capitalize">
  <thead className="thead-dark">
    <tr>
      <th scope="col">type</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {types && types.map(homeType => (
    <tr key={homeType.id}>
      <td>{homeType.type}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(homeType)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(homeType.slug)}>delete</button></td>
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
    await store.dispatch(A.loadItems({url: '/api/home-types', cookie: cookie.get('token')}))
    await store.dispatch(A.loadOptions({url: '/api/parent-homes', cookie: cookie.get('token')}))  
  
  }
)