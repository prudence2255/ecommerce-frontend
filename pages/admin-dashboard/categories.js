import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItemWithOptions from 'components/admin/addItemWithOptions';  
import EditItemWithOptions from 'components/admin/editItemWithOptions';  

//const cook = new A.Cookies()

const schema = {
  name: yup.string().required(),
}
function Categories() {
  const [addOptionsModal, setAddOptionsModal] = A.useState(false);
  const [editOptionsModal, setEditOptionsModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const categories = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const options = items.map(option => ({
  "label": option.name,
  "value": option.id,
}));

const openAddOptionsModal = () => {
  setAddOptionsModal(true);
}
const editItem = (category) => {
   setSelectedItem(category)
  
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
     dispatch(A.deleteItem({url: '/api/categories/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'Category has been deleted.',
          'success'
        )
      }).catch((e) => e)
      
    }
  })
}
A.useEffect(() => {
  //dispatch(A.loadItems({url: '/api/all-categories', cookie: cook.get("token")}))
  return () => {
  }
}, [categories]);


    return(
        <>
        {error && (
          <A.ShowError />
        )}
        <A.Layout>
            <div> 
            <div  className="w3-bar">
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openAddOptionsModal}>Add New</button>
            </div>
      <AddItemWithOptions 
        addOptionsModal={addOptionsModal} setAddOptionsModal={setAddOptionsModal}
        schema={schema} optionsLabel={'Choose parent category'} optionName={'parent_id'}
        placeholder={'Search... (optional)'} path={'/api/categories'} title={'Add new category'}
        instanceId={'category_id'} inputName={'name'} inputLabel={'Name'} options={options}
      />
      <EditItemWithOptions 
        editOptionsModal={editOptionsModal} setEditOptionsModal={setEditOptionsModal}
        schema={schema} optionsLabel={'Choose parent category'} optionName={'parent_id'}
        placeholder={'Search... (optional)'} path={'/api/categories/'} title={'Update category'}
        instanceId={'category_id_1'} inputName={'name'} inputLabel={'Name'} options={options}
        item={selectedItem} 
      />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Categories</h5>
  </div>
  <table className="w3-table w3-bordered text-capitalize">
  <thead className="thead-dark">
    <tr>
      <th scope="col">name</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {categories && categories.map(category => (
    <tr key={category.id}>
      <td>{category.name}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(category)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(category.slug)}>delete</button></td>
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

export default A.AuthRoute(Categories)

export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
  await store.dispatch(A.loadItems({url: '/api/all-categories', cookie: cookie.get('token')}))
  }
)