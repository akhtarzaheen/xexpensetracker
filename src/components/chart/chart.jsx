import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell,Legend } from "recharts";



const COLORS = [ "#A000FF", "#FF9304", "#FDE006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);



  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

 const Chart = ({isUpdateExpense}) =>  {
  let [chartdata,setChartData] = useState([]);
  useEffect(() => {
    let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
const categories = ["food", "entertainment", "travel"];
const summary = categories.map((cat) => {
  const total = expenses
    .filter(e => e.category.toLowerCase() === cat.toLowerCase())
    .reduce((sum, e) => sum + Number(e.price), 0);
  return { name: cat, value: total };
});

setChartData(summary);
  },[isUpdateExpense])
  let demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
  const style = {
    top: '75%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
    color:'white'
  };
    return (
    <>
    <PieChart width={400} height={400}>
    <Pie
      data={chartdata}
      cx={200}
      cy={200}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {chartdata.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend iconSize={20} iconType="rect" layout="horizontal" wrapperStyle={style} />

  </PieChart>
  </>
    );
}

export default Chart;


