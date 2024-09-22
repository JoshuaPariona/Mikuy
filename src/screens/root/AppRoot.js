import { Animated, View } from "react-native";
import React, { useContext, useRef, useState } from "react";

import Profile from "./profile/Profile";
import Home from "./home/Home";
import PagerView from "react-native-pager-view";

import tabs from "../../global/tabs";
import AppBar from "./components/AppBar";
import Notifier from "./components/Notifier";
import BottomNavBar from "./components/BottomNavBar";
import AnimatedFadeMountView from "../../components/animated/AnimatedFadeMountView";
import NotifierProvider from "../../context/NotifierProvider";
import BottomSheetProvider, {
  BottomSheetContext,
} from "../../context/BottomSheetProvider";
import BottomSheet from "../../components/BottomSheet";
import MarkedRecipes from "./marked/MarkedRecipes";
import CookBook from "./cookbook/CookBook";
import ComingSoonModal from "../../components/ComingSoonModal";
import SearchInputProvider from "../../context/SearchInputProvider";

const AppRoot = () => {
  const renderTab = (routeName, tabNavigator, scrollOffsetY) => {
    switch (routeName) {
      case "cookbook":
        return <CookBook key={routeName} />;
      case "home":
        return (
          <Home
            key={routeName}
            scrollOffsetY={scrollOffsetY}
            tabNavigator={tabNavigator}
          />
        );
      case "bookmarks":
        return <MarkedRecipes key={routeName} />;
      case "profile":
        return <Profile key={routeName} />;
      default:
        return (
          <View
            key={routeName}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ComingSoonModal />
          </View>
        );
    }
  };

  return (
    <AnimatedFadeMountView delay={250} style={{ flex: 1 }}>
      <NotifierProvider>
        <BottomSheetProvider>
          <SearchInputProvider>
            <CustomTabNavigator
              tabs={tabs}
              initialRoute={"home"}
              renderTab={renderTab}
            />
          </SearchInputProvider>
        </BottomSheetProvider>
      </NotifierProvider>
    </AnimatedFadeMountView>
  );
};

const CustomTabNavigator = ({ tabs, initialRoute, renderTab }) => {
  const getPageIndex = (routeName) => {
    const pageIndex = tabs.findIndex((item) => item.routeName == routeName);
    return pageIndex === -1 ? 0 : pageIndex;
  };

  const [currentPageIndex, setCurrentPageIndex] = useState(
    getPageIndex(initialRoute)
  );
  const pager = useRef(null);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { sheetContent, bottomSheetRef } = useContext(BottomSheetContext);

  const tabNavigator = {
    slideTo: (routeName) => {
      pager.current.setPage(getPageIndex(routeName));
    },
    slideToIndex: (index) => {
      pager.current.setPage(index);
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        tabNavigator={tabNavigator}
        pageIndex={currentPageIndex}
        tabs={tabs}
        scrollOffsetY={scrollOffsetY}
      />
      <PagerView
        ref={pager}
        overScrollMode={"never"}
        style={{ flex: 1, width: "100%" }}
        onPageSelected={(event) =>
          setCurrentPageIndex(event.nativeEvent.position | 0)
        }
        initialPage={currentPageIndex}
      >
        {tabs.map((item) =>
          renderTab(item.routeName, tabNavigator, scrollOffsetY)
        )}
      </PagerView>
      <Notifier />
      <BottomNavBar
        tabNavigator={tabNavigator}
        pageIndex={currentPageIndex}
        tabs={tabs}
      />
      <BottomSheet ref={bottomSheetRef}>{sheetContent}</BottomSheet>
    </View>
  );
};

export default AppRoot;
