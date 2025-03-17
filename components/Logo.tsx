import { Image, ImageSourcePropType } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { getThemeConstants } from '@/data/constants/theme';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 120 }: LogoProps) {
  const { airline } = useTheme();
  const { BRANDING } = getThemeConstants(airline);
  const height = size * 0.4; // Maintain aspect ratio
  
  return (
    <Image
      source={BRANDING.logo as ImageSourcePropType}
      style={{
        width: 300,
        height: height,
        resizeMode: 'contain',
      }}
    />
  );
}