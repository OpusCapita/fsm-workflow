export function getCirclePath(cx, cy, r) {
  // See original solution here: https://codepen.io/jakob-e/pen/bgBegJ
  const d = `M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
  return d;
}

export function pathToPoints(path, samples) {
  let points = [];
  for (let i = 1; i <= samples; i += 1) {
	  const point = path.getPointAtLength(i / samples * path.getTotalLength());
    points.push(point);
  }
  return points;
}

export function pointsToPath(points, closePath) {
  let path = "";
  for(let i = 0; i < points.length; i += 1 ) {
    path += (i && "L " || "M ") + points[i].x + ',' + points[i].y + ' ';
  }
  if(closePath) {
    path += 'Z';
  }
  return path;
}

export function getDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt( a*a + b*b );
}

export function snapPoint(x, y, stickyPoints, snapDistance = 50) {
  const bestCandidate = Object.keys(stickyPoints).reduce((accum, pointKey) => {
    const point = stickyPoints[pointKey];
    const distance = getDistance(x, y, point.x, point.y);
    const isCandidate = distance < snapDistance;

    if (isCandidate && (accum.bestDistance === null || accum.bestDistance > distance)) {
      return ({ bestDistance: distance, bestCandidate: [point.x, point.y] });
    }

    return accum;

  }, { bestDistance: null, bestCandidate: [x, y] }).bestCandidate;

  return bestCandidate;
}

export function getPointAtLine(x1, y1, x2, y2, ratio) {
  const length = getDistance(x1, y1, x2, y2);
  const xT = (1 - ratio) * x1 + ratio * x2;
  const yT = (1 - ratio) * y1 + ratio * y2;

  return [xT, yT];
}

export function straightensBezier(points, ratio = 0.25) {
  const xDiff = points[0] - points[6];
  const yDiff = points[1] - points[7];
  const segment1 = getPointAtLine(points[0], points[1], points[6], points[7], ratio);
  const segment2 = getPointAtLine(points[6], points[7], points[0], points[1], ratio);

  return [
    points[0], points[1],
    segment1[0], segment1[1],
    segment2[0], segment2[1],
    points[6], points[7],
  ];
}
