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
        .image-gallery-image{
            height: 200px!important;
        }
        `}
        </style>
        </>
    )
}


export default Images;