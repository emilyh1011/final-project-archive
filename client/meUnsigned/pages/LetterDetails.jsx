import { useParams } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { VscAdd } from "react-icons/vsc";
import TextareaAutosize from 'react-textarea-autosize';

function LetterDetails() {

    //useParams hook allows us to access our parameter we attached in our path to a specific Letter document: /letter-details/id
    const { id } = useParams();
    const [letter, setLetter] = useState({}); //Initialize letter to an empty object

    //States for creating a new comment
    const [commentFirstName, setCommentFirstName] = useState("");
    const [commentLastInitial, setCommentLastInitial] = useState("");
    const [commentDescription, setCommentDescription] = useState("");
    const [showNewCommentForm, setShowNewCommentForm] = useState(false); //Use this state to conditionally render if a new comment form should show up on screen

    //State to keep track of already existing comments
    const [comments, setComments] = useState([]);

    //Get this specific full Letter Document from database with id field, fetch at beginning of each page load with useEffect hook
    //useEffect empty array for second parameter to let React know we only call useEffect once at beginning of page load
    //Attach params object to pass our id variable, params is the built in Axios object for passing get parameters
    useEffect(() => {
        axios.get("/api/v1/letter-details", { params: { id } }).then((response) => {
            const returnedLetter = {
                _id: response.data._id,
                recipient: response.data.recipient,
                description: response.data.description,
                name: response.data.name,
                color: `bg-${response.data.color}`, //need to map color into classname style we want to use in case it breaks during build
                createdAt: response.data.createdAt
            }
            console.log("my returned letter: ", returnedLetter);
            setLetter(returnedLetter); //Set our letter state to this returned letter
            console.log("my letter state: ", letter);
        })


        //Make a get request for the comments too
        //Pass a params object with our id variable(refering to current Letter)
        //In app.mjs, we can access id in our req.query
        fetchComments();

    }, []);
    function fetchComments() {
        axios.get("/api/v1/letter-details/comments", { params: { id } }).then((response) => {
            console.log("comments from backend: ", response.data);
            setComments(response.data);
        })
    }
    function handleSubmit(event) {
        //Make a post request with commentFirstName, commentLastInitial,and commentDescription as thebody
        event.preventDefault(); //prevents from refreshing page

        //Don't need to JSON.parse, Axios parses it for us
        axios.post("/api/v1/letter-details", { commentFirstName, commentLastInitial, commentDescription, id }).then((response) => {
            //Also, set the state for showNewCommentForm to false again
            setShowNewCommentForm(false);
            setCommentFirstName(""); //Need to manually reset the new comment input states too
            setCommentLastInitial("");
            setCommentDescription("");
            fetchComments(); //fetch comments from backend after each new comments posted because now our comments state changed

        }).catch((error) => {
            //setMessage(error.error);
        });
    }


    return (
        <>
            {/**Outermost div for layout. flex-col(stack sections vertically), make width and height of container to screen.
             * Main-axis: y-axis, justify-center(vertically center), items-center(horizontally center)
             */}
            <div className="flex flex-col max-w-screen min-h-screen items-center mt-10 gap-6">
                {/**Letter Container, outermost container is the color border
                 * flex-col, stack vertically: p, white box with nested p for description, p
                */}
                <div key={letter._id}
                    className={`flex flex-col w-md ${letter.color} h-100 rounded-2xl justify-center items-center`}>
                    {/**This extra outer div wrapping all letter elements mimics our form wrapper from Submit.jsx */}
                    <div className="w-4/5 h-full rounded-2xl">
                        <p className="font-merriweather text-[20px]">To: {letter.recipient}</p>
                        <div className="bg-white w-full h-4/5 rounded-xl p-2">
                            <p className="w-full h-full font-merriweather text-[28px] rounded-xl">{letter.description}</p>
                        </div>
                        <p className="font-merriweather text-[20px]">Signed: {letter.name} </p>


                    </div>
                </div>

                {/**Container for the Letter Details, make w-md to match with the letter above too*/}
                <div className={`flex flex-col w-md`}>
                    <p className="font-merriweather text-[24px] text-lightblue">{letter.recipient}</p>
                    <p className="font-merriweather text-[24px]">Signed: {letter.createdAt}</p>
                </div>


                {/**Container for the Comments, make w-md to match with the other sections above*/}
                <div className={`flex flex-col w-md`}>

                    {/**Comments header */}
                    <div className="flex items-center">
                        <p className="font-merriweather text-[24px] text-lightblue mr-1">Comments</p>
                        <p className = "font-merriweather text-[24px] mr-2">({comments.length})</p>
                        {/**onClick of plus button, we want to display a new post form for a new comment */}
                        <VscAdd className="bg-gray-200 rounded-xl hover:outline active:bg-lightblue"
                            onClick={() => {
                                setShowNewCommentForm(true);
                            }} />
                    </div>

                    {/**Conditionally render the New Comment Form, only if state for showNewCommentForm is true */}
                    {showNewCommentForm && (
                        <div>
                            {/**Form is outermost container for a new comment layout. Stack everything in a new comment vertically */}
                            <form onSubmit={handleSubmit} className="flex flex-col w-full bg-gray-200 rounded-xl">
                                {/**Header for a new comment, commentFirstName with commentLastInitial in a row */}
                                <div className="flex flex-row pt-2">

                                    <input
                                        type="text"
                                        name="commentFirstName"
                                        value={commentFirstName}
                                        maxLength={10}
                                        placeholder="First Name"
                                        onChange={(event) => {
                                            setCommentFirstName(event.target.value);
                                        }}
                                        className='font-merriweather text-[14px] font-bold pl-2 focus:outline-none'
                                    />


                                    <input
                                        type="text"
                                        name="commentLastInitial"
                                        value={commentLastInitial}
                                        maxLength={1}
                                        placeholder="Last Initial"
                                        onChange={(event) => {
                                            setCommentLastInitial(event.target.value);
                                        }}
                                        className='font-merriweather text-[14px] font-bold focus:outline-none'
                                    />

                                </div>

                                <TextareaAutosize
                                    type="text"
                                    name="commentDescription"
                                    value={commentDescription}
                                    minLength={1}
                                    minRows={2} //Add no max rows to allow for autosize. Also apply no height on form, 
                                    //so blue outer container will resize with expanding comment description
                                    placeholder="Write your comment here..."
                                    onChange={(event) => {
                                        setCommentDescription(event.target.value);
                                    }}
                                    className="font-merriweather w-full h-full p-2 text-[12px] rounded-xl focus:outline-none"
                                />
                            </form>

                            <button
                                onClick={handleSubmit}
                                className="font-merriweather text-[14px] rounded-lg p-2 bg-lightestblue hover:outline active:bg-lightblue mt-2"
                            >
                                Submit
                            </button>
                        </div>)}

                    {comments.map((comment) => {
                        {/**Outermost div, represents layout of 1 comment, stack vertically */ }
                        return <div className="flex flex-col w-full bg-lightestblue rounded-xl mt-2 p-3">
                            {/**Header for a comment, commentFirstName with commentLastInitial in a row */}
                            <div className="flex flex-row gap-1">
                                <p className="font-merriweather text-[14px] font-bold pl-2">{comment.firstName}</p>
                                <p className="font-merriweather text-[14px] font-bold">{comment.lastInitial}.</p>
                            </div>
                            <div className="pl-2 rounded-xl">
                                <p className="font-merriweather text-[14px]">{comment.description}</p>
                            </div>
                        </div>
                    })}



                </div>












            </div>

        </>
    )

}

export default LetterDetails