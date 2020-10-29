import Slider from "react-slick";
import * as A from 'components/adminImports';
import Moment from 'react-moment';
import Link from 'next/link';

const transform = new A.TransForm();

const SimilarAds = () => {
    const {similarAds} = A.useSelector(A.adsSelector);

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        rows: 2,
        nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <>
    <div className="similar_ads row p-2 pb-5 mt-2">
    <div className="col-md-12">
        <div className="row text-center">
        <h5 className="mx-auto"> Similar ads</h5>
        </div>
       <hr />
        <div>
        <Slider {...settings}>
         {similarAds.length > 0 && similarAds.map((ad, i) => (
            <div  key={i}>
            <div className="media">
            <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`}>
        <a>
        <img className="align-self-start mr-3 w3-card ad-img-small" src={ad?.images[0].xsmall } alt="img" 
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
            </div>
          ))}
        </Slider>
        </div>
    </div>
      </div>
      <style jsx>
                {`
            .similar_ads{
                background: white;
            }
            .price, .similar_ads h5{
            color: #22B822;
            }

            Link, a{
                color: black!important;
            }
                `}
            </style>
        </>
    )
}


export default SimilarAds;