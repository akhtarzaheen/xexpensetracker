import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import Chart from '../chart/chart';
import { Expenses } from '../Expenses/Expenses';
import  Transaction  from '../Transaction/Transaction';
import styles from './ExpenseTracker.module.css'
import ReactModal from 'react-modal';
import ModalContent from '../Modal/ModalContent';
import { useSnackbar } from 'notistack';
export default function ExpenseTracker() {
    let [balance,setBalance] = useState(parseInt(localStorage.getItem("balance")) >0 ? parseInt(localStorage.getItem("balance")) : 5000);
    const { enqueueSnackbar } = useSnackbar()
    let [isUpdateBalance,setIsUpdateBalance] = useState(false);
    let [totalPages,setTotalPages] = useState(1);
    let [currentPage,setCurrentPage] = useState(1);
    let [transactionList,setTransactionList] = useState([]);
    let [isDeleteClicked,setIsDeleteClicked] = useState(false);
    let [isUpdateExpense,setIsUpdateExpense] = useState(false);
    let [isClosed,setIsClosed] = useState(false);
    let [totalExpenses,setTotalExpenses] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    let[expenseToEdit,setExpenseToEdit] = useState({});
    let [isEditExpense,setIsEditExpense] = useState(false);
    useEffect(() => {
        let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
        let bal = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : false;
        if(!bal){
            localStorage.setItem("balance",JSON.stringify(5000))
        }
        let sum = 0;
        expenses.forEach((exp) => {
            sum = sum + exp.price;
        })
        setTotalExpenses(sum);
    },[])
    useEffect(() => {
      setBalance(parseInt(localStorage.getItem("balance")))
    }, [isUpdateBalance,balance]);
    useEffect(() => {
        let exp = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
        console.log('isEditExpense',isEditExpense)
        if(isUpdateExpense && !isDeleteClicked && !isEditExpense){
          if(exp.length>0){
          setTotalExpenses(totalExpenses + exp[exp.length-1].price);
          let updatedBalance = balance - exp[exp.length-1].price;
          localStorage.setItem("balance", JSON.stringify(updatedBalance));
          setBalance(updatedBalance);
          }
          setTransactionList(exp);
          let pages = Math.ceil(exp.length/4);
          setTotalPages(pages)
        }
        setIsDeleteClicked(false);
        setIsEditExpense(false);
    }, [isUpdateExpense]);

    useEffect(() => {
        if(isClosed){
            setIsUpdateExpense(false);
        }
        setIsClosed(false)
    },[isClosed])

  
    useEffect(() => {
        let exp = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
        if(exp.length>4){
            const itemsPerPage = 4;
            let pages = Math.ceil(exp.length/itemsPerPage);
            setTotalPages(pages)
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
        setTransactionList(exp.slice(startIndex, endIndex))
        }else{
            setTransactionList(exp);
        }
    },[currentPage])

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
    }

    const onEdit = (id) => {
        setIsEditExpense(true);
        let transaction = JSON.parse(localStorage.getItem("expenses"));
        transaction = transaction.filter(txn => txn.id == id);
        setExpenseToEdit(transaction[0]);
        setIsOpen(true);
    }

    const onDelete = (id) => {
        setIsDeleteClicked(true)
        let transaction = JSON.parse(localStorage.getItem("expenses"));
        if(!transaction || transaction?.length===0){
        enqueueSnackbar("No Transaction Yet",{
          variant: "error",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
          return;
        }
        if(transaction?.length>0){
            let deletedTran = transaction.filter(txn => txn.id == id);
            if(deletedTran.length>0){
                let updatedBalance = parseInt(balance) + parseInt(deletedTran[0].price);
                localStorage.setItem("balance", JSON.stringify(updatedBalance));
            }
          transaction = transaction.filter(txn => txn.id !== id);
          localStorage.setItem("expenses", JSON.stringify(transaction));
        }
    }

    useEffect(() => {
        if(isDeleteClicked){
        let transaction = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
        setTransactionList(transaction);
        let sum = 0;
          transaction.forEach((exp) => {
              sum = sum + exp.price;
          })
          setTotalExpenses(sum);
          setBalance(parseInt(localStorage.getItem("balance")))
          setIsUpdateExpense(!isUpdateExpense);
        }
    },  [isDeleteClicked])

    const onClose = () => {
        setIsOpen(false);
        
      };
    
  return (
    < >
        <h1 className={styles.textHeader}>Expense Tracker</h1>
        <div className={styles.trackerBox}>
            <div 
            className={styles.expenseWidthStyle}
            >
                <Card label="Wallet Balance" amount={balance ? balance : 5000} btnLabel="+ Add Income" isIncome={true} isExpense={false} setIsUpdateBalance={setIsUpdateBalance} setIsClosed={setIsClosed}/>
                
                <Card label="Expenses" amount={totalExpenses ? totalExpenses : 0} btnLabel="+ Add Expense" isExpense={true} isIncome={false} setIsUpdateExpense={setIsUpdateExpense} setIsClosed={setIsClosed}/>
                <div>
                    <Chart isUpdateExpense={isUpdateExpense}/>
                   
                </div>
            </div>
        </div>
        <div className={styles.transactionsBox}>
          
            <div style={{width:"60%",textAlign:"start"}}>
              
                  <Transaction transactions = {transactionList} currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} onEdit={onEdit} onDelete={onDelete}/>
            </div>
            <div style={{width:"40%",textAlign:"start"}}>
               <Expenses isUpdateExpense={isUpdateExpense}/>
            </div>
               <ReactModal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    contentLabel="Example Modal"
                    style={{
                      content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "12px",
                        padding: "20px",
                        background: "#fff",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                      },
                      overlay: {
                        backgroundColor: "rgba(0,0,0,0.4)",
                      },
                    }}
                  >
                    <ModalContent
                      onClose={onClose}
                      isIncome={false}
                      setIsUpdateBalance={setIsUpdateBalance}
                      setIsUpdateExpense={setIsUpdateExpense}
                      isExpense={true}
                      expenseToEdit={expenseToEdit}
                      setTransactionList={setTransactionList}
                    />
                  </ReactModal>
        </div>
    </>
  );
}