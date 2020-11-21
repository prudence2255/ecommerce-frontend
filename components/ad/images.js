import ImageGallery from 'react-image-gallery';


const Images = ({ad}) => {

       const largeImages = ad.images.map(image => ({
            original: image?.medium,
            thumbnail: image?.xsmall,
       })
       )

       const smallImages = ad.images.map(image => ({
        original: image?.small,
        thumbnail: image?.xsmall,
   })
   )
    return (
        <>
        <div className="d-none d-lg-block">
        <ImageGallery items={largeImages}
            originalAlt={ad.title}
        />
    
        </div>
        <div className="d-block d-lg-none">
        <ImageGallery items={smallImages}
            originalAlt={ad.title}
        />
    
        </div>
    

        </>
    )
}


export default Images;