varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;
   float distanceToCenter = distance(uv, vec2(0.5));
  // same result =>  float distanceToCenter = length(uv - vec2(0.5));
    gl_FragColor = vec4(vColor, 0.5);

    // to discard the fragment(discard=> when the shape is quite sharp)
    if(distanceToCenter > 0.5) discard;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}