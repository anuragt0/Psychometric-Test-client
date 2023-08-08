import React from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';


// const data = [
//   { name:'Max',uv:100, pv: 2400, fill:'#ffffff' }, // Maximum Possible  value
//   { name: 'A', uv: 8 , pv: 9800, fill: '#213766' },
//   { name: 'B', uv: 18, pv: 3908, fill: '#ff5286' },
//   { name: 'C', uv: 30, pv: 4800, fill: '#753ba4' },
//   { name: 'D', uv: 45, pv: 4800, fill: '#547835' },
//   { name: 'E', uv: 62, pv: 4800, fill: '#d78c00' },
//   { name: 'F', uv: 74, pv: 4800, fill: '#df6000' },
// ];

function RadialBarChartComponent({ responses }) {



  const rawData = [
    {
      name: 'Affected by group size or unanimity?',
      score: ((8 - (responses[1-1]-1)*2) + (8 - (responses[2-1]-1)*2)) , 
    },
    {
      name: 'Affected by cohesion or status of others?',
      score: ((8 - (responses[3-1]-1)*2) + (8 - (responses[4-1]-1)*2)), 
    },
    {
      name: 'Affected by Reciprocity?',
      score: ((8 - (responses[15-1]-1)*2) + (8 - (responses[16-1]-1)*2)), 
    },
    {
      name: 'Affected by Commitment and Consistency?',
      score: ((8 - (responses[17-1]-1)*2) + (8 - (responses[18-1]-1)*2)), 
    },
    {
      name: 'Affected by Scarcity?',
      score: ((8 - (responses[21-1]-1)*2) + (8 - (responses[22-1]-1)*2)), 
    },
    { name: 'Affected by Authority/ commands ?', 
      score: ((8 - (responses[25-1]-1)*2) + (8 - (responses[26-1]-1)*2)),  },

    { name: 'Max', score: 18.2 }, // Maximum Possible  value
  ];


  const sortedData = rawData.sort((a, b) => a.score - b.score);

  const colorArray = [
    { fill: '#213766' },
    { fill: '#ff5286' },
    { fill: '#753ba4' },
    { fill: '#547835' },
    { fill: '#d78c00' },
    { fill: '#df6000' },
    { fill: '#f7f7f7' },
  ];

  sortedData.forEach((data, index) => {
    sortedData[index].fill = colorArray[index].fill;
  });

// console.log(sortedData);


  return (
    <RadialBarChart
      width={400} height={570} //size of div
      cx={200} cy={190} // coordinates of origin or centre
      innerRadius={40} outerRadius={220}
      startAngle={90} endAngle={-270} data={sortedData} barSize={50}

    >
      <RadialBar
        background
        dataKey="score"
      />
      <Legend 
        iconSize={15} 
        layout="vertical" 
        verticalAlign="bottom" 
        align="centre" 
        wrapperStyle={{ paddingLeft: '40px' }} // Add padding here
      />
    </RadialBarChart>
  );
};

export default RadialBarChartComponent;




/************ Old Code with Data within the Component ************/

// import React from 'react';
// import { RadialBarChart, RadialBar, Legend } from 'recharts';

// const data = [
//   { name:'Max',uv:100, pv: 2400, fill:'#ffffff' }, // Maximum Possible  value
//   { name: 'A', uv: 8 , pv: 9800, fill: '#213766' },
//   { name: 'B', uv: 18, pv: 3908, fill: '#ff5286' },
//   { name: 'C', uv: 30, pv: 4800, fill: '#753ba4' },
//   { name: 'D', uv: 45, pv: 4800, fill: '#547835' },
//   { name: 'E', uv: 62, pv: 4800, fill: '#d78c00' },
//   { name: 'F', uv: 74, pv: 4800, fill: '#df6000' },
// ];

// function RadialBarChartComponent  () {
//   return (
//     <RadialBarChart 
//         width={400} height={400} //size of div
//         cx={200} cy={230} // coordinates of origin or centre
//         innerRadius={15} outerRadius={170} 
//         startAngle={90} endAngle={-270} data={data} barSize={50} >
//       <RadialBar
//         background
//         dataKey="uv"
//       />
//       {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" /> */}
//     </RadialBarChart>
//   );
// };

// export default RadialBarChartComponent;
