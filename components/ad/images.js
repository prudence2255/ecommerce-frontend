import ImageGallery from 'react-image-gallery';
import { Carousel } from 'react-responsive-carousel';


const Images = ({ad}) => {

       const images = ad.images.map(image => ({
            original: image?.small,
            thumbnail: image?.xsmall,
       })
       )
    return (
        <>
        <Carousel 
        showIndicators={true}
        showThumbs={true}
        infiniteLoop={true}
        autoPlay={false}
        >
                {ad.images?.map((image, i) => (
                  <div key={i}>
                    <img src={image.medium} className="img-slide d-none d-lg-block" alt={ad.title}/>
                    <img src={image.small} className="img-slide d-block d-lg-none" alt={ad.title}/>
                </div>
                ))}
            </Carousel>
        {/* <ImageGallery items={images}
            originalAlt={ad.title}
        /> */}


        <style jsx>
            {`
            .img-slide{
                height: 400px;
            }
        @media(max-width: 768px){
            .img-slide{
                height: 250px;
            }
        }
            `}
        </style>
       
        </>
    )
}


export default Images;