import {useSelector} from 'react-redux'
import {BallBeat} from 'react-pure-loaders';
import {BallGridBeat} from 'react-pure-loaders';
import {loadersSelector} from 'store/admin/loadersSlice';
import { ProgressBarProvider } from 'react-redux-progress';
 

export const LineLoader = () => {
    const {loading} = useSelector(loadersSelector)
    return ( 
   <>
    <div className={`${loading ? 'full-loader' : ''}`}>
      <BallBeat 
           loading={loading}
            color='#228B22'
      />
    
    </div>
    <style jsx>{`
.full-loader {
  display:flex;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  justify-content: center;
  align-items: center;
  z-index: 999;
  color: white;
  opacity: 0.4;
}
    `}</style>
   </>
)
    }
export const GridLoader = () => {
    const {loading} = useSelector(loadersSelector)
    return (
    <>
    <div className={`${loading ? 'full-loader' : ''}`}>
        <BallGridBeat 
        loading={loading}
        color='#228B22'
        />
    </div>
    <style jsx>{`
.full-loader {
  display:flex;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
    `}</style>
    </>
)
}


export const ProgressBar = () => {
  const {progress} = useSelector(loadersSelector)
  return (
    <>
     <ProgressBarProvider isActive={progress} color="#db7093" />
    </>
  )
}