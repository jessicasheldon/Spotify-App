

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Player from "./Player"
import db from './firebase';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { onSnapshot, collection, doc, setDoc, updateDoc, addDoc } from 'firebase/firestore';


const client_id = "fcd2edb8d5904149a722c0b587220dce"
const client_secret = "60e2768a838e429d87748c67b42d0206"
let user = "guest"

const Song = {
  albumImage: "",
  artist: "",
  title: ""
};
const User = {
  name: "",
  addedSongs: [],
  playlists: [Song]
};

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [username, setUsername] = useState("");
  const [loginPassword, setPassword] = useState("");
  const [songs, setSongs] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
 
  function login() {
    const docRef = doc(db, "Users", username);

    onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.data().password === loginPassword) {
          user = username;
          setSongs(snapshot.data().tracks);
          console.log("You are logged in");
        }
        else {
          console.log("Incorrect password");
       }
        
      } else {
        console.log("User does not exist");
      }
    });
    
  }

  function register() {
    const docRef = doc(db, "Users", username);
    const payload = {password: loginPassword};
    onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) {
        setDoc(docRef, payload);
      }
    });
    
  }

  function logout() {
    user = "guest";
  }

  function addSong(imageUrl, name, artist) {

    let addedSong = {
      albumImage: imageUrl,
      title: name,
      artist: artist
    };

    setSongs(oldSongs => [...oldSongs, addedSong]);
    console.log(songs);
   // useEffect(() => {
      const docRef = doc(db, "Users", username);
      const payload = {"password":loginPassword, "tracks":songs};
      setDoc(docRef, payload);
   // })
   
  }

  function profile() {
   
      setShowProfile(true);
    
  }
  

  useEffect(() => {
    var authParamaters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    }
    fetch('https://accounts.spotify.com/api/token', authParamaters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  async function searchFunction() {

    var searchParameters = {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken  
      }
    }
    

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + search + '&type=track', searchParameters)
      .then(response => response.json())
      .then(data => { setResults(data.tracks.items)})

  }

  console.log(results);

  function playSong() {
    
    
  }

  return (
    <div className="App">
      <Button className="bg-dark mx-3" style={{ float: "left"}} onClick={event => {profile()}}>
        Profile
      </Button>
      
      <div className="navBar">
        
        <InputGroup size="lg">
          <FormControl
            placeholder="Username"
            type="input"
            onChange={event => setUsername(event.target.value)}
          />
          <FormControl
            placeholder="Password"
            type="input"
            onChange={event => setPassword(event.target.value)}
          />
          <Button className=" bg-dark" style={{ float: "right"}} onClick={event => {register()}}>
            Register
          </Button>
          <Button className=" bg-dark" style={{ float: "right"}} onClick={event => {login()}}>
            Login
          </Button>
          <Button className=" bg-dark" style={{ float: "right"}} onClick={event => {logout()}}>
          Logout
        </Button>
        </InputGroup>
      </div>

      

      <div className="searchBar">
      <Container>
        <InputGroup size="lg">
          <FormControl
            placeholder="Search"
            type="input"
            onKeyPress={event => {
              if (event.key === "Enter") {
                searchFunction()
                console.log("Pressed Enter");
              }
            }}
            onChange={event => setSearch(event.target.value)}
          />
        <Button className='bg-dark' onClick={event => {searchFunction()}}>
            Search
        </Button>
        </InputGroup>
        
      </Container>
      </div>
      <Container>
        <Row className="mx-2 row row-cols-6">
          
            {results.map( (result, i) => {
              return (
                <Card className='bg-dark text-white border-4' style={{ cursor: "pointer"}} onClick={playSong}>
                  <Card.Img className='bg-dark mt-2' src={result.album.images[0].url}/>
                  <Card.Body className='bg-dark'>
                    <Card.Title className='bg-dark'>{result.name}</Card.Title>
                    <Card.Subtitle className="bg-dark text-light">{result.artists[0].name}</Card.Subtitle>
                  </Card.Body>
               
                    {user !== "guest" && 
                      <Button className="bg-dark text-light" onClick={ () => addSong(result.album.images[0].url, result.name, result.artists[0].name)}>
                        <h2 className="bg-dark text-light"> +</h2>
                      </Button>
                    }
                    
                  
                  
                  
                </Card>
              )
            })}
          
        </Row>
      </Container>
      {/* <Container>
        <div>
          <Player accessToken={accessToken}/>
        </div>
      </Container> */}
    </div>
  );
}

export default App;
