uniform float uTime;
uniform vec2 uGrid;

varying vec2 vUv;
varying float vHue;

void main() {
  vec3 pos = position;

  float id = float(gl_InstanceID);
  float x = mod(id, uGrid.x);
  float y = floor(id / uGrid.x);

  vec2 cellUV = uv;
  cellUV.x = (cellUV.x + x) / uGrid.x;
  cellUV.y = (cellUV.y + y) / uGrid.y;

  vUv = cellUV;
  vHue = x / uGrid.x + uTime * 0.05;

  pos.z += sin(uTime + id * 0.1) * 10.0;

  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
}
