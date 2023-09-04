import React, { useEffect } from 'react';

import i18n, { changeLanguage } from "i18next";
import { useTranslation } from 'react-i18next';


import {
  XAxis,
  YAxis,
  CartesianGrid,
  // Line,
  Label, LabelList,
  Scatter,
  ScatterChart,
  ReferenceLine,
  ReferenceArea,
  // Rectangle
} from 'recharts';
// import { BsAspectRatio } from 'react-icons/bs';


// Option A : Ideal Normative	
// Option B: Friendly Follower		
// Option C: Information Driven		
// Option D: Individualist Rebellion	


// "label1": "Q1: Information Driven",
// "label2": "Q2: Ideal Normative",
// "label3": "Q3: Friendly Follower",
// "label4": "Q4: Individualist Rebellion",

const Graph = ({ responses, onGraphData }) => {

  useEffect(() => {
    // Simulated personality name for demonstration
    var personalityName = '';

    if (maxOption == 1) personalityName = 'Ideal_Normative';
    else if (maxOption == 2) personalityName = 'Friendly_Follower'
    else if (maxOption == 3) personalityName = 'Information_Driven'
    else if (maxOption == 4) personalityName = 'Individualist_Rebellion'

    // Call the parent's callback function with the personality name
    onGraphData(personalityName);
  }, [onGraphData]);


  const { t } = useTranslation("translation", { keyPrefix: 'result.graph' });

  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

  }, []);

  const data = [
    { x: 3.00, y: 7.00, name: t('label1'), fill: '#be8440' },    // option C 
    { x: 7.75, y: 9.00, name: t('label2'), fill: '#96b159' },    // option A 
    { x: 7.00, y: 3.00, name: t('label3'), fill: '#2369b1' },    // option B
    { x: 1.00, y: 1.00, name: t('label4'), fill: '#e52409' },    // option D
  ];

  const optionCount = [0, 0, 0, 0]; // Array to store the count of each option
  // console.log(responses);

  // Count the number of each option selected
  responses.forEach((option) => {
    optionCount[option - 1]++;
  });

  // Find the option selected the maximum number of times
  const maxOptionIndex = optionCount.indexOf(Math.max(...optionCount));
  const maxOption = maxOptionIndex + 1;
  // console.log(optionCount);
  // console.log(maxOption);
  // const maxOption =4 ;

  return (

    <ScatterChart width={400} height={570} margin={{ top: 25, right: 10, bottom: 25, left: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
      <XAxis type="number" dataKey="x" domain={[0, 10]} tickCount={6}>
        <Label value={t('Xaxis_label')} position="bottom" offset={-7} />
      </XAxis>
      <YAxis type="number" dataKey="y" domain={[0, 10]} tickCount={11}>
        <Label value={t('Yaxis_label')} angle={-90} position="insideLeft bottom" offset={25} />
      </YAxis>
      <Scatter data={data} fill={data.fill}>
        {data.map((point, index) => (
          <ReferenceLine key={index} x={point.x} y={point.y} stroke="#ccc" strokeDasharray="3 3" />

        ))}
        <LabelList
          dataKey="name"
          position="right"
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            letterSpacing: '-0.75px',
          }}
        />

      </Scatter>
      <ReferenceLine y={5} stroke="#f8bb1e" strokeWidth={4} />
      <ReferenceLine x={5} stroke="#6b7dab" strokeWidth={4} />

      //! for Single Quadrant
      {/* Creating the rectangles with dotted border */}

      {maxOption === 1 ?
        <ReferenceArea
          x1={5 + 0.09} y1={5 + 0.09}
          x2={10 - 0.09} y2={10 - 0.09}
          stroke="dotted"
          strokeOpacity={0.7}
          fill="#6b7dab"
          fillOpacity={0.3}
        /> : <></>}

      {maxOption === 2 ?
        <ReferenceArea
          x1={5 + 0.09} y1={0 + 0.09}
          x2={10 - 0.09} y2={5 - 0.09}
          stroke="dotted"
          strokeOpacity={0.7}
          fill="#6b7dab"
          fillOpacity={0.3}
        /> : <></>}

      {maxOption === 3 ?
        <ReferenceArea
          x1={0 + 0.09} y1={5 + 0.09}
          x2={5 - 0.09} y2={10 - 0.09}
          stroke="dotted"
          strokeOpacity={0.7}
          fill="#6b7dab"
          fillOpacity={0.3}
        /> : <></>}

      {maxOption === 4 ?
        <ReferenceArea
          x1={0 + 0.09} y1={0 + 0.09}
          x2={5 - 0.09} y2={5 - 0.09}
          stroke="dotted"
          strokeOpacity={0.7}
          fill="#6b7dab"
          fillOpacity={0.3}
        /> : <></>}








        //! for all the quadrant

      {/* Creating the rectangles with dotted border */}


      {/* <ReferenceArea
        x1={0+0.09} y1={5+0.09}
        x2={5-0.09} y2={10-0.09}
        stroke="dotted"
        strokeOpacity={0.7}
        fill={maxOption === 1 ? "#800080" : "#6b7dab"}
        fillOpacity={0.3}
        />
        
        <ReferenceArea
        x1={5+0.09} y1={5+0.09}
        x2={10-0.09} y2={10-0.09}
        stroke="dotted"
        strokeOpacity={0.7}
        fill={maxOption === 2 ? "#800080" : "#6b7dab"}
        fillOpacity={0.3}
        />

        <ReferenceArea
        x1={5+0.09} y1={0+0.09}
        x2={10-0.09} y2={5-0.09}
        stroke="dotted"
        strokeOpacity={0.7}
        fill={maxOption === 3 ? "#800080" : "#6b7dab"}
        fillOpacity={0.3}
        />

        <ReferenceArea
        x1={0+0.09} y1={0+0.09}
        x2={5-0.09} y2={5-0.09}
        stroke="dotted"
        strokeOpacity={0.7}
        fill={maxOption === 4 ? "#800080" : "#6b7dab"}
        fillOpacity={0.3}
        /> */}





    </ScatterChart>


  );
};

export default Graph;