import * as A from 'components/adminImports';

const SideBarLocations = () => {
    const {categoryLocations} = A.useSelector(A.adsSelector);
    const {locations} = categoryLocations;

    const router = A.useRouter();
    const dispatch = A.useDispatch();
    
    const transFormArray = (array, id, check) => {
        const newArray = array?.filter(item => item[id] === check)
         return newArray;
        }

     const parentLocations = transFormArray(locations, 'parent_id', null);

   
     const handleLocation = (location) => {
        router.push({
            pathname: '/ads',
            query: {
                ...router.query,
                location: location
            }
        })
      
      }

    return (
        <>
<div className="col">
<div className="row">
       <div className="col mt-3">Locations:</div>
      </div>
      <div className="row">
       {parentLocations?.map(location => (
        <div className="col-md-12 mx-2 py-1" key={location.id}>
         <div className={`link ${router.query.location == location.slug ? 'active' : ''}`} onClick={() => handleLocation(location.slug)}>
             {location.name} <span className="count">{`(${location.ads_count})`}</span>
         </div>
        </div>
       ))}
      </div>
</div>

      <style jsx>
        {`
        .link{
                    cursor: pointer;
                    color: #6495ED;
                }

                .count{
                  color: #1a1a1a;
                }
                .active{
                    color: #1a1a1a;
                }
        `}
        </style>
        </>
    )
}


export default SideBarLocations;