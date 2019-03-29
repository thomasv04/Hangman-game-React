/* eslint-disable no-loop-func */
import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import shuffle from 'lodash.shuffle'

import './App.css'

import KeyBoard, { Ref } from './Keyboard'
import RandomWord, { tabH4 } from './word'

var Words = ['Danger', 'Poulet', 'Gelatine', 'Lentilles', 'Cuisine', 'Banque', 'Souris', 'Fusil', 'Garcon', 'Fille', 'Maman', 'Papa', 'Enfant', 'Chien', 'Epee', 'Sabre', 'Hurlement', 'Guepe', 'mouche', 'cannibalisme', 'fissure', 'cauchemar', 'assassin', 'sorcier', 'victoire', 'combat', 'soufre', 'absurde', 'gemmes', 'absorber', 'vaches', 'sang', 'comquete', 'manifester', 'connexion', 'internet', 'protection', 'famille', 'reptile', 'eliminer', 'qualite', 'pieds', 'fragile', 'coeur', 'douleur', 'architecte', 'Paresseux', 'Chaise', 'Argent', 'Slip', 'Zero', 'Marguerite', 'Echelle', 'Trottoir', 'Brun', 'Guitare', 'Parler', 'Paume', 'Film', 'Dauphin', 'Bouclier', 'Lancer', 'Perle', 'Tromperie', 'Minuscule', 'Pasteque', 'Moyenne'];



class App extends Component {



  face = 1;
  hangman = React.createRef()
  rope = React.createRef()
  KeyBoardRef = React.createRef()
  Score = React.createRef()
  indiceRef = React.createRef()
  removeRef = React.createRef()
  ScoreNb = 0
  Word = null
  undiscovered = []
  undiscoveredLetter = []

  testLetter = letter => {

    var i = 0
    var noLetter = 1;
    this.GeneratedWord.split('').map(letters => {
      if (letters.toString() === letter.toString()) {
        console.log('test')
        console.log()
        noLetter = 0
        if (!tabH4[i].classList.contains('active')) {
          tabH4[i].classList.add('active')
        }else{

          if(tabH4[i].innerHTML !== ''){
            noLetter = 1
          }
          
        }
        tabH4[i].innerHTML = letters.toString()

      }
      i++
    })

    if (noLetter === 1) {
      if (this.face !== 6) {
        this.face++
      }
      this.addScore('remove', 1)
      if (this.face === 6) {
        this.setState({
          dead: 1
        })
      }

      this.hangman.current.setAttribute('src', require('./img/hangman/' + this.face + '.png'))
      if (this.face === 3) {
        this.rope.current.classList.remove('disable')
      }

    } else {
      this.addScore('add', 2)
    }
    noLetter = 0
    this.lastLetter();
  }

  addScore(type, nb) {
    type === 'add' ? this.ScoreNb = this.ScoreNb + nb : this.ScoreNb = this.ScoreNb - nb

    this.Score.current.innerHTML = 'Score : <span>' + this.ScoreNb + '</span>'

  }

  restartScore() {
    this.Score.current.innerHTML = 'Score : <span>0</span>'
  }

  resetKey() {
    var clickKey = Ref.current.childNodes

    for (var i = 0; i < clickKey.length; i++) {
      if (clickKey[i].classList.contains('click')) {
        clickKey[i].classList.remove('click')
      }
    }

  }

  lastLetter() {
    var nb = 0;
    console.log(tabH4)
    tabH4.map(tab => {
      if (tab !== null) {
        if (tab.classList.contains('active')) {
          nb++
        }
      }

    })

    if (nb === this.GeneratedWord.split('').length) {
      setTimeout(() => {
        tabH4.map(tab => {
          if (tab !== null) {
            tab.innerHTML = ''
          }

        })
        this.resetKey()
        this.setState({
          GeneratedWord: this.generateWord,
          score: parseInt(this.state.score) + 1
        })
        this.undiscovered = []
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

  reloadGame() {
    this.face = 1
    this.rope.current.classList.add('disable')
    this.restartScore()
    this.setState({
      GeneratedWord: this.generateWord,
      dead: 0,
    })
  }

  indice = () => {
    if (parseInt(this.indiceRef.current.childNodes[1].innerHTML) !== 0) {

      var i = 0
      var j = 0
      this.GeneratedWord.split('').map(letters => {
        if (!tabH4[i].classList.contains('active')) {
          this.undiscovered.push(letters)
          shuffle(this.undiscovered)
        }

        i++
      })
      this.undiscovered = shuffle(this.undiscovered)

      this.GeneratedWord.split('').map(letters => {
        if (this.undiscovered[0] !== undefined) {
          if (tabH4[j].classList.contains(this.undiscovered[0].toString())) {
            tabH4[j].classList.add('active')
            tabH4[j].append(this.undiscovered[0].toString())
          }
        }

        j++
      })

      var clickKey = Ref.current.childNodes

      for (var i = 0; i < clickKey.length; i++) {
        if (this.undiscovered[0] !== undefined) {
          if (clickKey[i].classList.contains(this.undiscovered[0].toString())) {
            clickKey[i].classList.add('click')
          }
        }
      }
      if (this.undiscovered[0] !== undefined) {
        this.indiceRef.current.childNodes[1].innerHTML = parseInt(this.indiceRef.current.childNodes[1].innerHTML) - 1
        this.undiscovered = []
        this.lastLetter()
        if(parseInt(this.indiceRef.current.childNodes[1].innerHTML) === 0){
          this.indiceRef.current.classList.add('finish')
        }
      }
    }

  }

  removeLetter = () => {
    if (parseInt(this.removeRef.current.childNodes[1].innerHTML) !== 0) {
      var clickKey = Ref.current.childNodes
      var tabClickKey = []

      for (var i = 0; i < clickKey.length; i++) {
        var isOk = 1
        
        if (!clickKey[i].classList.contains('click')) {
          this.GeneratedWord.split('').map(letters => {
            if(clickKey[i].classList.contains(letters.toString())){
              console.log(clickKey[i].classList[0] + letters.toString())
              if(isOk === 0){

              }else{
                isOk = 0
              }
              
            }
          })
          if(isOk === 1){
            this.undiscoveredLetter.push(clickKey[i])
          }
          
        }
        
      }

      
      this.undiscoveredLetter = shuffle(this.undiscoveredLetter)
      for(var k = 0; k<5; k++){
        this.undiscoveredLetter[k] !== undefined && this.undiscoveredLetter[k].classList.add('click') ;
      }
      

      if (this.undiscoveredLetter[0] !== undefined) {
        this.removeRef.current.childNodes[1].innerHTML = parseInt(this.removeRef.current.childNodes[1].innerHTML) - 1
        this.undiscoveredLetter = []
        if(parseInt(this.removeRef.current.childNodes[1].innerHTML) === 0){
          this.removeRef.current.classList.add('finish')
        }
      }

    }
  }


  state = {
    word: null,
    GeneratedWord: null,
    hangmanFace: 1,
    dead: 0,
  }

  render() {
    return (
      this.state.dead === 0 ?
        <div className="App">
          <div className="score" ref={this.Score}>Score : <span>{this.ScoreNb}</span></div>
          <div className="hangman">
            <img src={require('./img/hangman/7.png')} alt="hangman" className='rope disable' ref={this.rope}></img>
            <img src={require('./img/hangman/' + this.state.hangmanFace + '.png')} alt="hangman" className="head" ref={this.hangman}></img>

          </div>
          <RandomWord
            GenWorld={this.generateWord()}
          />
          <div className='indicesBox'>
            <div className="indice" onClick={this.indice} ref={this.indiceRef}>Indice <span>10</span></div>
            <div className="remove" onClick={this.removeLetter} ref={this.removeRef}>Retirer 5 lettres <span>10</span></div>
          </div>
          <KeyBoard
            onClick={this.testLetter}
            ref={this.KeyBoardRef}
          />


        </div>
        : <div className="App end">
          <div className="score" ref={this.Score}>Score : <span>{this.ScoreNb}</span></div>
          <div className="hangman full">
            <img src={require('./img/hangman/7.png')} alt="hangman" className='rope disable' ref={this.rope}></img>
            <img src={require('./img/hangman/6.png')} alt="hangman" className="head" ref={this.hangman}></img>

          </div>
          <div className="wordEnd"><h2>Le mot était <span>{this.GeneratedWord}</span></h2></div>
          <div className="reload" onClick={() => { this.reloadGame() }}>Recommencer</div>
        </div>


    );
  }
}

export default App;
