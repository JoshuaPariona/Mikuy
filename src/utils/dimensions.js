import { Platform, StatusBar } from "react-native"

const statusbar = Platform.select(
  {
    web: 20,
    android: StatusBar.currentHeight + 10,
    ios: 35
  }
)

export const dimensions = {
  statusbar: statusbar,

  bottomNavBarHeight: 70,

  fontSizeTitle: 18,
  fontSizeSubTitle: 14,
  fontSizeSmall: 12,
  fontSizeXSmall: 9,

  iconSize: 24,
  smallIconSize: 14,

  circleAvatarSizeLarge: 70,
  circleAvatarSize: 40,

  layoutHorizontalPadding: 30,
  layoutVerticalPadding: 20,
  layoutVerticalGap: 40,
  layoutHorizontalGap: 20,
  layoutBorderRadius: 30,

  sectionVerticalGap: 20,
  sectionHorizontalGap: 15,
  sectionBorderRadius: 10,

  subSectionVerticalGap: 10,
  subSectionHorizontalGap: 10,

  dishCard1H: 140,
  dishCard1W: 180,

  dishCard2H: 180,
  dishCard2W: 150,
}