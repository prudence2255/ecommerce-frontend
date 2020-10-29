import * as A from 'components/adminImports';


const Tv = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
          <p><span>Brand:</span> {ad.tv_brand.brand}</p>
          <p><span>Model:</span> {ad.model}</p>
      </div>
    </div>
    </>
  )
}


export default Tv;