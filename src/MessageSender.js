import React, { useState } from 'react';
import './style/MessageSender.css';
import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import db from './firebase';

function MessageSender() {
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // not refreshing page everytime submit triggered

        db.collection('posts').add({
            message:input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: imageURL
        })
        
        // clever db
        setInput('');
        setImageURL('');
    };

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src={user.photoURL}/>
                <form>
                    <input value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    className="messageSender__input" 
                    placeholder={`what's on your mind?, ${user.displayName}`}
                    />
                    <input value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)} 
                    className="messageSender__url" 
                    placeholder="image URL (optional)"
                    />
                    <button onClick={handleSubmit} type="submit">Hidden submit</button>
                </form>
            </div>
            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{color: 'red'}}/>
                    <h3>Live Video</h3>
                </div>
                <div className="messageSender__option">
                    <PhotoLibraryIcon style={{color: 'green'}}/>
                    <h3>Photo/Video</h3>
                </div>
                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{color: 'orange'}}/>
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender;
