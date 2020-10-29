import * as A from 'components/adminImports';


const ComputerAccessory = ({ad}) => {
  return (
    <>
<div className="row">
    <div className="col features">
          <p><span>Item type:</span> {ad.computer_accessory.type}</p>
      </div>
    </div>
    </>
  )
}


export default ComputerAccessory