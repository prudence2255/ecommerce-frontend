import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/home/layout';
import * as A from 'components/adminImports';
import { Carousel } from 'react-responsive-carousel';
import {Desktop, Mobile} from 'components/ad/homeCategories';
import {MobileSticky} from 'components/home/header';
import Search from  'components/ad/search';

export default function Home() {
const {items, recentAds} = A.useSelector(A.adsSelector);

const transform = new A.TransForm()
  return (
  <>
  <Head>
  <meta name="description" lang="en" content="Digishop is a multi-vendor e-commerce website" /> 
  <meta name="keywords" content="e-commerce,Ghana, shop online, sell online, buy online " />
  </Head>
  <MobileSticky />
   <Layout>
      <div className="container">
      <div className="row">
        <Search />
      </div>
      <div className="row">
        <div className="col-md-8 mx-auto welcome">
          <h4>Welcome to <span className="digishop">digishop</span> where you can buy and sell for free!</h4>
        </div>

      </div>
      <div className="row">
        <div className="col-md-8 mx-auto image-slider">
        <Carousel 
        showIndicators={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        >
                {Array.isArray(recentAds) && recentAds.map((ad, i) => (
                  <div key={i}>
                   <Link href={`/ads/[ad]`} as={`/ads/${ad.slug}`}>
                   <a>
                    <img src={ad.images[0].medium} className="img-slide" alt={ad.title}/>
                    <div className="legend">
                    <h5>
                    {ad.category}
                    </h5>
                      <h6> {transform.shortenLength(ad.title, 20)}</h6>
                      <h4 className="price">GHC {transform.formatNum(ad.price)}</h4>
                    </div>
                    </a>
                   </Link>
                </div>
                ))}
            </Carousel>
        </div>
      </div>
      <hr />
      <div className="row cat-title">
            <div className="col-md-6 mx-auto">
                  <h4 className="text-center">Categories</h4>
            </div>
      </div>
     <div className="row d-none d-lg-block">
     {Array.isArray(items) && <Desktop items={items}/>}
     </div>
     <div className="row d-block d-lg-none">
    {/* {Array.isArray(items) &&  <Mobile items={items}/>} */}
     </div>
     </div>
   </Layout>
   <style jsx>
     {`
     
     .welcome{
       margin-top: 20px;
     }
     .container{
       background: white;
       padding-top: 25px;
       padding-bottom: 100px;
     }

    

.cat-title{
  margin-top: 50px;
  text-align: center,

}

.cat-title h4, .digishop{
  color: #22B822;

}
   
     .img-slide{
       max-height: 350px;
     }
     .price{
       color: #22B822;
     }
     .legend{
       opacity: 1!important;
       background: transparent!important;
       color: #f6f6fd!important;
     }
     .image-slider{
       margin-top: 50px;
     }
     Link, a{
       color: black!important;
     }
     `}
   </style>
  </>
  )
}


export const getServerSideProps = A.wrapper.getServerSideProps(
  async ({store}) => {
     await store.dispatch(A.fetchRecentAds({url: '/api/recent-ads'}))
     await store.dispatch(A.fetchItems({url: '/api/main-categories'}))
}
)

