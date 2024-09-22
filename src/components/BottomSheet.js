import { StyleSheet, View, PanResponder, Animated, Easing } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { colors } from "../themes/colors";
import AnimatedOpacityView from "./animated/AnimatedOpacityView";
import PropTypes from "prop-types";

const BottomSheet = forwardRef(({ children, style, dragIcon }, ref) => {
  const [loading, setLoading] = useState(true);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const [openSheet, setOpenSheet] = useState(false);

  const y = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(null);

  useEffect(() => {
    if (bottomSheetHeight > 0) {
      Animated.timing(y, {
        toValue: openSheet ? 0 : bottomSheetHeight,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setLoading(false));
      panResponder.current = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          const newY = Math.max(gestureState.dy, 0);
          Animated.event([null, { dy: y }], {
            useNativeDriver: false,
          })(e, { dy: newY });
        },
        onPanResponderRelease: (e, gestureState) => {
          gestureState.dy > bottomSheetHeight * 0.5 ? close() : open();
        },
      });
    }
  }, [bottomSheetHeight]);

  const open = () => {
    setOpenSheet(true);
    Animated.timing(y, {
      toValue: 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    setOpenSheet(false);
    Animated.timing(y, {
      toValue: bottomSheetHeight,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  //TODO: intercept back navigation and execute bottomSheet closing

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const onBottomSheetLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setBottomSheetHeight(height);
  };

  return (
    <>
      <AnimatedOpacityView
        style={{
          ...styles.overlay,
          pointerEvents: openSheet ? "auto" : "none",
        }}
        toggle={openSheet}
      >
        <View style={{ flex: 1 }} onTouchEnd={() => close()} />
      </AnimatedOpacityView>

      <Animated.View
        style={[
          style || styles.defaultBottomSheet,
          styles.bottomSheet,
          {
            transform: [{ translateY: y }],
          },
          {
            opacity: loading ? 0 : 1,
          },
        ]}
        onLayout={onBottomSheetLayout}
      >
        <View
          {...panResponder.current?.panHandlers}
          style={{ padding: 8, width: 100, alignItems: "center" }}
        >
          {dragIcon || <View style={styles.dragIcon} />}
        </View>
        {children}
      </Animated.View>
    </>
  );
});

BottomSheet.propTypes = {
  children: PropTypes.node,
  dragIcon: PropTypes.node,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  defaultBottomSheet: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    backgroundColor: colors.tertiary,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    maxHeight: "100%",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(41, 41, 41, 0.65)",
  },
  dragIcon: {
    height: 5,
    width: 60,
    backgroundColor: colors.onTertiary,
    borderRadius: 5,
  },
});

export default BottomSheet;
