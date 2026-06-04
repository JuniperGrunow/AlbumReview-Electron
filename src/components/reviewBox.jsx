import *  as React from "react";
import "./reviewBox.css";
import {
    Composite,
    CompositeItem,
    safePolygon,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useListNavigation
} from "@floating-ui/react";
import {useEffect, useRef} from "react";
import {Button} from "react-bootstrap";



export default function ReviewBox() {
    const [fontSize, setFontSize] = React.useState(12);
    const [fontFamily, setFontFamily] = React.useState("sans-serif");
    const [textColor, setTextColor] = React.useState("black");
    const [review,setReview] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(false);




    return (
        <div className="reviewBox">
            <div className={"text-tools"}>

            </div>

            <div className={"pageHolder"}>
                <textarea name={"review"} className={"writing-area"} value={review} onChange={event => (event.target.value)}> </textarea>
            </div>
        </div>
    )
}