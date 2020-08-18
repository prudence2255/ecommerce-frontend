import {AiFillCaretDown} from "react-icons/ai";
import { FaUsers, FaBuysellads,
    FaCalculator, FaBars, FaHome, FaUserCircle } from "react-icons/fa";
import {GoLocation, GoDashboard} from "react-icons/go";
import {RiAdminLine} from "react-icons/ri";
import {MdErrorOutline} from "react-icons/md"


export const AlertIcon = () => {
    return(
        <>
        <MdErrorOutline color="#f00"/>
            </>
    )
  
}
export const BarIcon = () => (
    <>
    <FaBars title="open nav"/>
    </>

)

export const HomeIcon = () => (
    <>
    <FaHome title="home"/>
    </>

)

export const DashboardIcon = () => (
    <>
    <GoDashboard title="dashboard"/>
    </>

)

export const UserIcon = () => (
    <>
    <FaUserCircle title="user"/>
    </>

)


export const Caret = () => (
    <>
    <AiFillCaretDown />
    </>
)

export const UsersIcon = () => (
    <>
    <FaUsers color="#228B22"/>
    </>
)

export const AdminIcon = () => (
    <>
    <RiAdminLine color="#228B22" title="admins"/>
    </>
)

export const AdIcon = () => (
    <>
    <FaBuysellads color="#228B22" title="ads"/>
    </>
)

export const LocationIcon = () => (
    <>
    <GoLocation color="#228B22" title="locations"/>
    </>
)

export const CategoryIcon = () => (
    <>
    <FaCalculator color="#228B22" title="categories"/>
    </>
)

