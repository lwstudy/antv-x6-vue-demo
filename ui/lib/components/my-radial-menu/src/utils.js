export function degToRad(deg) {
  return deg * (Math.PI / 180)
}

export function getDegreePos(angleDeg, length) {
  return {
    x: Math.sin(degToRad(angleDeg)) * length,
    y: Math.cos(degToRad(angleDeg)) * length
  }
}

export function numberToString(n) {
  if (Number.isInteger(n)) {
    return n.toString()
  } else if (n) {
    let r = (+n).toFixed(5)
    if (r.match(/\./)) {
      r = r.replace(/\.?0+$/, '')
    }
    return r
  }
}

export function pointToString(point) {
  return numberToString(point.x) + ' ' + numberToString(point.y);
}

export function resolveLoopIndex(index, length) {
  if (index < 0) {
    index = length + index;
  }
  if (index >= length) {
    index = index - length;
  }
  if (index < length) {
    return index;
  } else {
    return null;
  }
}

export function setClassAndWaitForTransition(node, newClass) {
  return new Promise(function (resolve) {
    function handler(event) {
      if (event.target === node) {
        node.removeEventListener('transitionend', handler);
        resolve();
      }
    }

    node.addEventListener('transitionend', handler);
    node.classList.add(newClass)
  })
}
