import * as A from 'components/adminImports';
import {RightIcon, Caret, CloseIcon} from 'components/admin/icons';


const transFormArray = (array, id, check) => {
const newArray = array?.filter(item => item[id] === check)
 return newArray;
}




const Category = ({categoryModal, setCategoryModal}) => {
    const [parentCategory, setParent] = A.useState({});
    const [children, setChildren] = A.useState([]);
    const router = A.useRouter();

    const {categoryLocations} = A.useSelector(A.adsSelector);
    const {categories} = categoryLocations;
    const parentCategories = transFormArray(categories, 'parent_id', null);
    const closeModal = () => {
        setCategoryModal(false)
    }
const handleChildren = (id) => {
    const parentCategory = categories.find(category => category.id === id);
    setChildren(transFormArray(categories, 'parent_id', id))
    setParent(parentCategory);
}
    const handleCategory = (category) => {
        router.push({
            pathname: '/ads',
            query: {
                ...router.query,
                category: category
            }
        })
        setCategoryModal(false)
    }
    return(
        <>
        <div>
        <div className={`w3-modal ${categoryModal ? 'openModal' : ''}`} >
        <div className="w3-modal-content w3-animate-zoom">
        <div className="card">
         <div className="card-header w3-blue">
          <h5 className=" w3-center">Select a category </h5>
          <button className="w3-btn close-btn" onClick={closeModal}>
          <CloseIcon />
          </button>
        </div>
        <div className="card-body">
        <div className="row" >
        <div className="col-md-12">
        <div className="row">
        {parentCategories && parentCategories.map((category, i) => (
                <div className="col-md-12" key={i}>
                <div>
              <div className="row">
             <div className="col-md-12 link" onClick={() => handleChildren(category.id)}>
             <div className=" w3-left" >
            {category.name} 
            </div>
             <div className="w3-right">
            <RightIcon />
             </div>
             </div>
              </div>
          </div>
          <hr />
          
                
         {category.name === parentCategory.name && (
             <div className="children">
             <div className="col-md-12">
             <div className="row">
                    <div className="col-md-12 link">
                    <div className=" w3-left" onClick={() => handleCategory(parentCategory.slug)}>
                    {Object.keys(parentCategory).length > 0 && `All ${parentCategory.name}`}
                    </div>
                    </div>
                </div>
                {Object.keys(parentCategory).length > 0 && (<hr />)}
             </div>
             {children.map((category, i) => (
                <div className="col-md-12 "  key={i}>
               <div>
                <div className="row">
                    <div className="col-md-12 link">
                    <div className=" w3-left" onClick={() => handleCategory(category.slug)}>
                    {category.name}
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
               .children{
                   background: lightgrey;
               }
               .w3-modal-content{
                  max-width: 500px;
                }
            `}
        </style>
        </>
    )
}


export default Category;