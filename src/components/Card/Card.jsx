import { useEffect, useState } from "react";
import ModalContent from "../Modal/ModalContent";
import styles from "./Card.module.css";
import ReactModal from "react-modal";

export const Card = ({ label, amount, btnLabel, isIncome, isExpense,setIsUpdateBalance,setIsUpdateExpense,setIsClosed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setIsClosed(true)
  };
  return (
    <div className={styles.balanceBox}>
      <span className={styles.labelAmount}>
        {label}:{" "}
        <span className={isIncome ? styles.amount : styles.expense}>
          {" "}
          &#8377;{amount}
        </span>
      </span>
      <button
        type="button"
        className={styles.addIncomeBtn}
        onClick={() => setIsOpen(true)}
      >+ Add Income</button>
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
          isIncome={isIncome}
          setIsUpdateBalance={setIsUpdateBalance}
          setIsUpdateExpense={setIsUpdateExpense}
          isExpense={isExpense}
        />
      </ReactModal>
    </div>
  );
};
