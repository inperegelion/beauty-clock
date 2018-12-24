const solidColor = 'red'
const auxiliaryColor = 'green'
const noneColor = 'rgba(255, 255, 255, 1)'
const strokeColor = 'black'
const canvas = document.getElementById('beauty-clock');
const ctx = canvas.getContext('2d')


sSectors = [undefined, undefined, undefined, undefined, undefined, undefined]
mSectors = [undefined, undefined, undefined, undefined, undefined, undefined]
hSectors = [undefined, undefined, undefined, undefined]

class sSector {
  constructor() {
    this.x = 100 //absolute
    this.y = 100
    this.radius = 90
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
    ctx.stroke()
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
    this.x = 100 //absolute
    this.y = 100
    this.radius = 60
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
    ctx.stroke()
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
    this.x = 100 //absolute
    this.y = 100
    this.radius = 30
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
    ctx.stroke()
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
  ctx.clearRect(0, 0, 200, 200)

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



hZones = {
  0: [11, 0, 1],
  3: [2, 3, 4],
  6: [5, 6, 7],
  9: [8, 9, 10]
}

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
  console.log('dec base:', m10, m01);
  sectors[m10].setColor(solidColor, false)
  if (m01 != 0) {
    if (m01 % 2 == 1) {
      m01 = m10 + ((m01 + 1) / 2)
      console.log('m01:', m01);
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
    console.log('sector', m01);

    sectors[m01].setColor(auxiliaryColor, false)
  }
}
// setOuterRings(5, 9)

// sSectors[0].setColor(solidColor, false)
// sSectors[1].setColor(auxiliaryColor, false)
// mSectors[0].setColor(solidColor, false)
// mSectors[1].setColor(auxiliaryColor, false)
// hSectors[0].setColor(solidColor, false)
// hSectors[1].setColor(auxiliaryColor, false)

// drawAllClock()


let x = 0

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
  console.log('Now time: ', timeNumbers.hour + ':' + timeNumbers.minLeft + timeNumbers.minRight + ':' + timeNumbers.secLeft + timeNumbers.secRight);
  setHourColors(timeNumbers.hour)
  setOuterRings(timeNumbers.minLeft, timeNumbers.minRight, mSectors)
  setOuterRings(timeNumbers.secLeft, timeNumbers.secRight, sSectors)
  // setSecondsColors(timeNumbers.secLeft, timeNumbers.secRight)
  drawAllClock()
}


// main_tick()
setInterval(() => {
  console.log('oi');
  main_tick()
}, 1000)

if (false) {
  setInterval(function() {
    if (x == 60) {
      x = 0
    }
    setOuterRings(x)
    drawAllClock()
    x += 1
  }, 100)
}






// sSector.draw()
