export function polygonCentroid(coords) {
  if (!Array.isArray(coords) || coords.length === 0) {
    return null;
  }

  let lng = 0;
  let lat = 0;
  let count = 0;

  for (const point of coords) {
    if (!Array.isArray(point) || point.length < 2) continue;

    const [x, y] = point;

    if (isNaN(x) || isNaN(y)) continue;

    lng += x;
    lat += y;
    count++;
  }

  if (count === 0) return null;

  return {
    lng: lng / count,
    lat: lat / count,
  };
}
