//This will be the file to represent our Submit Page
import { useState } from 'react'
import axios from "axios";



function Submit() {

    const colorOptions = [
        { id: 0, name: "pink", className: "bg-pink"},
        { id: 1, name: "red", className: "bg-red"},
        { id: 2, name: "orange", className: "bg-orange"},
        { id: 3, name: "yellow", className: "bg-yellow"},
        { id: 4, name: "green", className: "bg-green"},
        { id: 5, name: "lightestblue", className: "bg-lightestblue"},
        { id: 6, name: "blue", className: "bg-blue"},
        { id: 7, name: "purple", className: "bg-purple"}
      ];

    //On submit, we want to post our 3 input names as a Letter Document in our database

    //1. Create 3 different states for our 3 different input fields: recipient, name, description
    //The default values for these states are set to empty string
    //They will update on every key change in specific input field
    const [recipient, setRecipient] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("pink"); //default color is pink
    const [message, setMessage] = useState(null); //if message state is not null, then a post request was made

    //2. Create a Post form in our JSX, and onClick when user submits form, call handleSubmit
    function handleSubmit(event) {

        event.preventDefault(); //prevents from refreshing page

        //Don't need to JSON.parse, Axios parses it for us
        axios.post("/api/v1/submit", { recipient, name, description, color }).then((response) => {
            setMessage(response.data.success); //recall, we returned an object {sucess: ""}from backend, so need to access value by key
            setColor("pink")//reset new form states to default values;
            setRecipient("");
            setDescription("");
            setName("");
        }).catch((error) => {
            setMessage(error.error);
        });
    };
    //4. After updating our states, we can create a new Letter Document to send back to our database


    return (
        <>
            {/**Outermost div for layout. flex-col(stack vertically), make width and height of container to screen.
             * Main-axis: y-axis, justify-center(vertically center), items-center(horizontally center)
             */}
            <div className="flex flex-col max-w-screen min-h-screen items-center mt-10 gap-6">
                {/**flex-col, stack vertically, so main-axis is y-axis. 
             * justify main axis: vertically center, align items cross axis: horizontally center
             * Center white box for description*/}
                <div className={`flex flex-col justify-center items-center w-md h-100 bg-${color} rounded-2xl`}>
                    <form onSubmit={handleSubmit} className="w-4/5 h-full rounded-2xl"> {/**Make overall form height to be same size as pink square, we want to stack To:"",Description,Signed:""*/}
                        {/**But we want to make the width to be 4/5 of pink parent container. In our Figma, we wanted each input field to have same padding on each side, where "To" and "Signed" stayed contained with white container width*/}
                        <label className="font-merriweather text-[20px]">To:
                            <input
                                type="text"
                                name="recipient"
                                value={recipient}
                                maxLength={19}
                                onChange={(event) => {
                                    setRecipient(event.target.value);
                                }}
                                className='pl-2 focus:outline-none'
                            />
                            {/**On every key change, we want to save value in input as possible recipient.
                         * If we don't follow this practice, when user leaves input field to move onto next input field, first input will keep switching back to old state variable that we specified.
                         * Basically, onchange to let us type into text area.
                         */}
                        </label>
                        <div className="bg-white w-full h-4/5 rounded-xl p-2"> {/**Set the white box width to be same as parent form container. Parent form container is 4/5 width of pink container width.
                     * Set white box height to be 4/5 of outer pink square. Both width and height of white square is 4/5 of pink container, padding x and y are same for white box*/}
                            <label>
                                <textarea
                                    type="text"
                                    name="description"
                                    value={description}
                                    minLength={1}
                                    maxLength={155}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                    className="w-full h-full text-[28px] rounded-xl focus:outline-none font-merriweather"
                                />
                            </label>
                        </div>

                        <label className="font-merriweather text-[20px]">
                            Signed:
                            <input
                                type="text"
                                name="name"
                                value={name}
                                maxLength={19}
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                                className='pl-2 bg-transparent focus:outline-none'
                            />
                        </label>
                    </form>
                </div>





                <div className="flex flex-row w-md justify-between">

                    <div className = "flex flex-col gap-4">
                        <div>
                            <p className="font-merriweather text-[16px] mb-2">Color Picker</p>

                            <div className="grid grid-cols-3 gap-2">
                                {colorOptions.map((c)=>{
                                    return <div
                                        key = {c.id}
                                        onClick = {()=> setColor(c.name)}
                                        className = {`w-[45px] h-[45px] ${c.className} rounded-md cursor-pointer
                                        ${color === c.name ? 'ring-2 ring-black': ''}`}
                                    />
                                })}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="font-merriweather text-[24px] rounded-lg p-2 bg-lightestblue hover:outline active:bg-lightblue"
                        >
                            Submit
                        </button>

                    </div>

                    <div className = "flex flex-col gap-2 w-1/2">
                        <h1 className="font-merriweather text-[24px]">Rules:</h1>
                        <ol>
                                <li>1. Choose a color</li>
                                <li>2. Write out a message(no bullying, we will remove messages!)</li>
                                <li>3. Sign your name or a familiar nickname.</li>
                                <li>4. Click "Submit" when you are ready.</li>
                                <li>5. Letter won't submit without all required fields.</li>
                        </ol>

                        {(function(){
                            if(message != null){
                                console.log("i am here", message);
                                return <p className="font-merriweather text-[12px]">{message}</p>
                            }
                        })()}
                    </div>

                </div>



            </div>

        </>
    )
}

export default Submit;