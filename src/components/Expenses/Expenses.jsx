import { useEffect, useState } from "react";
import { BarChartExpense } from "../BarChart/BarChartExpense";
import styles from "./Expenses.module.css";
export const Expenses = ({isUpdateExpense}) => {
     let [chartdata,setChartData] = useState([]);
      useEffect(() => {
        let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
    const categories = ["Food", "Entertainment", "Travel"];
    const summary = categories.map((cat) => {
      const total = expenses
        .filter(e => e.category.toLowerCase() === cat.toLowerCase())
        .reduce((sum, e) => sum + Number(e.price), 0);
      return { name: cat, uv: total };
    });
    
    setChartData(summary);
      },[isUpdateExpense])
    return (
        <>
         <h2 className={styles.textHeader}>Top Expenses</h2>
                <div className={styles.expenseTable}>
            <BarChartExpense data={chartdata}/>
</div>
        </>
    )
}