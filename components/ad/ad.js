import * as A from 'components/adminImports';
import Moment from 'react-moment';

import Link from 'next/link';

const transform = new A.TransForm();



const Ad = ({ad}) => {
const dispatch = A.useDispatch();

    const goToPage = () => {
        dispatch(A.progressStart());
      }
    return (
        <>
     <div className="media">
    <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`} >
        <a onClick={goToPage}>
        <img className="align-self-start mr-3 img" src={ad?.images[0].xsmall } alt="img" />
        </a>
    </Link>
    <div className="media-body">
    <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`}>
    <a onClick={goToPage}>
    <h6 className="mt-0"><b>{transform.shortenLength(ad.title, 20) } {ad.condition ? `(${ad.condition})` : null}</b></h6>
   <p>{ad.location ?? ''}, {transform.shortenLength(ad.category, 20) }</p>
   <div>
   <p className="price w3-left"><b>GHC {transform.formatNum(ad.price) }</b></p>
       <div className="w3-right mr-2">
       <Moment fromNow ago>{ad.updated_at}</Moment>
       </div>
   </div>
   </a>
    </Link>
     </div>
    </div>
    <hr />
    <style jsx>
        {`
        .price{
            color: #22B822;
        }
        .img{
            height: 100px;
            width: 150px;
        }
        @media(max-width: 768px){
            .img{
                height: 70px;
                width: 100px;
            }
        }
       Link, a{
          color: #000000!important
      }
        `}
    </style>
        </>
    )
}



export default Ad;