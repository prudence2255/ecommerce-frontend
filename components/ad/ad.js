import * as A from 'components/adminImports';
import * as yup from "yup";
import Moment from 'react-moment';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';

const transform = new A.TransForm();



const Ad = ({ad}) => {
    return (
        <>
     <div className="media">
    <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`}>
        <a>
        <img className="align-self-start mr-3 w3-card" src={ad?.images[0].xsmall } alt="img" 
     style={{width: '150px', height: '100px'}}/>
        </a>
    </Link>
    <div className="media-body">
    <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`}>
    <a>
    <h6 className="mt-0">{transform.shortenLength(ad.title, 20) } {ad.condition ? `(${ad.condition})` : null}</h6>
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
       Link, a{
          color: #000000!important
      }
        `}
    </style>
        </>
    )
}

export const Loader = () => {
    return (
        <>
    <div className="media">
    <Skeleton />
    <div className="media-body">
    <Skeleton />
     </div>
    </div>
        </>
    )
}

export default Ad;