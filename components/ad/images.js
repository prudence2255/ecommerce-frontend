import ImageGallery from 'react-image-gallery';


const Images = ({ad}) => {

       const images = ad.images.map(image => ({
            original: image.small,
            thumbnail: image.xsmall,
       })
       )
    return (
        <>
        <ImageGallery items={images}
            originalAlt={ad.title}
        />
        <style jsx>
        {`
    .image-gallery {
        width: 40%;
        height: auto;
    }

    .image-gallery-slide img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: cover;
    overflow: hidden;
    object-position: center center;
}

    .fullscreen .image-gallery-slide img {
     max-height: 100vh;
}
        `}
        </style>
        </>
    )
}


export default Images;