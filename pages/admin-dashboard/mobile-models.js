import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItemWithOptions from 'components/admin/addItemWithOptions';  
import EditItemWithOptions from 'components/admin/editOptions';  

const schema = {
  model: yup.string().required(),
  mobile_brand_id: yup.mixed().required(),
}

const editSchema = {
  model: yup.string().required(),
}
function MobileModels() {
  const [addOptionsModal, setAddOptionsModal] = A.useState(false);
  const [editOptionsModal, setEditOptionsModal] = A.useState(false);
  const [selectedItem, setSelectedItem] = A.useState({});
const {error} = A.useSelector(A.errorsSelector);
const {items, options} = A.useSelector(A.adminSelector);
const dispatch = A.useDispatch();
const models = items && items.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
const brandOptions = options.map(option => ({
  "value": option.id,
  "label": option.brand
}));
const openMobileModelModal = () => {
  setAddOptionsModal(true);
}
const editItem = (mobileModel) => {
   setSelectedItem(mobileModel)
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
     dispatch(A.deleteItem({url: '/api/mobile-models/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'mobile model has been deleted.',
          'success'
        )
      }).catch((e) => e)
      
    }
  })
}
A.useEffect(() => {
  //dispatch(A.loadItems({url: '/api/Models', cookie: cook.get("token")}))
  return () => {
  }
}, [models]);


    return(
        <>
        {error && (
          <A.ShowError />
        )}
        <A.Layout>
            <div> 
            <div  className="w3-bar">
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openMobileModelModal}>Add New</button>
            </div>
      
            <AddItemWithOptions 
        addOptionsModal={addOptionsModal} setAddOptionsModal={setAddOptionsModal}
        schema={schema} optionsLabel={'Choose brand'} optionName={'mobile_brand_id'}
        placeholder={'Search...'} path={'/api/mobile-models'} title={'Add new model'}
        instanceId={'model_id'} inputName={'model'} inputLabel={'Model'} options={brandOptions}
      />
      <EditItemWithOptions 
        editOptionsModal={editOptionsModal} setEditOptionsModal={setEditOptionsModal}
        schema={editSchema} optionsLabel={'Choose brand'} optionName={'mobile_brand_id'}
        placeholder={'Search...'} path={'/api/mobile-models/'} title={'Update model'}
        instanceId={'model_id_1'} inputName={'model'} inputLabel={'Model'} options={brandOptions}
        item={selectedItem}
      />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Mobile Models</h5>
  </div>
  <table className="w3-table w3-bordered text-capitalize">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Model</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {models && models.map(mobileModel => (
    <tr key={mobileModel.id}>
      <td>{mobileModel.model}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(mobileModel)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(mobileModel.slug)}>delete</button></td>
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

export default A.AuthRoute(MobileModels)
export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store, req}) => {
    const cookie = new A.Cookies(req.headers.cookie);
    await store.dispatch(A.loadItems({url: '/api/mobile-models', cookie: cookie.get('token')}))
    await store.dispatch(A.loadOptions({url: '/api/mobile-brands', cookie: cookie.get('token')}))  
  
  }
)