import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = (props) => {
  const leavData = props.data;
  const ls = {
    Pending: leavData.filter((val) => val.status === "Pending").length,
    Rejected: leavData.filter((val) => val.status === "Rejected").length,
    Accepted: leavData.filter((val) => val.status === "Accepted").length,
    Cancelled: leavData.filter((val) => val.status === "Cancelled").length,
  };

  const data = [
    {
      id: "Pending",
      label: "Pending",
      value: ls["Pending"],
    },
    {
      id: "Cancelled",
      label: "Cancelled",
      value: ls["Cancelled"],
    },
    {
      id: "Accepted",
      label: "Accepted",
      value: ls["Accepted"],
    },
    {
      id: "Rejected",
      label: "Rejected",
      value: ls["Rejected"],
    },
  ];

  return (
    <div className="w-[65vw] h-[65vh]">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={{ scheme: 'category10' }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="yellow"
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor='white'
        // defs={[
        //   {
        //     id: "dots",
        //     type: "patternDots",
        //     background: "inherit",
        //     color: "rgba(255, 255, 255, 0.3)",
        //     size: 4,
        //     padding: 1,
        //     stagger: true,
        //   },
        //   {
        //     id: "lines",
        //     type: "patternLines",
        //     background: "inherit",
        //     color: "rgba(255, 255, 255, 0.3)",
        //     rotation: -45,
        //     lineWidth: 6,
        //     spacing: 10,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: "ruby",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "c",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "go",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "python",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "scala",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "lisp",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "elixir",
        //     },
        //     id: "lines",
        //   },
        //   {
        //     match: {
        //       id: "javascript",
        //     },
        //     id: "lines",
        //   },
        // ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 20,
            itemTextColor: "yellow",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
