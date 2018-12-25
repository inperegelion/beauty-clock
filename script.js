var solidColor = '#ff0000'
var auxiliaryColor = '#ffff00'
var noneColor = '#ffffff'
var hideNoneColorPicker = false
var strokeColor = '#000000'
var addStrokes = true
var outerRingRadius = 150
var centerPosition = {
  x: 200,
  y: 200
}
const canvas = document.getElementById('beauty-clock');
const ctx = canvas.getContext('2d')
ctx.canvas.width = 400;
ctx.canvas.height = 400;

let solCol, auxCol, nonCol, strCol

solCol = document.querySelector('#solidColorPicker')
solCol.value = solidColor
solCol.addEventListener('input', (event) => {
  solidColor = event.target.value
}, false)
auxCol = document.querySelector('#auxiliaryColorPicker')
auxCol.value = auxiliaryColor
auxCol.addEventListener('input', (event) => {
  auxiliaryColor = event.target.value
}, false)
nonCol = document.querySelector('#noneColorPicker')
nonCol.value = noneColor
nonCol.addEventListener('input', (event) => {
  noneColor = event.target.value
}, false)
if (hideNoneColorPicker) {
  document.getElementById('ncpp').style.display = 'none'
}

// strCol = document.querySelector('#strokeColorPicker')
// strCol.value = strokeColor
// strCol.addEventListener('input', (event) => {
//   strokeColor = event.target.value
// }, false)


sSectors = [undefined, undefined, undefined, undefined, undefined, undefined]
mSectors = [undefined, undefined, undefined, undefined, undefined, undefined]
hSectors = [undefined, undefined, undefined, undefined]
hZones = {
  0: [11, 0, 1],
  3: [2, 3, 4],
  6: [5, 6, 7],
  9: [8, 9, 10]
}

class sSector {
  constructor() {
    this.x = centerPosition.x //absolute
    this.y = centerPosition.y
    this.radius = outerRingRadius
    this.color = noneColor
    this.strokeColor = strokeColor
    this.sectorStart = Math.PI * (-2 / 3)
    this.sectorEnd = Math.PI / -3
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.sectorStart, this.sectorEnd, false);
    ctx.closePath();
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.strokeStyle = this.strokeColor
    if (addStrokes) {
      ctx.stroke()
    }
  }
  setColor(newColor, toDraw = true) {
    this.color = newColor
    if (toDraw) {
      this.draw()
    }
  }
}

class mSector {
  constructor() {
    this.x = centerPosition.x //absolute
    this.y = centerPosition.y
    this.radius = outerRingRadius * 2 / 3
    this.color = noneColor
    this.strokeColor = strokeColor
    this.sectorStart = Math.PI * (-2 / 3)
    this.sectorEnd = Math.PI * (-1 / 3)
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.sectorStart, this.sectorEnd, false);
    ctx.closePath();
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.strokeStyle = this.strokeColor
    if (addStrokes) {
      ctx.stroke()
    }
  }
  setColor(newColor, toDraw = false) {
    this.color = newColor
    if (toDraw) {
      this.draw()
    }
  }
}

class hSector {
  constructor() {
    this.x = centerPosition.x //absolute
    this.y = centerPosition.y
    this.radius = outerRingRadius / 3
    this.color = noneColor
    this.strokeColor = strokeColor
    this.sectorStart = Math.PI * (-3 / 4)
    this.sectorEnd = Math.PI / -4
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.sectorStart, this.sectorEnd, false);
    ctx.closePath();
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.strokeStyle = this.strokeColor
    if (addStrokes) {
      ctx.stroke()
    }
  }
  setColor(newColor, toDraw = true) {
    this.color = newColor
    if (toDraw) {
      this.draw()
    }
  }
}


sSectors = sSectors.map((element, index, array) => {
  if (index == 0) {
    return new sSector
  } else {
    element = new sSector
    element.sectorStart = Math.PI * (-2 / 3) + (Math.PI / 3 * index)
    element.sectorEnd = element.sectorStart + (Math.PI / 3)
    return element
  }
})

mSectors = mSectors.map((element, index, array) => {
  if (index == 0) {
    return new mSector
  } else {
    element = new mSector
    element.sectorStart = Math.PI * (-2 / 3) + (Math.PI / 3 * index)
    element.sectorEnd = element.sectorStart + (Math.PI / 3)
    return element
  }
})

hSectors = hSectors.map((element, index, array) => {
  if (index == 0) {
    return new hSector
  } else {
    element = new hSector
    element.sectorStart = Math.PI * (-3 / 4) + (Math.PI / 2 * index)
    element.sectorEnd = element.sectorStart + (Math.PI / 2)
    return element
  }
})

function drawAllClock() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  sSectors.map((element, index, array) => {
    element.draw()
    element.color = noneColor
  })
  mSectors.map((element, index, array) => {
    element.draw()
    element.color = noneColor
  })
  hSectors.map((element, index, array) => {
    element.draw()
    element.color = noneColor
  })
}


// convertor

function setHourColors(hour) {
  for (zone in hZones) {
    if (hZones[zone].includes(hour)) {
      let solidHour = hZones[zone][1]
      let auxiliaryHour = hour - solidHour
      hSectors[solidHour / 3].setColor(solidColor, false)
      if (auxiliaryHour != 0) {
        let bar = solidHour / 3 + auxiliaryHour;
        if (bar == 4) {
          bar = 0
        } else if (auxiliaryHour == 11) {
          bar = 3
        }
        hSectors[bar].setColor(auxiliaryColor, false)
      }
      break
    }
  }
}

function setOuterRings(m10, m01, sectors) {
  sectors[m10].setColor(solidColor, false)
  if (m01 != 0) {
    if (m01 % 2 == 1) {
      m01 = m10 + ((m01 + 1) / 2)
      if (m01 >= 6) {
        m01 -= 6
      }

    } else if (m01 % 2 == 0) {
      m01 = m10 + (m01 / 2)
      let m01plus = m01 + 1
      if (m01 >= 6) {
        m01 -= 6
      }
      if (m01plus >= 6) {
        m01plus -= 6
      }
      sectors[m01plus].setColor(auxiliaryColor, false)
    }

    sectors[m01].setColor(auxiliaryColor, false)
  }
}


function main_tick() {
  let now = new Date(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hour = now.getHours()

  hour = hour >= 12 ? hour - 12 : hour

  let timeNumbers = {
    hour: hour,
    minLeft: (now.getMinutes() - (now.getMinutes() % 10)) / 10,
    minRight: now.getMinutes() % 10,
    secLeft: (now.getSeconds() - (now.getSeconds() % 10)) / 10,
    secRight: now.getSeconds() % 10
  }
  setHourColors(timeNumbers.hour)
  setOuterRings(timeNumbers.minLeft, timeNumbers.minRight, mSectors)
  setOuterRings(timeNumbers.secLeft, timeNumbers.secRight, sSectors)
  drawAllClock()
}




// main_tick()
setInterval(() => {
  main_tick()
}, 1000)
