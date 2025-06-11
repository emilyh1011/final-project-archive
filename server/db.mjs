import mongoose from 'mongoose';
import dotenv from 'dotenv'; //1. npm install dotenv --save
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.resolve(__dirname, '../.env') }); //We need to load in our .env file that contains our DSN variable(storing MongoDB URI)
                                                            //add stuff in parentheses bc moved .env to root of directory

//We will be using a .env file for our MongoDB URI, and the "Letter" and "Comment" collection

//console.log(process.env.DSN);
mongoose.connect(process.env.DSN); //Use process.env.variableName to access variables from our .env file
                                  //Now, we are connected to our database:)
const {Schema} = mongoose;

const LetterSchema = new mongoose.Schema({
    recipient: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    color: {type: String, required: true},
},{timestamps: true}); //allows automatic creation of timestamps(every document automatically has these 2 fields createdAt and updatedAt) for the schema);

const CommentSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastInitial: {type: String, required: true},
  description:{type: String, required: true},
  letter: { type: Schema.Types.ObjectId, ref: 'Letter', required: true} //stores only id of referenced document, aka the Letter _id

}, {timestamps: true}); //allows automatic creation of timestamps(every document automatically has these 2 fields createdAt and updatedAt) for the schema

//Collection to model and schema to model collection
const Letter = mongoose.model('letters', LetterSchema);
const Comment = mongoose.model('comments', CommentSchema);

export{
  Letter, Comment
}




