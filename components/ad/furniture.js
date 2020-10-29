import * as A from 'components/adminImports';


const Furniture = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Furniture type: </span>{ad.furniture_type}</p>
     </div>
    </div>
    </>
  )
}


export default Furniture;