import * as A from 'components/adminImports';


const MobilePhone = ({ad}) => {
  return (
    <>
    <div className="row">
    <div className="col features">
          <p><span>Brand:</span> {ad.mobile_brand.brand}</p>
           <p><span>Model:</span> {ad.mobile_model.model}</p>
          {ad.edition && (<p><span>Edition:</span> {ad.edition}</p>)}
      </div>
    </div>
    {ad.features && (
      <div>
      <div className="col">
        <b>Features</b>
      </div>
      <div className="row">
      <div className="col d-flex">
        {ad.features.map((feature, i) => (
          <p key={i}>{feature}</p>
        ))}
      </div>
    </div>
      </div>
    )}
    </>
  )
}


export default MobilePhone;