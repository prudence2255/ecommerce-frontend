import Slider from "react-slick";
import * as A from 'components/adminImports';
import Moment from 'react-moment';
import Link from 'next/link';

const transform = new A.TransForm();

const SimilarAds = () => {
    const {similarAds} = A.useSelector(A.adsSelector);
    const dispatch = A.useDispatch();
    const goToPage = () => {
      dispatch(A.progressStart());
    }
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
        rows: 3,
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
    <div className="similar_ads pb-5 mt-2 row">
    <div className="col">
        <div className="row text-center">
        <h5 className="mx-auto title"> Similar ads</h5>
        </div>
       <hr />
        <div className="px-3">
        <Slider {...settings}>
         {similarAds.length > 0 && similarAds.map((ad, i) => (
            <div  key={i}>
            <div className="media">
            <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`} >
        <a onClick={goToPage}>
        <img className="align-self-start mr-3 ad-img-small img" src={ad?.images[0].xsmall } alt="img" />
         </a>
        </Link>
        <div className="media-body">
        <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`} >
        <a onClick={goToPage}>
        <h6 className="mt-0 d-block d-lg-none"><b>{transform.shortenLength(ad.title, 20) } {ad.condition ? `(${ad.condition})` : null}</b></h6>
        <h5 className="mt-0 d-none d-lg-block"><b>{transform.shortenLength(ad.title, 20) } {ad.condition ? `(${ad.condition})` : null}</b></h5>
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
            .price, .similar_ads .title{
            color: #22B822;
            }

            Link, a{
                color:  #262626!important;
            }
                `}
            </style>
        </>
    )
}


export default SimilarAds;