import * as A from 'components/adminImports';


const Property = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Property type: </span>{ad.property.type}</p>
        <p><span>Street / Landmark: </span>{ad.landmark}</p>
        <p><span>Size: </span>{ad.size}</p>
     </div>
    </div>
    </>
  )
}


export default Property;