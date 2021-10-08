import React from 'react'
import {GridLoader} from 'react-spinners'

export default function Loader({show}) {
    return show && (
        <div style={{position: 'fixed', top:300, left:'50%', transform:"translateX(-50%)"}}><GridLoader color="#99D4FF" margin="5" size={25} /></div>
    )
}
