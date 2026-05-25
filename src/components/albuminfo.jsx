import * as React from "react";

import "./albuminfo.css";
import {useRef} from "react";
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
                </form>
            </div>
        );
}