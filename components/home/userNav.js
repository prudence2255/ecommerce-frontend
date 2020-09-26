import Link from 'next/link';
import {
NavIcon} from 'components/admin/icons'; 

export default function UserNav(){
    return(
        <>
            <div className="w3-bar-block">
            <h5 className="text-center w-100">Account</h5>
            <hr />
            <div>
            <Link href="/ad/account">
                <a className="w3-bar-item">My account <span className="w3-right"> <NavIcon /></span></a>           
             </Link>
            </div>
            <hr />
            <div>
            <Link href="/ad/settings">
                <a className="w3-bar-item">Settings <span className="w3-right"> <NavIcon /></span></a>
            </Link>
            </div>
            </div>
        </>
    )
}