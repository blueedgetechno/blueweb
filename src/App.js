import React, {useState, useEffect} from 'react';
import './App.css';
// import './rough.css';

import './assets/css/code.css';
import './assets/css/onedark.css';

import profileImg from './assets/img/profile.jpg';

import githubIcon from './assets/img/icons/github.png';
import twitterIcon from './assets/img/icons/twitter.png';
import gmailIcon from './assets/img/icons/gmail.png';
import codeforcesIcon from './assets/img/icons/codeforces.jpg';
import spotifyIcon from './assets/img/icons/spotify.png';
import youtubeIcon from './assets/img/icons/youtube.png';

import PythonIcon from './assets/img/icons/python.png';
import JavaScriptIcon from './assets/img/icons/javaScript.png';

import ReactIcon from './assets/img/icons/react.png'; //https://iconscout.com/icons/react
import NodeJsIcon from './assets/img/icons/nodejs.png';
import UnityIcon from './assets/img/icons/unity.png';
import BlenderIcon from './assets/img/icons/blender.png';
import MongoDBIcon from './assets/img/icons/mongo.png';
import AzureIcon from './assets/img/icons/azure.png';

import {
  IntroCard,
  LangCard,
  SocialCard,
  ProjectCard
} from './cards.js';

import Projects from './components/front/projects.js'

function App() {

  const [card1, setCard1] = useState(1)
  const [card2, setCard2] = useState(-2)
  const [card3, setCard3] = useState(-1)
  const [card4, setCard4] = useState(0)
  // const [card5, setCard5] = React.useState(0)

  const [isMobo, setMobo] =  React.useState(()=>{
    return window.outerWidth<=650;
  })

  window.addEventListener('resize',()=>{
    setMobo(window.outerWidth<=650);
  });

  document.body.dataset.page = "home"

  const handleOnClick = ()=>{
    if(card1==2) setCard1(-1);
    else setCard1(card1+1);

    if(card2==2) setCard2(-1);
    else setCard2(card2+1);

    if(card3==2) setCard3(-1);
    else setCard3(card3+1);

    if(card4==2) setCard4(-1);
    else setCard4(card4+1);
  }

  const states = {
    "-3": "",
    "-2": "",
    "-1": "",
    "0": " followed",
    "1": " front",
    "2": " fall"
  }

  const links = {
    "github" : "https://github.com/blueedgetechno",
    "twitter" : "https://twitter.com/blueedgetechno"
  }

  const clicked = (altValue)=>{
    return;
    window.open(links[altValue], "_blank");
  }

  useEffect(()=>{
  })

  return (
    <div className="home">
      <div className="intro">
        <div className="introCards" onClick={handleOnClick}>
          <IntroCard count={0} curState={states[card1]}/>
          <ProjectCard count={1} curState={states[card2]}/>
          <SocialCard count={2} curState={states[card3]}/>
          <LangCard count={3} curState={states[card4]}/>
        </div>
        <div className="profileImage">
          <img className="introImage" src={profileImg} alt="profile"/>
          <div className="ringCircle innerCircle">
            <img onClick={()=>{
              clicked("twitter");
            }} className="planetCircle" src={PythonIcon} alt="twitter"/>
            <img onClick={()=>{
              clicked("github");
            }} className="planetCircle" src={JavaScriptIcon} alt="github"/>
          </div>
          <div className="ringCircle outerCircle">
            <img className="planetCircle" src={ReactIcon} alt=""/>
            <img className="planetCircle" src={BlenderIcon} alt=""/>
            <img className="planetCircle" src={UnityIcon} alt=""/>
            <img className="planetCircle" src={AzureIcon} alt=""/>
            <img className="planetCircle" src={MongoDBIcon} alt=""/>
            <img className="planetCircle" src={NodeJsIcon} alt=""/>
          </div>
        </div>
      </div>
      {/* <Projects/> */}
    </div>
  )
}

export default App;
