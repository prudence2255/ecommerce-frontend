import * as A from 'components/adminImports';


const ImageUpload = ({error}) => {
    const [urls, setUrls] = A.useState([]);
    const [photoErr, setPhotoErr] = A.useState(null);
    const photo = A.useRef(null);
    const dispatch = A.useDispatch();

const handlePhoto = async(e) => { 
    let extensions = ["jpg", "jpeg", "png"];
    let imageExt = e.target.files[0].type;
    const isExt = extensions.includes(imageExt.substr(imageExt.lastIndexOf("/") + 1));
    if(!isExt){
        setPhotoErr('The photo must be a file of type: jpeg, jpg, png.')
        return
    }else{
        setPhotoErr(null)
    }

let urlObj = [...urls];
if(e.target.files[0]){
    setUrls([...urlObj, URL.createObjectURL(e.target.files[0])]);
    dispatch(A.setPhotos(e.target.files[0]))
}

 }

 const handleRemove = (index) => {
     let urlObj = [...urls]
     urlObj.splice(index, 1)
     setUrls(urlObj)
     dispatch(A.removePhoto(index))
 }
    return(
        <>
        <div className="row">
            
           {urls?.map((url, index) => (
            <div className="col-md-12" key={index}> 
                <div className="my-2" >
                   <div className="w3-left">
                   <img src={url} alt="ad" className="ad"/>
                   </div>
                   <div className="w3-right mt-5">
                       <a className="btn btn-danger" onClick={() => handleRemove(index)}>Remove</a>
                   </div>
                </div>
                </div>  
            ))}  
            {photoErr && <p className="error">{photoErr}</p>} 
            {error && <p className="error">{error}</p>}
            </div> 
            <div className="row">
            <div className="col-md-12">
            <div className="w3-left">
           </div>
            <div className="w3-right mt-5">
            <input type="file" id="actual-btn" hidden name="photo" ref={photo} onChange={handlePhoto}/>
            <label htmlFor="actual-btn" className="w3-btn photo-btn" >+</label>
            </div>
            </div>
           
            </div> 
            <style jsx>
                {`
                .photo-btn{
             background: green;
             border-radius: 50%;
             color: white;
             font-weight: bold;
             font-size: 20px;
           }  

           .ad{
               width: 170px;
               height: 100px;
           }
                `}
            </style>
        </>
    )
    
}

export default ImageUpload;