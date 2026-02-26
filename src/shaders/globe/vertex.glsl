
  precision mediump float;
  

  uniform float uTime;
  uniform float uMaxExtrusion;

  void main() {

    vec3 newPosition = position;
    if(uMaxExtrusion > 1.0) newPosition.xyz = newPosition.xyz * uMaxExtrusion + sin(uTime);
    else newPosition.xyz = newPosition.xyz * uMaxExtrusion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

  }
