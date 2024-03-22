import React, { useEffect, useState } from 'react'
//allows to add a document to the table
import {addDoc, collection} from 'firebase/firestore';
import {db, auth} from "../firebase-config";
import { useNavigate } from 'react-router-dom';

const CreateStory = ({Auth}) => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  const storysCollection = collection(db, "storys");
  let navigate = useNavigate();

  //function that creates/adds the data to the firestore
  const createStory = async () => {
    
    //sets the name of the user and id
    await addDoc(storysCollection, {
      title, 
      story, 
      author: {name: auth.currentUser.displayName , id: auth.currentUser.uid}
    }); //two args - which collection, 
    navigate("/");
  };

  //works when opening the page
  useEffect(() => {
    if(!Auth){
      navigate("/login");      
    }
  },[]);


  return (
    <div className='createStoryPage'>
      <div className='CSContainer'>
        <h1>Create your Story</h1>
        <div className='inputGp'>
          <label>Title of your Story: </label>
          <input placeholder='Title...' 
          onChange={(event) => {
            setTitle(event.target.value);
          }}></input>
        </div>
        <div className='inputGp'>
          <label>Story: </label>
          <textarea placeholder='Story..'
          onChange={(event) => {
            setStory(event.target.value);
          }}/>
        </div>
        <button onClick={createStory}>Submit Story</button>
      </div>
    </div>
  )
}

export default CreateStory;
