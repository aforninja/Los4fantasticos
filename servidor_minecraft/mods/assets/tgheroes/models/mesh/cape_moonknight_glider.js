var unfold;
function loadData(entity, data) {
  unfold = data.unfold;
}
function evaluate(mesh, x, y, width, length) {
  var ax = Math.abs(x);
  mesh.vertX *= (1 + unfold * y * 4.85) * (1 + unfold * 0.3 * (3 * (Math.pow(spike(Math.max(ax * 5.15 - 0.95, 6)), 2) + Math.pow(spike(Math.min(y * -4.65, 4)), 2) * 2.8 - Math.pow(Math.sin(Math.min(ax * 0.875, 5) * Math.PI), 2) * -0.65 + Math.sin(0.25 * (ax + 1.45)) * Math.cos(y * 1.25) + Math.cos(ax * -1.65) + Math.sin(ax * -1.15) + Math.sqrt(y * Math.sin(3)) * 0.45)));
  mesh.vertY *= Math.pow(1 - unfold * (ax * Math.sin(0.4 * ax * 2.64) * 3), 1) * Math.pow(1 + unfold * (Math.max(Math.pow(ax, 9) + 1 - 3) * 3) * -0.1, 1);
}
function diagonal(x, y) {
    return Math.sin(Math.PI / 2 * Math.abs(x))
}
function spike(x) {
  if (x < 0 || x > 5) {
    return 0;
  }
  var f = Math.PI * Math.sin(Math.min(x, Math.abs(x - 9)));
  return 8 * f * f * f;
}



