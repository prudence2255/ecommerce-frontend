import * as A from 'components/adminImports';
import * as AdFeatures from './adFeatures';

function Features(){
 const {ad} = A.useSelector(A.adsSelector); 


A.useEffect(() => {
    return () => {}
}, [ad])
    

    return(
        <>
            <div className="">
            {ad.category === "Mobile Phones" && <AdFeatures.MobilePhone 
                                                    ad={ad}
                                                    />}
            {ad.category === "Computers & Tablets" && <AdFeatures.Computer 
                                                    ad={ad}
                                                    />}  
             {ad.category === "Computer Accessories" && <AdFeatures.ComputerAccessory
                                                    ad={ad}
                                                    />}    
             {ad.category === "Tvs" && <AdFeatures.Tv
                                                    ad={ad}
                                                    />}  
            {ad.category === "Tv & Video Accessories" && <AdFeatures.TvAccessory
                                                    ad={ad}
                                                    />} 
              {ad.category === "Cameras & Camcorders" && <AdFeatures.Camera
                                                    ad={ad}
                                                    />}    
              {ad.category === "Audio & Mp3" && <AdFeatures.Audio
                                                    ad={ad}
                                                    />} 
                                                    
               {ad.category === "Cars" && <AdFeatures.Car
                                                    ad={ad}
                                                    />}    
               {ad.category === "Motorbikes & Scooters" && <AdFeatures.Motorbike
                                                    ad={ad}
                                                    />}  

                {ad.category === "Auto Parts & Accessories" && <AdFeatures.AutoPart
                                                    ad={ad}
                                                    />} 
                 {ad.category === "Beauty Products" && <AdFeatures.BeautyProduct
                                                    ad={ad}
                                                    />}  
                {ad.category === "Clothing & Fashion" && <AdFeatures.Clothing
                                                    ad={ad}
                                                    />} 
                {ad.category === "Shoes & Footwear" && <AdFeatures.FootWear
                                                    ad={ad}
                                                    />}  
               {ad.category === "Commercial Property" && <AdFeatures.Property
                                                    ad={ad}
                                                    />} 
             {ad.category === "Houses" && <AdFeatures.House
                                                    ad={ad}
                                                    />} 
             {ad.category === "Apartments" && <AdFeatures.House
                                                    ad={ad}
                                                    />} 
           {ad.category === "Land" && <AdFeatures.Land
                                                    ad={ad}
                                                    />}     
             {ad.category === "Electricity, AC & Bathroom" && <AdFeatures.Electricity
                                                    ad={ad}
                                                    />}     
              {ad.category === "Furniture" && <AdFeatures.Furniture
                                                    ad={ad}
                                                    />}     
           {ad.category === "Home Appliances" && <AdFeatures.HomeAp
                                                    ad={ad}
                                                    />}     
            {ad.category === "Domestic & Personal Services" && <AdFeatures.Domestic
                                                    ad={ad}
                                                    />}     
             {ad.category === "Events & Hospitality" && <AdFeatures.Hospitality
                                                    ad={ad}
                                                    />}     
            {ad.category === "Trade Services" && <AdFeatures.Trade
                                                    ad={ad}
                                                    />}     
            {ad.category === "Health & Lifestyle" && <AdFeatures.Health
                                                    ad={ad}
                                                    />}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            </div>

       <style jsx>
        {`   
            
        `}
       </style>
        </>
    )
}

export default Features;

