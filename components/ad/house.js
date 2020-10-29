import * as A from 'components/adminImports';


const House = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Size: </span>{ad.size}</p>
        <p><span>Beds: </span>{ad.beds}</p>
        <p><span>Baths: </span>{ad.baths}</p>
     </div>
    </div>
    </>
  )
}


export default House;