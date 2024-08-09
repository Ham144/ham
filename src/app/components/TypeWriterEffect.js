import Typewriter from 'typewriter-effect';

import React from 'react'

const TypeWriterEffect = ({ strings }) => {
    return (
        <Typewriter
            onInit={(typewriter) => {
                typewriter.typeString(strings)
                    .pauseFor(2500)
                    .start();
            }}
        />
    )
}

export default TypeWriterEffect