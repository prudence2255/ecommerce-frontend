import {useEffect} from 'react';

import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export default function AuthRoute(Component) {
    return () => {
    
    const router = useRouter()
   
        useEffect(() => {     
            if (!cookies.get('customer_token')) router.push('/')
        }, [])

        return (<Component {...arguments} />)
    }
}