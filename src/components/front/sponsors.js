import { useState, useEffect } from "react"
import sponsorsdata from "./sponsors_data"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// "@fortawesome/free-regular-svg-icons": "^5.15.1",

import CoffeeIcon from "../../assets/img/icons/coffee.svg"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

import {
  faLink,
  faHeart,
  faExternalLink,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"

import { faHeart as faHeartOutLined } from "@fortawesome/free-regular-svg-icons"

const ghsponser = 'https://github.com/sponsors/blueedgetechno'
const bmcoffee = 'https://www.buymeacoffee.com/blueedgetechno'

const sponsor_api = "https://ghs.vercel.app/sponsors/blueedgetechno"

function Sponsors() {
  const [sponsors, setSponsors] = useState([])

  const fetchUsers = async () => {
    try {
      var res = await fetch(sponsor_api).then(x => x.json())
      setSponsors(res.sponsors || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (sponsors.length === 0) fetchUsers()
  }, [sponsors])

  return (
    <div className="sponsors-container">
      {sponsors.length > 0 && (
        <div className="sp-title">
          <span>GitHub Sponsors</span>
          <img src="/img/mona.png" alt="" />
        </div>
      )}
      <div className="sponsor-list">
        {sponsors
          .map((sp) => ({ ...sp, ...sp.details, ...sponsorsdata[sp.handle] }))
          .map((sp) => (
            <div className="sponsor-card" key={sp.handle}>
              <img src={sp.avatar} alt="pfp" />
              <div className="sponsor-info">
                <h1>
                  {sp.name}
                  &nbsp;
                  <a href={`https://github.com/${sp.handle}`} target="_blank">
                    <FontAwesomeIcon icon={faExternalLink} fontSize={16} />
                  </a>
                </h1>
                <h4>{sp.bio}</h4>
                <div className="sp-links">
                  {sp.location && (
                    <a href={"https://www.google.com/maps/place/" + sp.location} target="_blank">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{sp.location}</span>
                    </a>
                  )}
                  {sp.blog && (
                    <a href={sp.blog} target="_blank">
                      <FontAwesomeIcon icon={faLink} />
                      <span>{sp.blog}</span>
                    </a>
                  )}
                  {sp.twitter_username && (
                    <a
                      href={"https://twitter.com/" + sp.twitter_username}
                      target="_blank">
                      <FontAwesomeIcon icon={faTwitter} />
                      <span>@{sp.twitter_username}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="sp-btns">
        <div className="donate-btn gh-btn" onClick={() => window.open(ghsponser, '_blank')}>
          <span>Sponsor Me&nbsp;</span>
          <FontAwesomeIcon icon={faHeartOutLined} color="#ed94c9"/>
          <FontAwesomeIcon icon={faHeart} color="#ed94c9"/>
        </div>
        <span className="sp-divider">Or</span>
        <div className="donate-btn" onClick={() => window.open(bmcoffee, '_blank')}>
          <span>Buy Me a Coffee</span>
          <img src={CoffeeIcon} alt="coffee" width={30}/>
        </div>
      </div>
    </div>
  )
}

export default Sponsors
