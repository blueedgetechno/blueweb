import React, {useState} from 'react';
import Loader from "react-loader-spinner";
import axios from 'axios';

import './unescape.css';
import './responsive.css';

import Progress from "./progress.js";
import SplashScreen from '../../assets/img/unescape/splash.jpg';
import unexp from '../../assets/img/unescape/unexp.png';

import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import ExtensionIcon from '@material-ui/icons/Extension';
import TwitterIcon from '@material-ui/icons/Twitter';

var blueapi = "https://blueapi.herokuapp.com/api/"
if(process.env.REACT_APP_BLUEAPI!=null){
  blueapi = process.env.REACT_APP_BLUEAPI;
}

export default function Unescape() {

  const [email, setEmail] = useState("");
  const [isLegal, setLegal] = useState(false);
  const [emailsent, setSent] = useState(false);
  const [isWait, setWait] = useState(false);
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState("An error occured...");
  const [picture, setPicture] = useState(0);
  const [subcount, setSubcount] = useState(0);
  const [proHeight, setHeight] = useState(600);

  const [subm, setSubm] = useState(!!localStorage.getItem('showPuzz'));

  React.useEffect(()=>{
    var url = `${blueapi}count`

    axios.get(url)
      .then(res=>{
        if(res && res.data && res.data.status==200){
          setSubcount(res.data.result);
        }
      }).catch(err=>{
      })
  }, [emailsent]);

  const [showPuzz, setShowPuzz] = useState(()=>{
    if(localStorage.getItem('showPuzz')=="true"){
      return true;
    }else{
      console.log("False, I guess why");
      return false;
    }
  });

  const [isHidden, setHidden] = useState(true);
  const [secpuz, setSecpuz] = useState("");
  const [inputClass, setInputClass] = useState("");
  const [prompt, setPrompt] = useState("type here...");
  const [isCorrect, setisCorrect] = useState(false);

  const insights = [
    "img/pinlock.png",
    "img/slidepuzz.png",
    "img/suitcasePuzz.png",
    "img/devquote.png",
    "img/brokenStar.png"
  ]

  const words = [
    "The universe is the key",
    "Sometimes symmetry act as a helping hand",
    "Abstraction is the virtue of this game",
    "Small details that can create big pictures",
    "A profound sense of incompleteness"
  ]

  const msg = "Subscribe%20to%20the%20game%20Unescape%2C%20%40blueedgetechno%20is%20working%20on.%0A%0AA%203d%20game%2C%20full%20of%20secrets%20and%20puzzles%20to%20test%20your%20critical%20thinking%20throughout%20the%20way.%0A%0Asubscribe%20now%3A%20https%3A%2F%2Fblueedge.me%2Funescape%0A%0Ahttps://www.youtube.com/watch?v=m0EHSoZzHEA"

  const checkEmail = (ele)=>{
    setLegal(ele.target.checkValidity() && ele.target.value!="");
    setEmail(ele.target.value);
  }

  const sendRequest = ()=>{
    if(isLegal){
      console.log(email);
      setWait(true);

      var url = blueapi;

      const body = {
        email: email,
        authkey: process.env.REACT_APP_AUTH_KEY
      }

      url+=`?email=${body.email}&authkey=${body.authkey}`

      axios.post(url, body).then(res=>{
          if(res.data.status==200){
            setWait(false);
            setSent(true);
            setShowPuzz(true);
            if(localStorage.getItem('showPuzz')!="true"){
              setTimeout(()=>{
                window.location = "/unescape#puzzContainer";
              },2000);
            }
            localStorage.setItem('showPuzz', "true");
            localStorage.setItem('email', body.email);
          }else{
            if(res.data.message.includes("duplicate key")){
              setMessage("Email already exist");
            }
            // console.log(res.data);
            setError(true);
            setWait(false);
          }
          // console.log("THEN");
          // console.log(res.data);
        }).catch(err=>{
          setError(true);
          setWait(false);
          // console.log("CATCH");
          // console.log(err.message);
          // console.log(err);
        })
    }
  }

  const placeSec = (ele)=>{
    if(!isCorrect){
      setSecpuz(ele.target.value);
      setInputClass("");
      setPrompt("")
    }
  }

  const checkSec = ()=>{
    if(
      secpuz.length<=10 &&
      !isCorrect &&
      secpuz.toLowerCase()==process.env.REACT_APP_SECRET_PUZZ){
      setisCorrect(true);
      setInputClass("correctAns");
    }else if (!isCorrect) {
      setSecpuz("");
      setPrompt("Wrong password");
      setInputClass("wrongAns");
    }
  }

  const incHeight = ()=>{
    var pheight = document.getElementById('progress').offsetHeight;
    if(pheight>proHeight){
      setHeight(Math.min(proHeight+4800, pheight));
    }else{
      setHeight(-1);
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
                      placeholder="your email"
                      readOnly={isWait}
                    />
                    :null}

                  {emailsent==false & isWait==false & !isError?
                    <button
                      className="subtn"
                      disabled={!isLegal}
                      onClick={sendRequest}
                      >subscribe</button>
                    :null}

                  {emailsent==false & isWait==true & !isError?
                    <Loader
                      className="loaderEmail"
                      type="TailSpin"
                      color="#1da1f2"
                      height={40}
                      width={40}
                      />
                    :null}

                  {emailsent & !isError?
                    <div className="checkCont">
                      <CheckCircleRoundedIcon className="checkmark"/>
                    </div>
                    :null}

                  {emailsent & !isError?
                    <div className="thankscontainer">
                      <span className="thanks">Thanks for subscribing</span>
                      <a href={false?
                        "https://twitter.com/intent/tweet?original_referer=https://blueedge.me&text="
                        + msg: "https://bit.ly/37YHKjX"}
                      target="_blank"
                      title="spread the word">
                        <TwitterIcon className="twit"/>
                      </a>
                    </div>
                    :null}

                  {subm && !(emailsent & !isError)?(
                    <a className="extratweet" href={false?
                      "https://twitter.com/intent/tweet?original_referer=https://blueedge.me&text="
                      + msg: "https://bit.ly/37YHKjX"}
                    target="_blank"
                    title="spread the word">
                      <TwitterIcon className="twit"/>
                    </a>
                  ):null}

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
                  {subcount!=" "?(
                    <span><div className="textDivider"></div><span className="subcount">{" "}{subcount} peoples</span> have subscribed so far.</span>
                  ):null}
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
          <div className="videobar">
            <div className="videocard">
              <iframe src="https://www.youtube.com/embed/m0EHSoZzHEA" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
          <div className="gamepara">
            <Fade left={true}>
              <div className="imagecont" id="firstCont">
                <div className="paratitle">The realm of reality</div>
                <div className="imageframe">
                  <img className="paraimage" src={unexp} alt="unexp"/>
                </div>
                <div className="levelintro">- A still from the ongoing game unescape</div>
              </div>
            </Fade>
            <Fade right={true}>
              <div className="paracol">
                <div className="paratitle">The realm of reality</div>
                <div className="paratext">
                  A <mark>3d game</mark>, full of <mark>secrets and puzzles</mark> to test your
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
                  that will <mark>challenge</mark> your <mark>problem-solving </mark>
                  and <mark>lateral thinking</mark> skills.
                  <br/><br/>
                  The <mark>number</mark> and <mark>difficulty</mark> of puzzles will
                  <mark> increase</mark> as you progress through the game and some
                  problems require you to think <mark>outside the box</mark> 📦.
                </div>
              </div>
            </Fade>
            <Fade right={true}>
              <div className="imagecont">
                <div className="paratitle">The state of subjectivity</div>
                <div className="imageframe" onClick={()=>{
                  setPicture((picture+1)%5);
                }}>
                  {insights.map((imgsrc,xi)=>{
                    return (
                      <img
                        className={picture==xi?"paraimage":"hiddenPhoto"}
                        id="puzzleImg"
                        src={imgsrc} alt=""/>
                    )
                  })}

                </div>
                <div className="levelintro" id="fewords">{words[picture]}</div>
              </div>
            </Fade>
          </div>
        </div>
        <div
          className={proHeight>0?"prolayout":""}
          style={{
            height: proHeight>0?proHeight+'px':'auto',
            maxHeight: 'max-content'
          }}
          >
          <Progress/>
          {proHeight>0?<div className="probtn" onClick={incHeight}>Expand</div>:null}
        </div>
        <div className={showPuzz?"puzzleCont":""} id="puzzContainer">
          {isHidden && showPuzz?(
            <div className="puzzIcon"
              onClick={()=>{
                setHidden(false);
              }}>
              <ExtensionIcon/>
              <span>Click me</span>
            </div>
          ):null}
          {!isHidden && !isCorrect?(
            <div className="hiddenpuzz">
              <span>
                If you have noticed there's is a hidden password (atmost 10 letters)
                on this website. Find it to unlock a surprise
              </span>
              <input
                className={"secretPuzz "+inputClass}
                type="text"
                value={secpuz}
                placeholder={prompt}
                onChange={placeSec.bind(this)}
              />
              <Button
                variant="contained"
                onClick={checkSec}
                >check</Button>
            </div>
          ):null}
          {isCorrect?(
            <span>
              Correct !!{" "}
              <a href="https://bit.ly/2Ljsyq7" target="_blank">Here you go</a>
              {" "}. . . , Thanks me later
            </span>
          ):null}
        </div>
        <div className="subsband">
          <a href="#">
            <div className="subbutton">Subscribe Now !!</div>
          </a>
        </div>
      </div>
    </div>
  )
}
