import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItem from 'components/admin/addItem';  
import EditItem from 'components/admin/editItem';  
//const cook = new A.Cookies()

const schema = {
  brand: yup.string().required()
}

export default function ComputerBrands() {
  const [addModal, setAddModal] = A.useState(false);
  const [editModal, setEditModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const brands = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const openComputerBrandModal = () => {
  setAddModal(true);
}
const editItem = (computerBrand) => {
   setSelectedItem(computerBrand)
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
     dispatch(A.deleteItem({url: '/api/computer-brands/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'Computer brand has been deleted.',
          'success'
        )
      }).catch((e) => e)
      
    }
  })
}
A.useEffect(() => {
  //dispatch(A.loadItems({url: '/api/brands', cookie: cook.get("token")}))
  return () => {
  }
}, [brands]);


    return(
        <>
        {error && (
          <A.ShowError />
        )}
        <A.Layout>
            <div> 
            <div  className="w3-bar">
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openComputerBrandModal}>Add New</button>
            </div>
      
       <AddItem
        addModal={addModal} setAddModal={setAddModal} 
          schema={schema} inputLabel={'Brand'} inputName={'brand'}
          title={'Add new computer brand'} path={'/api/computer-brands'}
        />
       <EditItem
        editModal={editModal} setEditModal={setEditModal} item={selectedItem}
        schema={schema} inputLabel={'Brand'} inputName={'brand'}
          title={'Update computer brand'} path={'/api/computer-brands/'} defaultValue={selectedItem.brand}
        />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">computer brands</h5>
  </div>
  <table className="w3-table w3-bordered">
  <thead className="thead-dark">
    <tr>
      <th scope="col">brand</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {brands && brands.map(computerBrand => (
    <tr key={computerBrand.id}>
      <td>{computerBrand.brand}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(computerBrand)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(computerBrand.slug)}>delete</button></td>
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
  await store.dispatch(A.loadItems({url: '/api/computer-brands', cookie: cookie.get('token')}))
  }
)