import React, {useState} from 'react';
import axios from 'axios';

import './unescape.css';

import SplashScreen from '../../assets/img/unescape/splash.jpg';
import demoPic from '../../assets/img/unescape/example.jpg';
import unexp from '../../assets/img/unescape/unexp.png';

import pinlock from '../../assets/img/unescape/insights/pinlock.png';
import slidepuzz from '../../assets/img/unescape/insights/slidepuzz.png';
import suitcasePuzz from '../../assets/img/unescape/insights/suitcasePuzz.png';
import devquote from '../../assets/img/unescape/insights/devquote.png';
import brokenStar from '../../assets/img/unescape/insights/brokenStar.png';

import Fade from 'react-reveal/Fade';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

export default function Unescape() {

  const [email, setEmail] = useState("");
  const [isLegal, setLegal] = useState(false);
  const [emailsent, setSent] = useState(false);
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState("An error occured...");
  const [picture, setPicture] = useState(0);

  const insights = [
    pinlock,
    slidepuzz,
    suitcasePuzz,
    devquote,
    brokenStar
  ]

  const words = [
    "The universe is the key",
    "Sometimes symmetry act as a helping hand",
    "Abstraction is the virtue of this game",
    "Small details that can create big pictures",
    "A profound sense of incompleteness"
  ]

  const checkEmail = (ele)=>{
    setLegal(ele.target.checkValidity() && ele.target.value!="");
    setEmail(ele.target.value);
  }

  const sendRequest = ()=>{
    if(isLegal){
      console.log(email);

      var url = "https://api.blueedge.me/api"
      if(process.env.NODE_ENV=="development"){
        url+="/test"
      }

      const body = {
        email: email,
        authkey: process.env.REACT_APP_AUTH_KEY
      }

      axios.post(url,body)
        .then(res=>{
          if(res.data.status==200){
            setSent(true);
          }else{
            if(res.data.message.includes("duplicate key")){
              setMessage("Email already exist");
            }
            setError(true);
          }
          // console.log("THEN");
          // console.log(res.data);
        }).catch(err=>{
          setError(true);
          // console.log("CATCH");
          // console.log(err.message);
        })
    }
  }

  document.body.dataset.page = "unescape";

  return (
    <div className="unescapeApp">
      <div className="unescapeCont">
        <div className="splashScreen">
          <img src={SplashScreen} alt=""/>
          <div className="splashtext">
            <div className="description">
              <div className="title">
                <div className="titleLetters">U</div>
                <div className="titleLetters">n</div>
                <div className="titleLetters">e</div>
                <div className="titleLetters">s</div>
                <div className="titleLetters">c</div>
                <div className="titleLetters">a</div>
                <div className="titleLetters">p</div>
                <div className="titleLetters">e</div>
              </div>
              <div className="slogan">A picture of possibilities</div>
              <div className="gamedesc">
                <span>A house full of rooms with hidden secrets
                  and competitive puzzles which will lead you to the truth of your
                  very existence
                </span>
              </div>
              <div className="subscribeCont">
                <div className="subscribe">
                  {emailsent==false & !isError?
                    <input
                      id="emailinput"
                      className="subinp"
                      type="email"
                      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      onChange={checkEmail.bind(this)}
                      placeholder="your email"/>
                    :null}
                  {emailsent==false & !isError?
                    <button
                      className="subtn"
                      disabled={!isLegal}
                      onClick={sendRequest}
                      >subscribe</button>
                    :null}

                  {emailsent & !isError?
                    <div className="checkCont">
                      <CheckCircleRoundedIcon className="checkmark"/>
                    </div>
                    :null}

                  {emailsent & !isError?
                    <div className="thankscontainer">
                      <span className="thanks">Thanks for subscribing</span>
                    </div>
                    :null}

                  {isError?
                    <div className="checkCont crossCont">
                      <CancelRoundedIcon className="cross"/>
                    </div>
                    :null}

                  {isError?
                    <div className="thankscontainer">
                      <span className="errortext">
                        {message} <a href="/unescape">(click to retry)</a>
                      </span>
                    </div>
                    :null}
                </div>
              </div>
              <div className="subtxt">
                <span>
                  Subscribe to the waiting list to be among the first to know
                  when the game is available!
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="divider">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
            <path
              d="M-0.90,128.57 C259.81,130.55 421.78,133.51 500.78,9.19 L500.00,150.00 L0.00,150.00 Z"
              style={{stroke: 'none', fill: '#111111'}} />
          </svg>
        </div>
        <div className="gamedetails">
          <div className="gamepara">
            <div className="floaterCont">
              <div className="tk-blob floater">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 747.2 726.7">
                  <path d="M539.8 137.6c98.3 69 183.5 124 203 198.4 19.3 74.4-27.1 168.2-93.8 245-66.8 76.8-153.8 136.6-254.2 144.9-100.6 8.2-214.7-35.1-292.7-122.5S-18.1 384.1 7.4 259.8C33 135.6 126.3 19 228.5 2.2c102.1-16.8 213.2 66.3 311.3 135.4z" />
                </svg>
              </div>
            </div>
            <Fade left={true}>
              <div className="imagecont" id="firstCont">
                <img className="paraimage" src={unexp} alt="unexp"/>
                <div className="imageframe"></div>
                <div className="levelintro">- A still from the ongoing game unescape</div>
              </div>
            </Fade>
            <Fade right={true}>
              <div className="paracol">
                <div className="paratitle">The realm of reality</div>
                <div className="paratext">
                  A <mark>3d game</mark>, full of <mark>secrets and puzzle</mark> to test your
                  <mark> critical thinking</mark> throughout the way.
                  <br/><br/>
                  In this immersive <mark>point & click </mark>puzzler, you will face
                  <mark> multiples levels</mark> of growing difficulty with
                  <mark> interactive</mark> puzzles and tasks.
                </div>
              </div>
            </Fade>
          </div>
          <div className="gamepara">
            <Fade left={true}>
              <div className="paracol">
                <div className="paratitle">The state of subjectivity</div>
                <div className="paratext">
                  The game offers a <mark>variety of puzzles</mark> and tasks
                  that will <mark>challenge</mark> your <mark>problem-solving</mark>
                  and <mark>lateral thinking</mark> skills.
                  <br/><br/>
                  The <mark>number</mark> and <mark>difficulty</mark> of puzzles will
                  <mark>increase</mark> as you progress through the game and some
                  problems require you to think <mark>outside the box</mark> 📦.
                </div>
              </div>
            </Fade>
            <Fade right={true}>
              <div className="imagecont">
                <img
                  className="paraimage"
                  id="puzzleImg"
                  onClick={()=>{
                    setPicture((picture+1)%5);
                  }}
                  src={insights[picture]} alt=""/>
                <div className="imageframe"></div>
                <div className="levelintro" id="fewords">{words[picture]}</div>
              </div>
            </Fade>
          </div>
        </div>
        <div className="puzzleCont">
          <div className="hiddenpuzz">
            <span>
              If you have noticed there's is a password (atmost 10 letters)
              on this website. <br/>
              Find it to unlock a surprise
            </span>
            <input type="text"/>
          </div>
        </div>
        <div className="subsband">
          <a href="#"><div className="subbutton">Subscribe Now !!</div></a>
        </div>
      </div>
    </div>
  )
}
