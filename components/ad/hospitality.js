import * as A from 'components/adminImports';


const Hospitality = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Service type: </span>{ad.service_type}</p>
     </div>
    </div>
    </>
  )
}


export default Hospitality;