import * as A from 'components/adminImports';
import * as yup from "yup";
import AddItemWithOptions from 'components/admin/addItemWithOptions';  
import EditItemWithOptions from 'components/admin/editItemWithOptions';  
//const cook = new A.Cookies()
const schema = {
  model: yup.string().required(),
  motor_brand_id: yup.mixed().required()
}
export default function MotorModels() {
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
const openMotorModelModal = () => {
  setAddOptionsModal(true);
}
const editItem = (motorModel) => {
   setSelectedItem(motorModel)
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
     dispatch(A.deleteItem({url: '/api/motor-models/', slug: slug}))
      .then(A.unwrapResult).then(() => {
        A.Swal.fire(
          'Deleted!',
          'motor model has been deleted.',
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
            <button  className="w3-bar-item w3-button w3-blue w3-right" onClick={openMotorModelModal}>Add New</button>
            </div>
      
            <AddItemWithOptions 
        addOptionsModal={addOptionsModal} setAddOptionsModal={setAddOptionsModal}
        schema={schema} optionsLabel={'choose brand'} optionName={'motor_brand_id'}
        placeholder={'choose brand...'} path={'/api/motor-models'} title={'Add new model'}
        instanceId={'model_id'} inputName={'model'} inputLabel={'Model'} options={brandOptions}
      />
      <EditItemWithOptions 
        editOptionsModal={editOptionsModal} setEditOptionsModal={setEditOptionsModal}
        schema={schema} optionsLabel={'choose brand'} optionName={'motor_brand_id'}
        placeholder={'choose brand...'} path={'/api/motor-models/'} title={'Update model'}
        instanceId={'model_id_1'} inputName={'model'} inputLabel={'Model'} options={brandOptions}
        item={selectedItem}
      />
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">motor models</h5>
  </div>
  <table className="w3-table w3-bordered">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Model</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {models && models.map(motorModel => (
    <tr key={motorModel.id}>
      <td>{motorModel.model}</td>
      <td><button className="w3-btn w3-yellow" onClick={
        () => editItem(motorModel)
      }>edit</button></td>
      <td><button className="w3-btn w3-red" 
      onClick={() => handleDelete(motorModel.slug)}>delete</button></td>
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
    await store.dispatch(A.loadItems({url: '/api/motor-models', cookie: cookie.get('token')}))
    await store.dispatch(A.loadOptions({url: '/api/motor-brands', cookie: cookie.get('token')}))  
  
  }
)