import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = (props) => {

  const leaveData = props.data;

  const monthsData = 
  {
    January: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 1)
      {
       return val
      }}),
    February: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 2)
      {
       return val
      }}),
    March: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 3)
      {
       return val
      }}),
    April: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 4)
      {
       return val
      }}),
    May: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 5)
      {
       return val
      }}),
    June: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 6)
      {
       return val
      }}),
    July: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 7)
      {
       return val
      }}),
    August: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 8)
      {
       return val
      }}),
    Sepetember: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 9)
      {
       return val
      }}),
    October: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 10)
      {
       return val
      }}),
    November: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 11)
      {
       return val
      }}),
    December: leaveData.filter((val)=>{ 
      const fullDate = new Date(val.createdAt);
      const d = fullDate.getMonth()+1;
      if(d === 12)
      {
       return val
      }}),
    // April: leaveData.filter((val)=>{ 
    //   const fullDate = new Date(val.createdAt);
    //   const d = fullDate.getMonth()+1;
    //   if(d === 4)
    //   {
    //    return val
    //   }}),
  };

  const data = [
    {
      "months": "January",
      "Pending":(monthsData["January"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["January"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["January"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["January"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "February",
      "Pending":(monthsData["February"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["February"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["February"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["February"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "March",
      "Pending":(monthsData["March"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["March"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["March"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["March"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "April",
      "Pending":(monthsData["April"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["April"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["April"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["April"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "May",
      "Pending":(monthsData["May"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["May"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["May"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["May"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "June",
      "Pending":(monthsData["June"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["June"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["June"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["June"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "July",
      "Pending":(monthsData["July"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["July"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["July"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["July"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "August",
      "Pending":(monthsData["August"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["August"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["August"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["August"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "Sepetember",
      "Pending":(monthsData["Sepetember"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["Sepetember"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["Sepetember"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["Sepetember"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "October",
      "Pending":(monthsData["October"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["October"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["October"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["October"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "November",
      "Pending":(monthsData["November"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["November"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["November"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["November"].filter((val) => val.status === "Accepted")).length,
    },
    {
      "months": "December",
      "Pending":(monthsData["December"].filter((val) => val.status === "Pending")).length,
      "Cancelled":(monthsData["December"].filter((val) => val.status === "Cancelled")).length,
      "Rejected":(monthsData["December"].filter((val) => val.status === "Rejected")).length,
      "Accepted":(monthsData["December"].filter((val) => val.status === "Accepted")).length,
    },
  ];


  return (
    <div className="w-[65vw] h-[65vh]">
      <ResponsiveBar
        data={data}
        keys={["Pending", "Accepted", "Rejected", "Cancelled"]}
        indexBy="months"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: 'nivo' }}
        // defs={[
        //   {
        //     id: "dots",
        //     type: "patternDots",
        //     background: "inherit",
        //     color: "#38bcb2",
        //     size: 4,
        //     padding: 1,
        //     stagger: true,
        //   },
        //   {
        //     id: "lines",
        //     type: "patternLines",
        //     background: "inherit",
        //     color: "#eed312",
        //     rotation: -45,
        //     lineWidth: 6,
        //     spacing: 10,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: "fries",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "sandwich",
        //     },
        //     id: "lines",
        //   },
        // ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "months",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "leaves",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor='black'
        // labelTextColor={{
        //   from: "color",
        //   modifiers: [["darker", 1.6]],
        // }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in months: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default BarChart;
