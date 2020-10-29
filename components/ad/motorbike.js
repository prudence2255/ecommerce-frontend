import * as A from 'components/adminImports';

const transform = new A.TransForm();

const Motorbike = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Brand: </span>{ad.motor_brand.brand}</p>
        <p><span>Model: </span>{ad.motor_model.model}</p>
        <p><span>Trim / Edition: </span>{ad.edition}</p>
        <p><span>Model year: </span>{ad.model_year}</p>
        <p><span>Mileage: </span>{transform.formatNum(ad.mileage)} Km</p>
        <p><span>Engine capacity: </span>{ad.engine_capacity} Litre</p>
     </div>
    </div>
    </>
  )
}


export default Motorbike;