import * as React from "react";
import ReviewBox from "./reviewBox.jsx";
import "./albuminfo.css";
import {useRef, useState} from "react";

function AlbumArtInput(){
    const [albumArt, setAlbumArt] = React.useState(null);
    if(albumArt === null){
        return (
            <input type="file" name={"albumArtIn"} onChange={(event => {
                console.log(event.target.value);
                setAlbumArt(URL.createObjectURL(event.target.files[0]));

            })} />
        );
    }else{
        console.log(albumArt);
        return (
            <>

                <img src={albumArt}  alt="albumArt" crossOrigin="anonymous" />
                <input type={"button"} onClick={() => {setAlbumArt(null)}} />
            </>
        );
    }

}
export function AlbumInfo() {
    const genreRef = useRef(null);
    const [genreBubbles, setGenreBubbles] = React.useState([]);
    const [thoughts, setThoughts]=React.useState([]);
    const [songs, setSongs] = React.useState([{id:0,title:"",artists:[],length:0,feeling:""}]);
    function handleCancel(){

    }

    function handleSubmit(){

    }

    function handleSaveAsDraft(){

    }
    function addEmptySong(){
        let newSong = {
            id:songs.length,
            title:"",
            artists:[],
            length:0.0,
            feeling:"",
        }
        setSongs([...songs,newSong]);
        console.log(songs);
    }
    function  addThought(category){
        let isNew = true;
        for(let i=0;i<thoughts.length;i++){
            if(thoughts[i].category === category){
                isNew = false;
            }
        }
        console.log(isNew);
        if(isNew){
            console.log("in!");
            let newThought= {
                id: thoughts.length,
                category: category,
                thought: "",
            }
            setThoughts([
                ...thoughts,
                newThought
            ]);
        }
        document.getElementById("add".concat(category)).style.visibility="hidden";
        console.log(thoughts.length);
    }

    function removeThought(category){
        console.log("removeThought",category);
        setThoughts(thoughts.filter((thought)=>
            thought.category !== category
        ));
        document.getElementById("add".concat(category)).style.visibility="visible";
    }

    const [review, setReview] = useState("");
    let nextId = 0;

        return(
            <div className="album-info">
                <form>
                    <h1>Add Album</h1>
                    <hr className={"text-break"}/>
                    <table>
                        <tbody>
                            <tr>
                                <td>Album Art:</td>
                                <td>How do you feel about it?</td>
                            </tr>
                            <tr>

                                <td><AlbumArtInput></AlbumArtInput> </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td><input type={'text'} name={'name'}/></td>
                                <td>Artist:</td>
                                <td><input type={'text'} name={'artist'}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr className="text-break"/>
                    <table>
                        <tbody>
                            <tr>
                                <td>Release Date:</td>
                                <td> <input type={'date'} name={'releaseDate'} /></td>
                            </tr>
                            <tr>
                                <td>Genres:</td>
                                <td><div className="genreHolder"><ul>{genreBubbles.map(genre =>(
                                    <li key={genre.id} className={"genreBubble"}><input className={"genreButton"} type={"button"} onClick={() => {
                                        setGenreBubbles(genreBubbles.filter(g => g.id !== genre.id));
                                    }}/> {genre.genreName}</li>
                                ))}</ul>
                                    </div>
                                    <input ref={genreRef} type={'text'} name={'genre'} onKeyDown={e=>{
                                    if((e.key === "Enter" || e.key === " "||e.key === "," ) ){
                                        if(genreRef.current.value !== "" && genreRef.current.value !== " "){
                                            setGenreBubbles([
                                                ...genreBubbles,
                                                {id: nextId++,genreName: genreRef.current.value}
                                            ]);
                                        }
                                        genreRef.current.value = "";
                                    }
                                }}/> </td>
                            </tr>
                    </tbody>
                    </table>
                    <hr className="text-break"/>
                    <h2>Add Songs</h2>
                    <table>
                        <thead><tr>
                            <th>Name</th>
                            <th>Artist</th>
                            <th>Length</th>
                            <th>How do you feel about it?</th>
                        </tr></thead>
                        <tbody>

                            {songs.map((song, index) => (
                                <tr key={index}>

                                    <td><input type={"text"} value={song.title} onChange={event=>{
                                        const change = [...songs];
                                        const songTarget = songs.find(s => s.id === song.id);
                                        songTarget.title = event.target.value;
                                        setSongs(change);}}/></td>
                                    <td><div className={"artistsInput"}>


                                    </div> <input type={"text"} onKeyDown={e=>{
                                        if(e.key === "Enter" || e.key === " "||e.key === ","){
                                            let artist = e.target.value;
                                            e.target.value = "";
                                            console.log(songs.at(index).artists);

                                            setSongs(songs.at(index).artists = songs.artists.push(artist));
                                        }
                                    }}/></td>
                                    <td><input type={"number"} value={song.length}/></td>
                                    <td>{song.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type={"button"} className={"addSongButton"} onClick={addEmptySong} >+</button>
                    <hr className="text-break"/>
                    <h2>Your Review:</h2>
                        <ReviewBox></ReviewBox>
                    <hr className="text-break"/>
                    <h2>Thoughts on?</h2>
                    <div id={"addThought"}>
                        <button type={"button"} id={"addVocals"}  onClick={e=>{addThought("Vocals");}}>Vocals</button>
                        <button type={"button"} id={"addDrums"} onClick={e=>{addThought("Drums");}} value={"drums"}>Drums</button>
                        <button type={"button"} id={"addGuitar"} value={"guitar"} onClick={e=>{addThought("Guitar");}} >Guitar</button>
                        <button type={"button"} id={"addBass"} value={"bass"} onClick={e=>{addThought("Bass");}}>Bass</button>
                        <button type={"button"} id={"addProduction"} value={"production"} onClick={e=>{addThought("Production");}}>Production</button>
                    </div>
                    <div id={"thoughts"}>
                        {thoughts.map((item, index) => (
                            <div className="thought" key={index}>
                                <h3>{item.category}</h3>
                                <button type={"button"}  className={"removeThoughtButton"} onClick={e=>{removeThought(item.category);}}></button>
                                <textarea value={item.thought} onChange={event => (prevState => {prevState.find(index).thought = event.target.value})}></textarea>
                            </div>
                        ))}
                    </div>
                    <hr className="text-break"/>
                    <table className={"submitButtons"}>
                        <tbody>
                            <tr>
                                <td><button>CANCEL</button> </td>
                                <td><button>SAVE AS DRAFT</button></td>
                                <td><button>FINALIZE</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
}