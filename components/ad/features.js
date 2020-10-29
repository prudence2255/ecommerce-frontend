import * as A from 'components/adminImports';
import * as Forms from './forms';

function Features(){
 const {ad} = A.useSelector(A.adsSelector); 
 const isAd = Object.keys(ad).length > 0;
 const router = A.useRouter();
const dispatch = A.useDispatch();

A.useEffect(() => {
    return () => {}
}, [ad])
    

    return(
        <>
            <div className="">
            {ad.category === "Mobile Phones" && <Forms.MobilePhone 
                                                    ad={ad}
                                                    />}
            {ad.category === "Computers & Tablets" && <Forms.Computer 
                                                    ad={ad}
                                                    />}  
             {ad.category === "Computer Accessories" && <Forms.ComputerAccessory
                                                    ad={ad}
                                                    />}    
             {ad.category === "Tvs" && <Forms.Tv
                                                    ad={ad}
                                                    />}  
            {ad.category === "Tv & Video Accessories" && <Forms.TvAccessory
                                                    ad={ad}
                                                    />} 
              {ad.category === "Cameras & Camcorders" && <Forms.Camera
                                                    ad={ad}
                                                    />}    
              {ad.category === "Audio & Mp3" && <Forms.Audio
                                                    ad={ad}
                                                    />} 
                                                    
               {ad.category === "Cars" && <Forms.Car
                                                    ad={ad}
                                                    />}    
               {ad.category === "Motorbikes & Scooters" && <Forms.Motorbike
                                                    ad={ad}
                                                    />}  

                {ad.category === "Auto Parts & Accessories" && <Forms.AutoPart
                                                    ad={ad}
                                                    />} 
                 {ad.category === "Beauty Products" && <Forms.BeautyProduct
                                                    ad={ad}
                                                    />}  
                {ad.category === "Clothing & Fashion" && <Forms.Clothing
                                                    ad={ad}
                                                    />} 
                {ad.category === "Shoes & Footwear" && <Forms.FootWear
                                                    ad={ad}
                                                    />}  
               {ad.category === "Commercial Property" && <Forms.Property
                                                    ad={ad}
                                                    />} 
             {ad.category === "Houses" && <Forms.House
                                                    ad={ad}
                                                    />} 
             {ad.category === "Apartments" && <Forms.House
                                                    ad={ad}
                                                    />} 
           {ad.category === "Land" && <Forms.Land
                                                    ad={ad}
                                                    />}     
             {ad.category === "Electricity, AC & Bathroom" && <Forms.Electricity
                                                    ad={ad}
                                                    />}     
              {ad.category === "Furniture" && <Forms.Furniture
                                                    ad={ad}
                                                    />}     
           {ad.category === "Home Appliances" && <Forms.HomeAp
                                                    ad={ad}
                                                    />}     
            {ad.category === "Domestic & Personal Services" && <Forms.Domestic
                                                    ad={ad}
                                                    />}     
             {ad.category === "Events & Hospitality" && <Forms.Hospitality
                                                    ad={ad}
                                                    />}     
            {ad.category === "Trade Services" && <Forms.Trade
                                                    ad={ad}
                                                    />}     
            {ad.category === "Health & Lifestyle" && <Forms.Health
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

