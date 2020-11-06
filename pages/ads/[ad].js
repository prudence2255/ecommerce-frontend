import * as A from 'components/adminImports';
import Head from 'next/head';
import Layout from 'components/home/layout';
import Images from 'components/ad/images';
import { PhoneIcon}  from 'components/admin/icons';
import Features  from 'components/ad/features';
import SimilarAds from 'components/ad/similarAds';
import {MobileSticky} from 'components/home/header';
const transform = new A.TransForm();

export default function Ad(){
  const {ad} = A.useSelector(A.adsSelector);
    const [showContact, setShowContact] = A.useState();
    const cats = [
        "Mobile Phones", "Computers & Tablets", "Tvs", "Mobile Phone Accessories",
        "Computer Accessories", "Cameras & Camcorders", "Tv & Video Accessories", 
        "Audio & Mp3", "Cars", "Motorbikes & Scooters", "Auto Parts & Accessories",
        "Electricity, AC & Bathroom",
    ]
    
    const isCondition = cats.includes(ad.category);
    const router = A.useRouter();
    const handleContact = () => {
        setShowContact(true);
    }

    A.useEffect(() => {
        console.log(router.pathname)
        return () => {}
    }, [ad])
    return (
        <>
        {Object.keys(ad).length > 0 && 
            <Head>
                 <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>
                   {ad.title}
                </title>
                <meta property="og:title" content={ad.title} />
                 <meta name="twitter:image" content={ad.images[0].large} />
                  <meta property="og:image" content={ad.images[0].large} />                             
                 <meta property="og:image:width" content="1200" />
                 <meta property="og:image:height" content="630" />                                 
                 <meta name="description" lang="en" content={ad.description} />
                 <meta name="twitter:title" content={ad.title} />
                 <meta name="twitter:url" content={router.pathname} />
                 <meta name="twitter:description" content={ad.description}/>
                 <meta property="og:url" content={router.pathname} />
                 <meta property="og:description" content={ad.description}/>
                <link rel="canonical" href={router.pathname} />
                <meta name="theme-color" content="#008000" />
         </Head>}
        <Layout>
        <MobileSticky />
            <div className="container">
               {Object.keys(ad).length > 0 && (
                <div className="row">
                    <div className="col-md-8 py-2 px-lg-5 mx-auto pb-5">
                    <div className="row">
                    <div className="col">
                    <h5><b>{ad.title}</b></h5>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <p>
                        <span>
                        Posted on {new Date().toDateString(ad.created_at)}, {ad.location}, {ad.main_location}
                        </span>

                    </p>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Images ad={ad}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-3">
                           <h4 className="price mr-2">GHC {transform.formatNum(ad.price)}</h4>
                           <small className="mt-2">{ad.negotiable === '0' ? '' : ad.negotiable}</small>
                        </div>
                    </div>
                    
                   {isCondition && (
                   <div className="row ">
                   <div className="col features mt-md-2">
                    <p><span>Condition: </span> {ad.condition}</p>
                    </div>
                   </div>
                   )}
                    <div className="row">
                        <div className="col">
                           <Features />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mt-3">
                           <p><b>Description</b></p>
                           {ad.description} 
                        </div>
                    </div>
                    <div className="col d-block d-lg-none border mt-3">
                        <div className="row">
                            <div className="col">
                                <p>For sale by <b>{ad.customer.name}</b></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                            {!showContact && (
                                <a className="btn" onClick={handleContact}>
                                <PhoneIcon />  <span><b>{transform.formatPhone(ad.customer.contact[0])}</b></span>
                                <br />
                                <small>Click to show contact</small>
                                </a>
                            )}
                            {showContact && <p className="ml-3"><b>Call seller</b></p>}
                            {showContact && ad.customer.contact.map((contact, i) => (
                                <p key={i}>
                                <PhoneIcon />  <span><b>{contact}</b></span> 
                                </p>
                            ))}
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 offset-md-1 p-2 d-none d-lg-block">
                        <div className="row">
                            <div className="col">
                                <p>For sale by <b>{ad.customer.name}</b></p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col">
                            {!showContact && (
                                <a className="btn" onClick={handleContact}>
                                <PhoneIcon />  <span><b>{transform.formatPhone(ad.customer.contact[0])}</b></span>
                                <br />
                                <small>Click to show contact</small>
                                </a>
                            )}
                            {showContact && <p className="ml-3"><b>Call seller</b></p>}
                            {showContact && ad.customer.contact.map((contact, i) => (
                                <p key={i}>
                                <PhoneIcon />  <span><b>{contact}</b></span> 
                                </p>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
               )}
             <div className="row mt-5">
                <div className="col mx-auto">
                <SimilarAds />
                </div>
             </div>
            </div>
            <style jsx>
                {`
                .container{
             padding-top: 25px;
            padding-bottom: 100px;
      }
      .col-md-8, .col-md-3{
        background: white;
      }
      .price{
            color: #22B822;
        }
                `}
            </style>
        </Layout>
        </>
    )
}


export const getServerSideProps = A.wrapper.getServerSideProps(
    async ({store, query}) => {
       await store.dispatch(A.fetchAd({url: `/api/view-ad/${query.ad}`}))
  }
  )