import * as A from 'components/adminImports';


const Land = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Street / Landmark: </span>{ad.landmark}</p>
        <p><span>Land type: </span>{ad.land_type}</p>
        <p><span>Land size: </span>{ad.size}</p>
     </div>
    </div>
    </>
  )
}


export default Land;