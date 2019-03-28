import React, { Component } from 'react'

import './Keyboard.css'
import Key from './Key'

const KEY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export var Ref = React.createRef()

export default class KeyBoard extends Component {

    
    state = {
        KEY: KEY,
    }

    render() {
        return (
            <div className="Keyboard" ref={Ref}>
                {KEY.map((key, index) => (

                    <Key
                        index={index}
                        key={index}
                        keyName={key}
                        onclick={this.props.onClick}
                    />

                ))}
            </div>

        )

    }



}

