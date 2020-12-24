import * as A from 'components/adminImports';
import Moment from 'react-moment';

import Link from 'next/link';

const transform = new A.TransForm();



const Ad = ({ad}) => {
    return (
        <>
     <div className="media">
    <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`} >
        <a >
        <img className="align-self-start mr-3 img" src={ad?.images[0].xsmall } alt="img" />
        </a>
    </Link>
    <div className="media-body">
    <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`}>
    <a >
    <h6 className="mt-0 ">
    <b>{transform.shortenLength(ad.title, 20) }
     {ad.condition && (
     <small className="w3-right">{ad.condition === 'New' ? <span className="new">{ad.condition}</span> : <span className="used">{ad.condition}</span>}</small>
     )}

     </b>
    </h6>
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
        hr{
            color: #A9A9A9;
            font-weight: bold;
        }
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
          color:  #262626!important;
      }
       h6{
          color: #262626;
      }

      h6{
          font-size: 18px!important;
      }
      
      .media:hover{
            padding-left: 10px;
            
          border-left: 3px solid green;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      }

      @media(max-width: 768px){
          h6{
              font-size: 16px!important;
          }
      }
        `}
    </style>
        </>
    )
}



export default Ad;