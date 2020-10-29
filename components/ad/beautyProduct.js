import * as A from 'components/adminImports';


const BeautyProduct = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Item type: </span>{ad.item_type}</p>
     </div>
    </div>
    </>
  )
}


export default BeautyProduct