import React , {useEffect }from 'react';

import i18n, { changeLanguage } from "i18next";
import { useTranslation } from 'react-i18next';

import { 
  PieChart, 
  Pie, 
  Cell,Label,
  Legend
  } from 'recharts';


// const data = [
//   { name: 'Confirimity',value: 34 , fill:'#FFBA00' },
//   { name: 'Compliance', value: 40 , fill:'#6CA044'},
//   { name: 'Obedience', value: 26 , fill:'#A24F10'}
// ];

function PieChartCom ({responses}) {

  const { t } = useTranslation("translation", { keyPrefix: 'result.pie' } );

  useEffect(()=>{
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

  },[]);


  // Defining Type values 
  var confirimity = 0 ;
  var compilance  = 0 ;
  var obedience   = 0 ;

  //multiplying the Social Pressure in the option choosen
  const factor = 0.5 ;

  // Count the number of each option selected by the user with weight
  responses.forEach((option,index)=>{
    if (index>=0 && index<=12) {
      confirimity+=  1 *(2- ((option-1)*factor))   ;
    }
    else if (index>=13 && index<=21){
      compilance+=  1.44 *(2- ((option-1)*factor))   ;
    }
    else if (index>=22 && index<=25){
      obedience+=  3.25 *(2- ((option-1)*factor))   ;
    }
  }); 

  // converting Type Values in " % "
  const total = confirimity + compilance + obedience ;
  confirimity = Math.round((confirimity/total)*100);
  compilance  = Math.round((compilance/total)*100);
  obedience   = Math.round((obedience/total)*100);

  const data = [
    { name: t('label1'),value: confirimity , fill:'#FFBA00' },
    { name: t('label2'), value: compilance , fill:'#6CA044'},
    { name: t('label3'), value: obedience , fill:'#A24F10'}
  ];
  // console.log(data);
  
  return (
    <div style={{ textAlign: 'center' }}>
      <PieChart width={400} height={570}>
        <Pie
          data={data}
          dataKey="value"
          isAnimationActive={true}
          cx={200} cy={220}
          startAngle={90} endAngle={-270}
          outerRadius={195} innerRadius={75}
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.15;
            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

            return (
              <text
                x={x} y={y} fill="#000000"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                style={{ fontWeight: 'bold', fontSize: 30  }}
              >
                {`${data[index].value}%`}
              </text>
            );
          }}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Pie>
        <Legend
          iconSize={25}
          layout="vertical"
          verticalAlign="bottom"
          // align=""
          wrapperStyle={{ fontSize: 25 , fontWeight: 'bold'  }}
        />
      </PieChart>
    </div>
  );
}

export default PieChartCom ;





/************ Old Code with Data within the Component ************/

// import React from 'react';
// import { PieChart, Pie, Cell, Legend  } from 'recharts';

// const data = [
//   { name: 'Confirimity',value: 34 , fill:'#FFBA00' },
//   { name: 'Compliance', value: 40 , fill:'#6CA044'},
//   { name: 'Obedience', value: 26 , fill:'#A24F10'},
//   // { name: 'Testing Data', value: 1 , fill:'#FF8042'},
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// function PieChartCom () {
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <PieChart width={400} height={500}>
//         <Pie className='col'
//           dataKey="value"
//           isAnimationActive={true}
//           data={data}
//           cx={200} cy={200} startAngle={90} endAngle={-270}
//           outerRadius={140} innerRadius={75}
//           fill="#884d8" label
//         >
//            {/* {data.map((entry) => (
//              <Cell key={entry.name} fill={entry.color} />
//            ))} */}
//         </Pie>
//         <Legend 
//         iconSize={10}
//         layout="horizontal"
//         verticalAlign="bottom"
//         align="right"
//          />
//       </PieChart>
//     </div>
//   );
// };

// export default PieChartCom ;








// // import React from "react";
// // import { Pie } from "react-chartjs-2";
// // import { Chart as ChartJS } from "chart.js/auto";

// // function PieChart({ chartData }) {
// //   return <Pie data={chartData} />;
// // }

// // export default PieChart;
