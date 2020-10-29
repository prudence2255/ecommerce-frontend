import * as A from 'components/adminImports';


const Camera = ({ad}) => {
  return (
    <>
    <div className="row">
    <div className="col features">
        <p><span>Item type: </span>{ad.camera_type.type}</p>
        <p><span>Brand: </span> {ad.camera_brand.brand}</p>
     </div>
    </div>
    </>
  )
}


export default Camera