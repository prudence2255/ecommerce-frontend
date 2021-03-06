
import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItemWithOptions from 'components/admin/addItemWithOptions';  
import EditItemWithOptions from 'components/admin/editItemWithOptions';  

//const cook = new A.Cookies()

const schema = {
  name: yup.string().required()
}

 function Locations() {
  const [addOptionsModal, setAddOptionsModal] = A.useState(false);
  const [editOptionsModal, setEditOptionsModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
  const locations = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
  
  const options = items.map(option => ({
    "value": option.id,
    "label": option.name
  }));
  const editLocation = (location) => {
    setSelectedItem(location)
     setEditOptionsModal(true);
 }

  const openLocationModal = () => {
    setAddOptionsModal(true);
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
     dispatch(A.deleteItem({url: '/api/locations/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'Location has been deleted.',
          'success'
        )
      }).catch((e) => e)
      
    }
  })
}
    return(
        <>
        <A.Layout>
            <div> 
            {error && (
              <A.ShowError />
            )}
            <AddItemWithOptions 
        addOptionsModal={addOptionsModal} setAddOptionsModal={setAddOptionsModal}
        schema={schema} optionsLabel={'Choose parent location'} optionName={'parent_id'}
        placeholder={'Search... (optional)'} path={'/api/locations'} title={'Add new location'}
        instanceId={'location_id'} inputName={'name'} inputLabel={'Name'} options={options}
      />
      <EditItemWithOptions 
        editOptionsModal={editOptionsModal} setEditOptionsModal={setEditOptionsModal}
        schema={schema} optionsLabel={'Choose parent location'} optionName={'parent_id'}
        placeholder={'Search... (optional)'} path={'/api/locations/'} title={'Update location'}
        instanceId={'location_id_1'} inputName={'name'} inputLabel={'Name'} options={options}
        item={selectedItem}
      />
        <div className="w3-bar">
        <button  className="w3-bar-item w3-button w3-right w3-blue" onClick={openLocationModal}>Add New</button>
        </div> 
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Locations</h5>
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
    {locations && locations.map(location => (
      <tr key={location.id}>
      <td>{location.name}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editLocation(location)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" onClick={() => handleDelete(location.slug)}>delete</button></td>
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

export default A.AuthRoute(Locations)
export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
  await store.dispatch(A.loadItems({url: '/api/all-locations', cookie: cookie.get('token')}))
  }
)