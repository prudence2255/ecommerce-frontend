import {AiFillCaretDown, AiFillCar, AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import { FaUsers, FaBuysellads,
    FaCalculator, FaBars, FaHome, FaUserCircle, FaFilter } from "react-icons/fa";
import {GoLocation, GoDashboard} from "react-icons/go";
import {RiAdminLine, RiComputerLine} from "react-icons/ri";
import {MdErrorOutline, MdChevronRight, MdClose} from "react-icons/md";
import {FcElectronics, FcServices} from 'react-icons/fc';
import {GiHouse, GiLargeDress, GiBed} from 'react-icons/gi';
import {FiPhoneCall} from 'react-icons/fi';
import {IoMdRemoveCircle} from 'react-icons/io';



export const RemoveIcon = () => {
    return (
        <>
        <IoMdRemoveCircle  color="red" size="25"/>
        </>
    )
}
export const PhoneIcon = () => {
        return (
            <>
            <FiPhoneCall color="#22B822" size="20"/>
            </>
        )
}

export const FilterIcon = () => {
    return (
        <>
        <FaFilter color="#22B822"/>
        </>
    )
}
export const CloseIcon = () => {
    return(
        <>
        <MdClose size="30"/>
        </>
    )
}

export const RightIcon = () => {
    return(
        <>
        <AiOutlineRight />
        </>
    )
}

export const AlertIcon = () => {
    return(
        <>
        <MdErrorOutline color="#f00"/>
            </>
    )
  
}

export const LeftIcon = () => {
    return(
        <>
        <AiOutlineLeft color="#22B822"/>
            </>
    )
  
}

export const PropertyIcon = ({size}) => {
    return(
        <>
        <GiHouse color="#22B822" size={size}/>
            </>
    )
  
}

export const ClothIcon = ({size}) => {
    return(
        <>
        <GiLargeDress color="#22B822" size={size}/>
            </>
    )
}

export const ServicesIcon = ({size}) => {
    return(
        <>
        <FcServices color="#22B822" size={size}/>
            </>
    )
}

export const ElectIcon = ({size}) => {
    return(
        <>
        <FcElectronics color="#22B822" size={size}/>
        </>
    )
}

export const CarIcon = ({size}) => {
    return(
        <>
        <AiFillCar color="#22B822" size={size}/>
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

export const NavIcon = () => (
    <>
    <MdChevronRight />
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

export const ElectronicsIcon = ({size}) => (
    <>
    <RiComputerLine  color="#22B822" size={size}/>
    </>
)


export const HomeGardenIcon = ({size}) => (
    <>
    <GiBed color="#22B822" size={size}/>
    </>
)