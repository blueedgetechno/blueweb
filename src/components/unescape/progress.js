import { useState } from "react"
import FlowBox from "./flowbox.js"
import "./progress.css"
import "./prores.css"

import axios from "axios"

var blueapi = "https://blueapi.herokuapp.com/api/"
if (process.env.REACT_APP_BLUEAPI != null) {
  blueapi = process.env.REACT_APP_BLUEAPI
}

function Progress() {
  const [colCount, setCol] = useState(1)
  const [prog, setProg] = useState(null)

  if (prog == null) {
    setProg([])
    var url = `${blueapi}progress`

    axios
      .get(url)
      .then((res) => {
        if (res && res.data && res.data.status == 200) {
          var arr = res.data.result

          arr.sort((a, b) => {
            var date1 = new Date(a.date)
            var date2 = new Date(b.date)

            if (date1 > date2) return 1
            else return -1
          })

          setProg(arr)
        }
      })
      .catch((err) => {})

    var style = getComputedStyle(document.body)
    var fbox = style.getPropertyValue("--fbox")
    var lbox = fbox.substring(0, fbox.length - 2)

    if (window.innerWidth > 900) {
      setCol(Math.floor(window.innerWidth / lbox))
      // console.log(Math.floor(window.innerWidth/lbox));
    } else {
      setCol(1)
    }

    window.onresize = function (event) {
      if (event.target.innerWidth > 900) {
        setCol(Math.floor(event.target.innerWidth / lbox))
      } else {
        setCol(1)
      }
    }
  }

  var flowrow = [],
    totRows = 0
  if (prog) {
    totRows = prog.length
  }

  if (colCount != 1) {
    totRows = Math.ceil(prog.length / (colCount - 2))
  }

  for (var i = 0; i < totRows; i++) {
    flowrow.push(i)
  }

  return (
    <div className="progCont" id="progress">
      <div className="headTitle">Progress</div>
      <div className="flowCont">
        <div className="pflow">
          {flowrow.map((x, yx) => {
            var boxes = []
            for (var i = x * colCount; i < (x + 1) * colCount; i++) {
              var tmpObj = {},
                cellNum = colCount == 1 ? x : i - 1 - 2 * x
              if (cellNum < prog.length) {
                tmpObj.isFirst = i == x * colCount
                tmpObj.isLast = i + 1 == (x + 1) * colCount
                tmpObj.isOdd = x % 2 == 0

                if ((!tmpObj.isFirst && !tmpObj.isLast) || colCount == 1) {
                  var idx = colCount == 1 ? x : i - 1 - 2 * x
                  tmpObj.data = prog[idx]
                  tmpObj.data.idx = idx + 1

                  if (cellNum == prog.length - 1) {
                    tmpObj.isEnd = true
                  }
                }
              } else {
                tmpObj.isNull = true
              }

              boxes.push(tmpObj)
            }

            return (
              <div className="flowrow">
                {boxes.map((box, k) => {
                  return (
                    <FlowBox
                      isStart={yx == 0 && k == 0}
                      isLast={box.isLast}
                      isFirst={box.isFirst}
                      isNull={box.isNull}
                      isOdd={box.isOdd}
                      isEnd={box.isEnd}
                      data={box.data}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Progress
