import React, { useEffect, useState } from "react";
import SnackbarProvider from 'react-simple-snackbar';
import { useSnackbar } from 'react-simple-snackbar'
import "./SnackBar.css";

export default function SnackWarning(props) {
    // const [isExists, setIsExists] = useState(false);
    const [openSnackbar, closeSnackbar] = useSnackbar(); 

    // useEffect(() => {
    //     document.title = `You clicked ${isExists} times`;
    // });

    return (
        <div 
        onClick={() => (props.error == true) ? openSnackbar('This is the content of the Snackbar.' , [4000]) : null}>
            
        </div>
    );
}
