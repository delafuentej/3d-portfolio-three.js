uniform vec3 uColor;
uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;

attribute float aIntensity;
attribute float aAngle;

varying vec3 vColor;

void main()
{
    //Displacement
    vec3 newPosition = position;

    // displacementIntensity => to retrieve the displacement value from uDisplacementTexture:

    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    //remap tje displacementIntensity : particular return to its original position
    displacementIntensity = smoothstep(0.6, 1.0, displacementIntensity);
    //displacement direction:
    vec3 displacement = vec3(
        cos(aAngle) * 0.2, //x
        sin(aAngle) * 0.2, //y
        1.0 //z
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;

    newPosition += displacement;

    // Final position
   //vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    //Pick the picture at uv coordinates & swizzle the r channel:
   // float pictureIntensity = texture(uPictureTexture, uv).r;
    float pictureIntensity = texture(uPictureTexture, uv).r;

    // Point size
    gl_PointSize = 0.15 * uResolution.y * pictureIntensity;
     gl_PointSize *= (1.0 / - viewPosition.z);

     //Varyings
     vColor = uColor * pow(pictureIntensity, 2.5);
}