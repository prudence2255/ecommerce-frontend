import * as A from 'components/adminImports';
import * as yup from "yup";
import {CloseIcon} from 'components/admin/icons';

const Filters = ({setFilterModal}) => {
    const {categoryLocations} = A.useSelector(A.adsSelector);
    const {categories} = categoryLocations;
    const router = A.useRouter();
    const dispatch = A.useDispatch();

    const onHandleFilter = (e) => {
       const query =  {
            ...router.query,
            [e.target.name]: e.target.value
        }

        router.query[e.target.name] = e.target.value
        // const data = {
        //     ...query,
        //   }
        setFilterModal(false);
        dispatch(A.fetchAds({url: `/api/all-ads?page=${query.page}`, item: query}));
        // router.push({
        //     pathname: '/ads',
        //     query: {
        //         ...router.query,
        //         [e.target.name]: e.target.value
        //     }
        // }) 
        goToPage()
    }

    const goToPage = () => {
        dispatch(A.progressStart());
      }

    const cats = [
        "Mobile Phones", "Computers & Tablets", "Tvs", "Mobile Phone Accessories",
        "Computer Accessories", "Cameras & Camcorders", "Tv & Video Accessories", 
        "Audio & Mp3", "Cars", "Motorbikes & Scooters", "Auto Parts & Accessories",
        "Electricity, AC & Bathroom", 'Electronics', 'Vehicles'
    ]
    const category = categories?.find(category => category.slug === router.query.category)
        
    const isCondition = cats?.includes(category?.name);

const schema = yup.object().shape({
    min_price: yup.number().min(0).required(),
    max_price: yup.number().min(1).required(),
  });

const {register, handleSubmit } = A.useForm({
    resolver: A.yupResolver(schema),   
    })
const submit = (data) => {

    const query =  {
        ...router.query,
        ...data
    }
    router.query.min_price = data.min_price;
    router.query.max_price = data.max_price;
    dispatch(A.fetchAds({url: `/api/all-ads?page=${query.page}`, item: query}));
    // router.push({
    //     pathname: '/ads',
    //     query: {
    //         ...router.query,
    //         ...data,
    //     }
    // }) 
    
    setFilterModal(false)
    goToPage()
}
    A.useEffect(() => {
        return () => {}
    }, [])
    return(
        <>
        <div className="col">
        <div className="row">
            <div className="col-md-12">
            <p><small>Sort results by:</small></p>
            </div>
        </div>
            <div className="row">
                <div className="col-md-12">
                <select className="input-control" name="order" onChange={onHandleFilter}>
                    <option value="newest-on-top">
                        Date: Newest on top
                    </option>
                    <option value="oldest-on-top">
                       Date: Oldest on top
                    </option>
                    <option value="low-to-high">
                        Price: Low to high
                    </option>
                    <option value="high-to-low">
                        price: Hight to low
                    </option>
                </select>
                </div>
            </div>
            
            {isCondition && (
                <div className="row mt-4">
                <div className="col-md-12">
                <label htmlFor="condition" className="label">Condition:</label><br />
            <div className="form-check form-check-inline ml-2" >
             <label className="form-check-label">
            <input type="radio" 
            className="form-check-input" 
            name="condition" 
            value="Used"
            onChange={onHandleFilter}
           />Used
            
             </label>
            </div>
            <div className="form-check form-check-inline ml-2" >
             <label className="form-check-label">
            <input type="radio" 
            className="form-check-input" 
            name="condition" 
            value="New" 
            onChange={onHandleFilter}
           />New
             </label>
            </div>
                </div>
            </div>
            )}
            {category  && (
                <form onSubmit={handleSubmit(submit)}>
                <div className="price">
            <div className="row mt-2">
            <div className="col">
            <label htmlFor="price" className="label">Price:</label><br />
            </div>
            </div>
            <div className="row">
            <div className="col">
            <input type="number" className="form-control" name="min_price" 
                placeholder="Min" ref={register}/>
            </div>
            <div className="col">
            <input type="number" className="form-control" name="max_price" 
                placeholder="Max" ref={register}/>
            </div>
            </div>
            <button className="btn w3-green mt-2">Apply filters</button>
            </div>
                </form>
            )}
            </div>
        </>
    )
}


export const MobileFilters = ({filterModal, setFilterModal}) => {
    const closeModal = () => {
        setFilterModal(false)
    }
    return (
        <>
<div className={`w3-modal ${filterModal ? 'openModal' : ''}`} >
    <div className="w3-modal-content w3-animate-zoom p-3">
   <button className="w3-btn close-btn" onClick={closeModal}>
          <CloseIcon /> 
    </button>
        <div className="mt-3">
        <Filters setFilterModal={setFilterModal}/>
        </div>
    </div>
    </div>
    <style jsx>
    {`
        .openModal{
            display: block
        }
        .close-btn{
            position: absolute;
            right: 10px;
            top: 10px;
        }
       .w3-modal-content{
          max-width: 500px;
        }
    `}
</style>
        </>
    )
}
export default Filters;