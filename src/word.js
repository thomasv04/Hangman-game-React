import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './word.css'


export var tabH4 = [];


export default class RandomWord extends Component {

    
    reloadTab(){
        tabH4 = []
    }

    state = {
        active: 'none',
    }


    render() {
        return (
            console.log(this.props.GenWorld.split('')),
            <div className='word'>
                <h3>{this.props.GenWorld}</h3>
                {this.props.GenWorld.split('').map((letter, index) =>{
                    
                    return <h4 className={letter} id={this.state.active} key={index} ref={tabH => tabH4[index] = tabH}></h4>
                })}
                {console.log(tabH4)}
            </div>
            
        )

    }



}