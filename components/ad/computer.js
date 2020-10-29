import * as A from 'components/adminImports';


const Computer = ({ad}) => {
  return (
    <>
 <div className="row">
    <div className="col features">
          <p><span>Device type:</span> {ad.device}</p>
          <p><span>Brand:</span> {ad.computer_brand.brand}</p>
          <p><span>Model:</span> {ad.model}</p>
      </div>
    </div>
    </>
  )
}


export default Computer