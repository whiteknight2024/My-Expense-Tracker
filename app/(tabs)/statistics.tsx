import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import Header from "@/components/Header";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BarChart } from "react-native-gifted-charts";
import Loading from "@/components/Loading";

const Statistics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartData, setChartData] = useState([
    {
      value: 40,
      label: "Mon",
      spacing: scale(10), // Increase spacing
      labelWidth: scale(50), // Increase label width
      frontColor: colors.primary,
    },
    { value: 40, frontColor: colors.rose },
    {
      value: 50,
      label: "Tue",
      spacing: scale(10), // Increase spacing
      labelWidth: scale(50), // Increase label width
      frontColor: colors.primary,
    },
    { value: 40, frontColor: colors.rose },
    {
      value: 75,
      label: "Wed",
      spacing: scale(10), // Increase spacing
      labelWidth: scale(50), // Increase label width
      frontColor: colors.primary,
    },
    { value: 25, frontColor: colors.rose },
    {
      value: 30,
      label: "Thu",
      spacing: scale(10), // Increase spacing
      labelWidth: scale(50), // Increase label width
      frontColor: colors.primary,
    },
    { value: 20, frontColor: colors.rose },
    {
      value: 60,
      label: "Fri",
      spacing: scale(10), // Increase spacing
      labelWidth: scale(50), // Increase label width
      frontColor: colors.primary,
    },
    { value: 40, frontColor: colors.rose },
    {
      value: 65,
      label: "Sat",
      spacing: scale(10), // Increase spacing
      labelWidth: scale(50), // Increase label width
      frontColor: colors.primary,
    },
    { value: 30, frontColor: colors.rose },
    {
      value: 65,
      label: "Sun",
      spacing: scale(10), // Increase spacing
      labelWidth: scale(50), // Increase label width
      frontColor: colors.primary,
    },
    { value: 30, frontColor: colors.rose },
  ]);

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
          {/* 14.27 */}
          <View style={styles.chartContainer}>
            {chartData.length > 0 ? (
              <BarChart
                data={chartData}
                barWidth={scale(12)}
                spacing={[1, 2].includes(activeIndex) ? scale(25) : scale(16)}
                roundedTop
                roundedBottom
                hideRules
                yAxisLabelPrefix="$"
                yAxisThickness={0}
                xAxisThickness={0}
                //yAxisLabelWidth={scale(40)}
                yAxisLabelWidth={
                  [1, 2].includes(activeIndex) ? scale(38) : scale(35)
                }
                yAxisTextStyle={{ color: colors.neutral350 }}
                xAxisLabelTextStyle={{
                  color: colors.neutral350,
                  fontsize: verticalScale(12),
                }}
                noOfSections={3}
                minHeight={5}
                //isAnimated={true}
                //animationDuration={1000}
              />
            ) : (
              <View style={styles.noChart} />
            )}

            {chartLoading && (
              <View style={styles.chartLoadingContainer}>
                <Loading color={colors.white} />
              </View>
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
