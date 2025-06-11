//This will be the file to represent our Home page
import { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'; 

function Signed() {

    const navigate = useNavigate(); //Use the useNavigate hook to navigate to each individual letter page

    const [query, setQuery] = useState("");
    const [allLetters, setAllLetters] = useState([]); //At beginning of page load, always display all letters. Want to keep track of original letters
    const [displayedLetters, setDisplayedLetters] = useState([]); //This state keeps track of which letters will be displayed. If query="" then 
    //displayedLetters is our original allLetters, otherwise its our letters matching query

    //Fetch all letters at beginning of page reload
    useEffect(() => {
        axios.get("/api/v1/signed").then((response) => { //Recall, we sent back an array of letters, so response.data ok
            const fetchedLetters = response.data.map((letter)=>{
                return {
                    _id: letter._id,
                    recipient: letter.recipient,
                    description: letter.description,
                    name: letter.name,
                    color: `bg-${letter.color}`, //need to map color into classname style we want to use in case it breaks during build
                    createdAt: letter.createdAt
                }
            });
            setAllLetters(fetchedLetters);
            setDisplayedLetters(fetchedLetters);
            console.log("this is all letters ", allLetters);
        })
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        console.log("im in handle submit", query);

        //Attach params object to pass our query variable, params is the built in Axios object for passing get parameters
        axios.get("/api/v1/signed", { params: { query } }).then((response) => {
            const fetchedLetters = response.data.map((letter)=>{
                return {
                    _id: letter._id,
                    recipient: letter.recipient,
                    description: letter.description,
                    name: letter.name,
                    color: `bg-${letter.color}`, //need to map color into classname style we want to use in case it breaks during build
                    createdAt: letter.createdAt
                }
            });
            setDisplayedLetters(fetchedLetters);
            console.log("this is all letters: ", allLetters);
            console.log("this is displayed: ", displayedLetters);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="flex flex-col items-center gap-4">
                {/**Search bar, use outer div to mask as fake search bar wrapper, flex-row, shadow, rounded
                 * Lay SearchIcon and Input field next to each other with pl to make it appear icon is inside search bar too, blends into "mask"
                 * Hide outline for Input field so it blends into "mask"
                 */}
                <form className="mt-10 flex flex-row items-center w-md h-[60px] rounded-md shadow-md shadow-gray-700 pl-[8px]"
                    onSubmit={handleSubmit}>
                    <FaSearch className="text-mediumblue" />
                    <input
                        type="text"
                        name="searchbar"
                        value={query}
                        placeholder="What is your name?"
                        maxLength={19}

                        onChange={(event) => {
                            setQuery(event.target.value);
                        }}
                        className='w-full h-full font-merriweather text-[18px] pl-2 focus:outline-none'
                    >
                    </input>
                </form>
                
                {/*Place items center, centers grid items, this is grid for our letters*/}
                <div className = "grid grid-cols-2 gap-4 w-md place-items-center">

                {/**Create the JSX for each individual letter
                 * Add an onClick to navigate to individual letter's page
                 */}
                {displayedLetters.map((letter) => {
                    return <div  key={letter._id}
                    className={`flex flex-col w-[220px] h-[220px] ${letter.color} rounded-xl cursor-pointer justify-center items-center`}
                    onClick={()=> navigate("/letter-details/"+letter._id)}>
                       <p className = "font-merriweather w-4/5 text-[14px]">To: {letter.recipient}</p>
                       <div className = "w-4/5 h-4/5 bg-white rounded-md">
                            <p className = "p-2 font-merriweather w-full h-full text-[14px]">{letter.description}</p>
                       </div>
                       <p className ="font-merriweather w-4/5 text-[14px]">Signed: {letter.name} </p>
                    </div>
                })}
                </div>
            </div>
        </>
    )
}

export default Signed