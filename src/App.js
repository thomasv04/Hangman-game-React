import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import shuffle from 'lodash.shuffle'

import './App.css'

import KeyBoard from './Keyboard'
import RandomWord, { tabH4 } from './word'

var Words = ['Hurlement', 'Guepe', 'mouche', 'cannibalisme', 'fissure', 'cauchemar', 'assassin', 'sorcier', 'victoire', 'combat', 'soufre', 'absurde', 'gemmes', 'absorber', 'vaches', 'sang', 'comquete', 'manifester', 'connexion', 'internet', 'protection', 'famille', 'reptile', 'eliminer', 'qualite', 'pieds', 'fragile', 'coeur', 'douleur', 'architecte', 'Paresseux', 'Chaise', 'Argent', 'Slip', 'Zero', 'Marguerite', 'Echelle', 'Trottoir', 'Brun', 'Guitare', 'Parler', 'Paume', 'Film', 'Dauphin', 'Bouclier', 'Lancer', 'Perle', 'Tromperie', 'Minuscule', 'Pasteque', 'Moyenne'];



class App extends Component {

  face = 1;
  hangman = React.createRef()
  rope = React.createRef()
  Word = null

  testLetter = letter => {
    var i = 0
    var noLetter = 1;
    this.GeneratedWord.split('').map(letters => {
      if (letters.toString() === letter.toString()) {
        if (!tabH4[i].classList.contains('active')) {
          tabH4[i].classList.add('active')
          tabH4[i].append(letter.toString())
          console.log(noLetter)
          noLetter = 0
        }

      }
      i++
    })

    if (noLetter === 1) {

      if (this.face !== 6) {
        this.face++
      }
      
      if(this.face === 6){
          this.setState({
            dead:1
          })
      }

      this.hangman.current.setAttribute('src', require('./img/hangman/' + this.face + '.png'))
      if (this.face === 3) {
        this.rope.current.classList.remove('disable')
      }

    }
    noLetter = 0
    this.lastLetter();
  }

  lastLetter() {
    var nb = 0;
    console.log(tabH4)
    tabH4.map(tab => {
      if (tab.classList.contains('active')) {
        nb++
      }
    })

    if (nb === this.GeneratedWord.split('').length) {
      setTimeout(() => {
        tabH4.map(tab => {
          tab.innerHTML = ''
        })
        this.setState({
          GeneratedWord: this.generateWord,
        })
        this.face = 1
        this.rope.current.classList.add('disable')
        this.hangman.current.setAttribute('src', require('./img/hangman/' + this.face + '.png'))
      }, 500)


    }
  }

  generateWord() {
    const Rwords = shuffle(Words)
    const word = Rwords.pop()
    Words = Rwords
    this.GeneratedWord = word.toUpperCase()
    return word.toUpperCase()

  }


  state = {
    word: null,
    GeneratedWord: null,
    hangmanFace: 1,
    dead: 0
  }

  render() {
    return (
      this.state.dead === 0 ?
        <div className="App">
          <div className="hangman">
            <img src={require('./img/hangman/7.png')} alt="hangman" className='rope disable' ref={this.rope}></img>
            <img src={require('./img/hangman/' + this.state.hangmanFace + '.png')} alt="hangman" className="head" ref={this.hangman}></img>

          </div>
          <RandomWord
            GenWorld={this.generateWord()}
          />
          <KeyBoard
            onClick={this.testLetter}
          />


        </div>
        : <div className="App end">
          <div className="hangman full">
            <img src={require('./img/hangman/7.png')} alt="hangman" className='rope disable' ref={this.rope}></img>
            <img src={require('./img/hangman/6.png')} alt="hangman" className="head" ref={this.hangman}></img>

          </div>
          <div className="wordEnd"><h2>Le mot était <span>{this.GeneratedWord}</span></h2></div>
        </div>
      
      
    );
}
}

export default App;
