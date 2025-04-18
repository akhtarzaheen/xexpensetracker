import React, { useEffect } from "react";
import style from "./Modal.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from "notistack";

const initialState = {
  id:"",
  title: "",
  price: 0,
  category: "",
  date: "",
};

export default function ModalContent({ onClose, isIncome, isExpense,setIsUpdateBalance,setIsUpdateExpense,expenseToEdit,setTransactionList }) {
  let [expenseDetails, setExpenseDetails] = React.useState(expenseToEdit ? expenseToEdit : initialState);
  let [transactionDetails, setTransactionDetails] = React.useState([]);
   const { enqueueSnackbar } = useSnackbar()
  let [balance,setBalance] = React.useState();
  
  useEffect(() => {

  },[balance])
  const handleExpense = (e) => {
    let { name, value } = e.target;
    if(name === "title"){
      setExpenseDetails({ ...expenseDetails, title: value });
    }
    if(name === "price"){
      setExpenseDetails({ ...expenseDetails, price: parseInt(value) });
    }
    if(name === "category"){
      setExpenseDetails({ ...expenseDetails, category: value });
    }
    if(name === "date"){
      setExpenseDetails({ ...expenseDetails, date: value });
    }
  }
  const onSubmitExpense = () => {
    if(expenseDetails.price>balance){
      enqueueSnackbar("Insufficient Balance",{
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
      return;
    }
    if(expenseDetails.title === ""){
      enqueueSnackbar("Title is required",{
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
      return;
    }
    if(expenseDetails.price === 0||expenseDetails.price === ""){
      enqueueSnackbar("Price is required",{
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
      return;
    }
    if(expenseDetails.category === ""){
      enqueueSnackbar("Category is required",{
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
      return;
    } 
    if(expenseDetails.date === ""){
      enqueueSnackbar("Date is required",{
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
      return;
    }
    let transaction = JSON.parse(localStorage.getItem("expenses"));
    if(!transaction || transaction?.length===0){
      expenseDetails.id = uuidv4();
      setTransactionDetails([expenseDetails]);
      localStorage.setItem("expenses", JSON.stringify([expenseDetails]));
    }else{
      if(transaction?.length>0){
        expenseDetails.id = uuidv4();
        transaction.push(expenseDetails);
      localStorage.setItem("expenses", JSON.stringify(transaction));
      }
    }
    setIsUpdateExpense(true);
    setExpenseDetails(initialState);    
    onClose();
  };

  const onEditExpense = () => {
    if(expenseDetails.price>balance){
      alert('Insufficient Balance');
      return;
    }
    if(expenseDetails.title === ""){
      alert('Title is required');
      return;
    }
    if(expenseDetails.price === 0||expenseDetails.price === ""){
      alert('Price is required');
      return;
    }
    if(expenseDetails.category === ""){
      alert('Category is required');
      return;
    } 
    if(expenseDetails.date === ""){
      alert('Date is required');
      return;
    }
    let transaction = JSON.parse(localStorage.getItem("expenses"));
    const updatedExpenses = transaction.map((item) =>
      item.id === expenseDetails.id ? { ...item, price: expenseDetails.price,
        title:expenseDetails.title,
        category:expenseDetails.category,
        date:expenseDetails.date
      } : item
    );
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setTransactionList(updatedExpenses);
    setIsUpdateExpense(true);
    setExpenseDetails(initialState);    
    onClose();
  }
  const onBalanceChange = (e) => {
  
    let { value } = e.target;
    setBalance(parseInt(value));
  };
  const onSubmitBalance = () => {
    let availableBalance = parseInt(localStorage.getItem("balance"));
    if(balance === 0 || balance === ""){
      enqueueSnackbar("Balance cannot be zero or null",{
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
      return;
    }
    if(availableBalance && availableBalance>0){
      setBalance(availableBalance + balance);
      localStorage.setItem("balance", JSON.stringify(availableBalance + balance));
    }else{
      setBalance(5000 +balance);
      localStorage.setItem("balance", JSON.stringify(5000 + balance));
    }
    setIsUpdateBalance(true);
    onClose();
  };
  return (
    <div>
      {isExpense && (
        <>
          <h2 className={style.modal_title}>{expenseToEdit ? "Edit Expenses":"Add Expenses"}</h2>
          <div className={style.modal_form}>
            <input
              type="text"
              name="title"
              value={expenseDetails.title}
              placeholder="Title"
              className={style.modal_input}
              onChange={handleExpense}
            />
            <input
              type="number"
              name="price"
              value={expenseDetails.price}
              placeholder="Price"
              className={style.modal_input}
              onChange={handleExpense}
            />
            <select name="category" value={expenseDetails.category? expenseDetails.category : ""} className={style.modal_input} onChange={handleExpense}>
              <option value="" selected disabled>
                Select Category
              </option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
            </select>
            <input
              type="date"
              name="date"
              placeholder="dd/mm/yyyy"
              className={style.modal_input}
              value={expenseDetails.date}
              onChange={handleExpense}
            />
          </div>
          <div className={style.modal_actions}>
            <button
              type="submit"
              className={style.btn_add}
              onClick={expenseToEdit ? onEditExpense : onSubmitExpense}
            >Add Expense</button>
            <button className={style.btn_cancel} onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}
      {isIncome && (
        <>
          <h2 className={style.modal_title}>Add Balance</h2>
          <div className={style.modal_form_balance}>
            <input
              type="number"
              placeholder="Income Amount"
              className={style.modal_input}
              value={balance}
              onChange={onBalanceChange}
            />
            <button
              type="submit"
              className={style.btn_add_balance}
              onClick={onSubmitBalance}
            >Add Balance</button>
            <button className={style.btn_cancel} onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
