import ImageGallery from 'react-image-gallery';


const Images = ({ad}) => {

       const images = ad.images.map(image => ({
            original: image?.small,
            thumbnail: image?.xsmall,
       })
       )
    return (
        <>
        <ImageGallery items={images}
            originalAlt={ad.title}
        />
        <style jsx>
            {`
            .image-gallery-slide img {
    width: 100%;
    height: 400px;
    max-height: 80vh;
    object-fit: cover;
    overflow: hidden;
    object-position: center center;
}

    .fullscreen .image-gallery-slide img {
        height: 400px;
     max-height: 100vh;
}
            `}
        </style>
       
        </>
    )
}


export default Images;