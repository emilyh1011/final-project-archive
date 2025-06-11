import './config.mjs'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { Letter, Comment } from './db.mjs';
import mongoose from 'mongoose';
import cors from 'cors';    

//To set up nodemon
//1. npm install --save-dev nodemon
//2. In package.json file, under "scripts", add one for starting our nodemon, "start": "nodemon app.mjs"
//3. Now, everytime start development server(for backend), type "npm start" in command line
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const Letter = mongoose.model('Letter');
// body parsing middleware for urlencoded bodies
// places parsed body into req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


//NO need to start frontend anymore, with our build and now this line, just npm start and then open localhost:3000
app.use(express.static(path.join(__dirname, '../client/meUnsigned/dist'))); //we are no longer serving from src folder but instead our build from dist folder
//app.use(express.static(path.join(__dirname, 'src')));


app.get("/api/v1/signed", async (req, res) => {
    console.log("i have a query ", req.query);
    console.log(req.query.query);

    let letters;
    //If user does not search, page loads/reloads: req.query.query is undefined --> falsy
    //If user does search but is empty string or only spaces, we want this to also be considered as same case: false case
    //Case req.query.query is falsy, send back all posts
    if (!req.query.query || req.query.query.trim() == "") {
        console.log("i am falsy!");
        try {
            //We want to return all letters in descending order of createdAt, so most recent letters appear first when we display
            //-1 value for sort means sort descending order. createdAt is an actual field so use quotes
            letters = await Letter.aggregate([ //Aggregation stages, input array of stages
                { $sort: { "createdAt": -1 } },
                //Use project stage {$project: <specifications>}, to include or exclude fields from returned documents or even add/update/compute fields.
                // Put 1 next to fields want to include. We will compute the createdAt string with the dateToString operator expression
                //We will exclude updatedAt, so won't mention updatedAt
                {
                    $project: {
                        _id: 1,
                        recipient: 1,
                        name: 1,
                        description: 1,
                        color: 1,
                        createdAt: {
                            $dateToString: {
                                format: "%B %d, %Y %H:%M",
                                date: "$createdAt" //computing our dateToString version of createdAt from original createdAt
                            },
                        },
                    }
                },
            ]);
            //console.log(letters);
            res.json(letters);
        } catch (err) {
            res.json({ error: "Failed to get all letters from backend." });
        }

    } else { //Send back posts with recipient, description or name that match query
        console.log("i am truthy!");

        const query = req.query.query;

        try {
            //Use aggregate with input array of stages, but this time start with {$match: {$or: []}}
            //match stage, where match stage uses or operator. Or operator has input array of fields names
            //Use regex to see if field contains a substring of query(option i: case insensitive)
            letters = await Letter.aggregate([
                {$match:{
                    $or: [
                        { recipient: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },   //Then, chain aggregate with input array of sort stage & project stage again
                        { name: { $regex: query, $options: "i" } }]
                }},
                { $sort: { "createdAt": -1 } },
                {
                    $project: {
                        _id: 1,
                        recipient: 1,
                        name: 1,
                        description: 1,
                        color: 1,
                        createdAt: {
                            $dateToString: {
                                format: "%B %d, %Y %H:%M",
                                date: "$createdAt"
                            },
                        },
                    }
                },
            ]);
            //console.log(letters);
            res.json(letters);
        } catch (err) {
            res.json({ error: "Failed to get matching letters from backend." });
        }
    }

});

app.get('/api/v1/letter-details', async (req, res) => {
    //Return 1 specific letter that matches _id field of letter passed in query as id
    console.log('i have a id in query ', req.query.id);
    const letterId = req.query.id;

    
    try{
        //Use aggregate with input array of aggregation stages
        //Stage 1: $match:{}, filter only a Letter document that matches our letterId
        //Stage 2: $project:{}, convert createdAt Date type to a $DateToString
        const letters = await Letter.aggregate([
            // convert our letterId first into a string and then into a ObjectId type to match correctly
            // new mongoose.Types.ObjectId(numberValue) is deprecated, and our id passed in query object is a number, so must convert to string first
            //new mongoose.Types.ObjectId(strValue) is not deprecated
            { $match: { _id: new mongoose.Types.ObjectId(`${letterId}`) } },
            {
                $project: {
                    _id: 1,
                    recipient: 1,
                    name: 1,
                    description: 1,
                    color: 1,
                    createdAt: {
                        $dateToString: {
                            format: "%B %d, %Y %H:%M",
                            date: "$createdAt",
                            timezone: "America/New_York" 
                        },
                    },
                }
            },
        ]); //aggregate always returns an array, since we matched by id, should be an array of 1 letter object
        
        const letter = letters[0];
        //console.log("after aggregate ", letter);
        res.json(letter);
    }catch(err){
        res.json({error: "Failed to get letter with id: ", letterId});
    }
});

app.post('/api/v1/letter-details', async (req, res) => {
    //Create a new comment document to add to database
    console.log(req.body);
    console.log(req.body.commentFirstName)
    console.log(req.body.commentLastInitial)
    console.log(req.body.commentDescription)
    console.log(req.body.id)

    const comment = new Comment({
        firstName: req.body.commentFirstName,
        lastInitial: req.body.commentLastInitial,
        description: req.body.commentDescription,
        letter: req.body.id
    })

    try {
        await comment.save();
        console.log("saving");
        res.json({ success: "Sucess! Comment posted." });
    } catch (err) {
        res.json({ error: "Failed to post comment." })
    }
});

app.get("/api/v1/letter-details/comments", async(req,res)=>{
    //API GET request to get all comments for a post
    //Return an array of comments that matches id(referencing a letter) passed in our query object
    //This is the letter field for a Comment Document
    const letterId = req.query.id;
    let comments = [];
    try{
        //Using our Comment model, retrieve all documents
        //Sort comments in decreasing order of time created
        comments = await Comment.find({letter: new mongoose.Types.ObjectId(`${letterId}`)}).sort({ createdAt: -1 });
        console.log("in backend, my comments ", comments);
        res.json(comments);
    }catch(err){
        res.json({ error: "Failed to post comment." })
    }
})

app.post("/api/v1/submit", async (req, res) => {
    //someone submits letter
    console.log(req.body);
    console.log(req.body.recipient)
    console.log(req.body.name)
    console.log(req.body.description)
    console.log(req.body.color)

    const letter = new Letter({
        recipient: req.body.recipient,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color
    });
    console.log(letter);

    try {
        await letter.save();
        console.log("saving");
        res.json({ success: "Sucess! Check out the Signed page to view letter." }); //send letter back to show letter created
    } catch (err) {
        res.json({ error: "Failed to submit letter." })
    }
});

app.listen(process.env.PORT || 3000);


  
