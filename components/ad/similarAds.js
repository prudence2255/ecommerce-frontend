import Slider from "react-slick";
import * as A from 'components/adminImports';
import Ad from 'components/ad/ad';

const SimilarAds = () => {
    const {similarAds} = A.useSelector(A.adsSelector);
    const dispatch = A.useDispatch();
  
  
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
         {similarAds.length > 0 && similarAds.map((ad, i) => (<Ad  ad={ad} key={i}/>))}
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


export default SimilarAds;