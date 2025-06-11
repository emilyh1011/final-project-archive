import {NavLink} from "react-router";

//This reusable component will represent our header across all pages
function Header(){

    //Destructure built-in isActive prop, {isActive}

    return(
        <>
           <nav className= "flex justify-evenly font-merriweather text-lg mt-6">
                <NavLink to="/home" className={({isActive})=> isActive ? "text-mediumblue font-bold" : "text-black hover:font-bold"}>HOME</NavLink>
                <NavLink to="/signed" className={({isActive})=> isActive ? "text-mediumblue font-bold": "text-black hover:font-bold"}>SIGNED</NavLink>
                <NavLink to="/submit" className={({isActive})=> isActive ? "text-mediumblue font-bold": "text-black hover:font-bold"}>SUBMIT</NavLink>
                
            </nav> 
        </>
    )

}

export default Header