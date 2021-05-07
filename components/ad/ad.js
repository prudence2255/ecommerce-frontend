import * as A from 'components/adminImports';
import Moment from 'react-moment';

import Link from 'next/link';

const transform = new A.TransForm();



const Ad = ({ad}) => {

const {slug, images, title, condition, price, category, location, updated_at} = ad;
const definedImages = images?.filter(img => img !== null);


    return (
     <>
     <div className="media">
    <Link href={`/ads/[ad]`} as={`/ads/${slug}`} >
        <a >
        <img className="align-self-start mr-3 img" src={definedImages?.length > 0 ? definedImages[0].xsmall : title} alt="img" />
        </a>
    </Link>
    <div className="media-body">
    <Link href={`/ads/[ad]`} as={`/ads/${slug}`}>
    <a >
    <h6 className="mt-0 ">
    <b>{transform.shortenLength(title, 20) }
     {condition && (
     <small className="w3-right">{condition === 'New' ? <span className="new">{condition}</span> : <span className="used">{condition}</span>}</small>
     )}

     </b>
    </h6>
   <p>{location ?? ''}, {transform.shortenLength(category, 20) }</p>
   <div>
   <p className="price w3-left"><b>GHC {transform.formatNum(price) }</b></p>
       <div className="w3-right mr-2">
       <Moment fromNow ago>{updated_at}</Moment>
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