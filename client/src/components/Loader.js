import React from 'react'
import {GridLoader} from 'react-spinners'
import {Box} from 'gestalt'

export default function Loader({show}) {
    return show && (
        <Box position="fixed" dangerouslySetInlineStyle={{__style:{top:300, left:'50%', transform:"translateX(-50%)"}}}><GridLoader color="darkorange" margin="5" size={25} /></Box>
    )
}
