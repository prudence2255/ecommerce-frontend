import * as A from 'components/adminImports';
import {RightIcon, Caret, CloseIcon} from 'components/admin/icons';


const transFormArray = (array, id, check) => {
const newArray = array?.filter(item => item[id] === check)
 return newArray;
}

const Location = ({locationModal, setLocationModal}) => {

const [parentLocation, setParent] = A.useState({});
const [children, setChildren] = A.useState([]);
    const router = A.useRouter();
    const {categoryLocations} = A.useSelector(A.adsSelector);
const {locations} = categoryLocations;
const parentLocations = transFormArray(locations, 'parent_id', null);
    const closeModal = () => {
        setLocationModal(false);
    }

   
    const handleChildren = (id) => {
        const parentLocation = locations.find(location => location.id === id);
        setChildren(transFormArray(locations, 'parent_id', id))
        setParent(parentLocation);
    }
      
    
    const handleLocation = (location) => {
        router.push({
            pathname: '/ads',
            query: {
                ...router.query,
                location: location
            }
        })
        setLocationModal(false);
    }
    return (
        <>
        <div>
        <div className={`w3-modal ${locationModal ? 'openModal' : ''}`} >
        <div className="w3-modal-content w3-animate-zoom">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" w3-center">Select a location </h5>
          <button className="w3-btn close-btn" onClick={closeModal}>
          <CloseIcon />
          </button>
        </div>
        <div className="card-body">
        <div className="row" >
        <div className="col-md-12 ">
        <div className="row">
            {parentLocations && parentLocations.map((location, i) => (
                <div className="col-md-12" key={i}>
                <div>
              <div className="row">
             <div className="col-md-12 link" onClick={() => handleChildren(location.id)}>
             <div className=" w3-left" >
            {location.name} 
            </div>
             <div className="w3-right">
            <RightIcon />
             </div>
             </div>
              </div>
          </div>
          <hr />      
         {location.name === parentLocation.name && (
             <div className="children ">
             <div className="col-md-12">
             <div className="row">
                    <div className="col-md-12 link">
                    <div className=" w3-left" onClick={() => handleLocation(parentLocation.slug)}>
                    {Object.keys(parentLocation).length > 0 && `All ${parentLocation.name}`}
                    </div>
                    </div>
                </div>
                {Object.keys(parentLocation).length > 0 && (<hr />)}
             </div>
             {children.map((location, i) => (
                <div className="col-md-12 "  key={i}>
               <div>
                <div className="row">
                    <div className="col-md-12 link">
                    <div className=" w3-left" onClick={() => handleLocation(location.slug)}>
                    {location.name}
                    </div>
                    </div>
                </div>
                <hr />
               </div>
                </div>
                ))}  
                </div>
                   )}
                </div>
            ))}
            </div>
                
            </div>
            </div>
         </div>
        </div>
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
                .link{
                    cursor: pointer;
                    color: blue;
                }
            .w3-modal-content{
                  max-width: 500px;
                }    
                .children{
                   background: lightgrey;
               }
            `}
        </style>
        </>
    )
}





export default Location;