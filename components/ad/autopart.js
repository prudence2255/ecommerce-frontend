import * as A from 'components/adminImports';


const AutoPart = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
        <p><span>Item type: </span>{ad.auto_part.type}</p>
     </div>
    </div>
    </>
  )
}


export default AutoPart