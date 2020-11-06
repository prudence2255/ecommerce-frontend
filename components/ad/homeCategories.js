import Link from 'next/link';
import { PropertyIcon, ClothIcon,
    ServicesIcon, CarIcon, HomeGardenIcon,
    ElectronicsIcon}  from 'components/admin/icons';

export const Desktop = ({items}) => {
    return (
        <>
<div className="row categories">
       {items.map(item => {
        if(item.name === 'Electronics'){
          return(
           <div className="col-md-3 col-sm-6 mx-2 text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ElectronicsIcon size="100"/>
         </div>
         <h4>
         {item.name}
         </h4>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Property'){
          return(
           <div className="col-md-3 col-sm-6 mx-2 text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <PropertyIcon size="100"/>
         </div>
         <h4>
         
         {item.name}
        
         </h4>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Vehicles'){
          return(
           <div className="col-md-3 col-sm-6 mx-2 text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`}  >
           <a>
         <div>
         <CarIcon size="100"/>
         </div>
         <h4>
        
         {item.name}
        
         </h4>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Services'){
          return(
           <div className="col-md-3 col-sm-6 mx-2 text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ServicesIcon size="100"/>
         </div>
         <h4>
         {item.name}
         </h4>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Clothing & Beauty'){
          return(
           <div className="col-md-3 col-sm-6 mx-2 text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ClothIcon size="100"/>
         </div>
         <h4>
        
         {item.name}
        
         </h4>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {Array.isArray(items) && items.map(item => {
        if(item.name === 'Home & Garden'){
          return(
           <div className="col-md-3 col-sm-6 mx-2 text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
           
         <div>
         <HomeGardenIcon size="100"/>
         </div>
         <h4>
         
         {item.name}
         
         </h4>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
      </div>
      <style jsx>
     {`
     

     .categories{ 
       justify-content: center;
     }
     .categories .col-md-3{
       margin-top: 50px;
       border-radius: 10px;
       border: 2px solid green;
     }
     Link, a{
       color: black!important;
     }
     `}
   </style>
        </>
    )
}

export const Mobile = ({items}) => {
    return (
        <>
<div className="row categories d-flex">
       {items.map(item => {
        if(item.name === 'Electronics'){
          return(
           <div className="flex-item text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ElectronicsIcon size="50"/>
         </div>
         <h6>
         {item.name}
         </h6>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Property'){
          return(
           <div className="flex-item text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <PropertyIcon size="50"/>
         </div>
         <h6>
         
         {item.name}
        
         </h6>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Vehicles'){
          return(
           <div className="flex-item text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`}  >
           <a>
         <div>
         <CarIcon size="50"/>
         </div>
         <h6>
        
         {item.name}
        
         </h6>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Services'){
          return(
           <div className="flex-item text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ServicesIcon size="50"/>
         </div>
         <h6>
         {item.name}
         </h6>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {items.map(item => {
        if(item.name === 'Clothing & Beauty'){
          return(
           <div className="flex-item text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
         <div>
         <ClothIcon size="50"/>
         </div>
         <h6>
        
         {item.name}
        
         </h6>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
       {Array.isArray(items) && items.map(item => {
        if(item.name === 'Home & Garden'){
          return(
           <div className="flex-item text-center" key={item.id}>
           <Link href={`/ads?category=${item.slug}`} >
           <a>
           
         <div>
         <HomeGardenIcon size="50"/>
         </div>
         <h6>
         
         {item.name}
         
         </h6>
         </a>
         </Link>
        </div>
          )
        }
       })
       }
      </div>
      <style jsx>
     {`
     

     .categories{ 
       justify-content: center;
     }
     .categories .flex-item{
       margin-top: 50px;
       border-radius: 10px;
       border: 2px solid green;
       width: 180px;
     }
     Link, a{
       color: black!important;
     }
     `}
   </style>
        </>
    )
}