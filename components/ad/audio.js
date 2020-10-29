import * as A from 'components/adminImports';


const Audio = ({ad}) => {
  return (
    <>
    <div className="row">
    <div className="col features">
        <p><span>Item type: </span>{ad.audio_type.type}</p>
     </div>
    </div>
    </>
  )
}


export default Audio