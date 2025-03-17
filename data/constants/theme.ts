import * as soundsAir from './soundsprod';
import * as tropicOceanAirways from './toaprodu';

export type AirlineTheme =
 'sounds' |
 'toa';

const themes = {
  sounds: soundsAir,
  toa: tropicOceanAirways,
};

export const getThemeConstants = (airline: AirlineTheme) => themes[airline];

// Set the default airline theme here
export const DEFAULT_AIRLINE: AirlineTheme = 'sounds';