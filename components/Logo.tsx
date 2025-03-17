import { Image } from 'react-native';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 120 }: LogoProps) {
  const height = size * 0.4; // Maintain aspect ratio
  
  return (
    <Image
      source={{ uri: 'https://apps1.tflite.com/takeflitepublic/Comp329425Logo0.jpg' }}
      style={{
        width: size,
        height: height,
        resizeMode: 'contain',
      }}
    />
  );
}