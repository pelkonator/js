import React from 'react';
import {Toast, Box} from 'gestalt';

const ToastMessage = ({show, message}) => (
    show && (
        <Box display="flex" direction="column" alignItems="center" position="relative">
            <Toast color="orange" text={message}/>
        </Box>
    )
)


export default ToastMessage;