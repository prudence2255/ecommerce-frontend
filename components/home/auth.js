import {useEffect} from 'react';
import * as A from 'components/adminImports';
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export default function AuthRoute(Component) {
        return () => {
        const router = useRouter()
        const {error} = A.useSelector(A.errorsSelector)
        useEffect(() => {   
            if(error){
                if(error.includes('Unauthenticated.')){
                  cookies.remove('customer_token', {path: '/'}); 
                  router.push('/');
                }
              }  
            if (!cookies.get('customer_token')) router.push('/')
        }, [error])

        return (<Component {...arguments} />)
    }
}