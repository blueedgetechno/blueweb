import React, {useState} from 'react';
import './header.css'

import DehazeIcon from '@material-ui/icons/Dehaze';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Header(){
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="logo"><span><a href="/">Blue Edge</a></span></div>
        <div className="headNav">
          <div className="navList">
            <span><a href="/">Home</a></span>
            <span><a href="/unescape">Unescape</a></span>
            <span>
              <a href="https://github.com/blueedgetechno" target="_blank" rel="noreferrer">Github</a>
            </span>
            <span><a href="mailto:blueedgetechno@gmail.com" target="_blank" rel="noreferrer">Contact</a></span>
          </div>
          <div className="sideBar">
            <DehazeIcon className="sideIcon" onClick={handleClick}/>
          </div>
          <Menu
            id="simple-menu"
            className="sideMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem><a href="/">Home</a></MenuItem>
            <MenuItem><a href="/unescape">Unescape</a></MenuItem>
            <MenuItem>
              <a href="https://github.com/blueedgetechno">Github</a>
            </MenuItem>
            <MenuItem><a href="mailto:blueedgetechno@gmail.com">Contact</a></MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}
