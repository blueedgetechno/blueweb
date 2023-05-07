import "./projects.css"

import unexp from "../../assets/img/unescape/unexp.png"

function Projects() {
  return (
    <div className="projects">
      <div className="protitle">
        <span>Projects</span>
      </div>
      <div className="proList">
        <div className="projCont">
          <div className="projText">
            <div className="projtitle">
              <span>Blueweb : Create some chaos</span>
            </div>
            <div className="projdesc">
              A personal website for self presentation.
            </div>
          </div>
          <div className="projImage">
            <img src={unexp} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
