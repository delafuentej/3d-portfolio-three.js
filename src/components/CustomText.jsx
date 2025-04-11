import { Text } from "@react-three/drei";

export default function CustomText({
  children,
  font,
  fontSize,
  position,
  rotationY = 0,
  maxWidth,
  color = "#ffffff",
  textAlign = "center",
}) {
  return (
    <Text
      font={font}
      fontSize={fontSize}
      position={position}
      rotation-y={rotationY}
      maxWidth={maxWidth}
      color={color}
      textAlign={textAlign}
    >
      {children}
    </Text>
  );
}
