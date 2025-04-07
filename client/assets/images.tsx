import { ImageSourcePropType } from 'react-native';

export type Sport = "football" | "basketball" | "cricket" | "tennis" | "badminton";

// type images = {
//   [key in Sport]: ImageSourcePropType;
// };
export const images:Record< Sport, ImageSourcePropType > = {
  football: require("@/assets/images/sport1.jpg"),
  basketball: require("@/assets/images/sport3.jpg"),
  cricket: require("@/assets/images/sport4.jpg"),
  tennis: require("@/assets/images/sport4.jpg"),
  badminton: require("@/assets/images/sport4.jpg"),
}

// const images = [
//   require("../assets/images/sport1.jpg"),
//   require("../assets/images/sport2.jpg"),
//   require("../assets/images/sport3.jpg"),
//   require("../assets/images/sport4.jpg"),
// ];
