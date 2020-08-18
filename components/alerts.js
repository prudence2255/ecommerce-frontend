import {errorsSelector} from 'store/admin/errorsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {AlertIcon} from './admin/icons';
import {clearErrors} from 'store/admin/errorsSlice';

export const ShowError = () => {
    const {error} = useSelector(errorsSelector)
    const dispatch = useDispatch()
const hideError = () => {
    dispatch(clearErrors())
}
    useEffect(() => {
        return () => {
        }
    }, [error])
    return(
        <>
        <div className={`errors`} >
           <div className={`error-content w3-card-2 `}>
           <div>
            <h3><AlertIcon /></h3>
        </div>
           <div>
           {
                error && error.map((e, i ) => (<p key={i}>{e}</p>))
            }
           </div>
           <div>
                <button className="btn btn-primary" onClick={hideError}>Ok</button>
           </div>
           </div>
        </div>
      
        <style jsx>
    {`
.errors{
  display:flex;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.error-content{
    border-radius: 30px;
    text-align: center;
    background: #F8F8FF;
    z-index: 9999;
    padding: 15px;
    color: brown;
}
.btn{
    border-radius: 50px;
}

 `}
</style>
        </>
    )
}

