import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AlbumInfo }  from "./components/albuminfo.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = createRoot(document.body);
root.render(<AlbumInfo/>);