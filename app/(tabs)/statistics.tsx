import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import Header from "@/components/Header";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BarChart } from "react-native-gifted-charts";

//4.37

const barData = [
  {
    value: 40,
    label: "Mon",
    spacing: scale(4),
    labelWidth: scale(30),
    frontColor: colors.primary,
    // topLabelComponent: () => (
    //   <Typo size={10} style={{ marginBottom: 4 }}>
    //     50
    //   </Typo>
    // ),
  },
  {
    value: 20,
    frontColor: colors.rose,
  },
  { value: 40, frontColor: colors.rose },
  {
    value: 50,
    label: "Tue",
    spacing: scale(4),
    labelWidth: scale(30),
    frontColor: colors.primary,
  },
  {
    value: 40,
    frontColor: colors.rose,
  },
  {
    value: 75,
    label: "Wed",
    spacing: scale(4),
    labelWidth: scale(30),
    frontColor: colors.primary,
  },
  {
    value: 25,
    frontColor: colors.rose,
  },
  {
    value: 30,
    label: "Thu",
    spacing: scale(4),
    labelWidth: scale(30),
    frontColor: colors.primary,
  },
  {
    value: 20,
    frontColor: colors.rose,
  },
  {
    value: 60,
    label: "Fri",
    spacing: scale(4),
    labelWidth: scale(30),
    frontColor: colors.primary,
  },
  {
    value: 40,
    frontColor: colors.rose,
  },
  {
    value: 65,
    label: "Sat",
    spacing: scale(4),
    labelWidth: scale(30),
    frontColor: colors.primary,
  },
  { value: 30, frontColor: colors.rose },
  {
    value: 65,
    label: "Sun",
    spacing: scale(4),
    labelWidth: scale(30),
    frontColor: colors.primary,
  },
  { value: 30, frontColor: colors.rose },
  // {
  //   value: 65,
  //   label: "Sun",
  //   spacing: scale(4),
  //   labelWidth: scale(30),
  //   frontColor: colors.primary,
  // },
  // { value: 30, frontColor: colors.rose },
];
//9.00
const Statistics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState(barData);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title="Statistics" />
        </View>
        <ScrollView
          contentContainerStyle={{
            gap: spacingY._20,
            paddingTop: spacingY._5,
            paddingBottom: verticalScale(100),
          }}
          showsVerticalScrollIndicator={false}
        >
          <SegmentedControl
            values={["Weekly", "Monthly", "Yearly"]}
            selectedIndex={activeIndex}
            onChange={(event) => {
              setActiveIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            tintColor={colors.neutral200}
            backgroundColor={colors.neutral800}
            appearance="dark"
            activeFontStyle={styles.segmentFontStyle}
            style={styles.segmentStyle}
            fontStyle={{ ...styles.segmentFontStyle, color: colors.white }}
          />
          <View style={styles.chartContainer}>
            {chartData.length > 0 ? (
              <BarChart
                data={chartData}
                barWidth={scale(12)}
                spacing={scale(25)}
                roundedTop
                roundedBottom
                hideRules
                yAxisLabelPrefix="$"
                yAxisThickness={0}
                xAxisThickness={0}
              />
            ) : (
              <View style={styles.noChart} />
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  chartContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  chartLoadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: radius._12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  header: {},
  noChart: {
    backgroundColor: "rgba(0,0,0,0.6)",
    height: verticalScale(210),
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: verticalScale(35),
    width: verticalScale(35),
    borderCurve: "continuous",
  },
  segmentStyle: {
    height: scale(37),
  },
  segmentFontStyle: {
    fontSize: verticalScale(13),
    fontWeight: "bold",
    color: colors.black,
  },
  container: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._5,
    gap: spacingY._10,
  },
});
