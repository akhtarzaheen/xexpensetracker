import React from "react";
import styles from "./Transaction.module.css";
import { FaWifi, FaGift, FaCarSide } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const iconMap = {
  food: <FaWifi />,
  entertainment: <FaGift />,
  travel: <FaCarSide />,
};

const Transaction = ({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const handleNextPageChange = () => {
    onPageChange(currentPage + 1);
  };
  const handlePrevPageChange = () => {
    onPageChange(currentPage - 1);
  };
  return (
    <>
      <h2 className={styles.heading}>Recent Transactions</h2>
      <div className={styles.container}>
        {transactions?.length > 0 ? (
          transactions.map((txn, idx) => (
            <div key={idx} className={styles.transactionItem}>
              <div className={styles.transactionLeft}>
                <div className={styles.iconCircle}>
                  {iconMap[txn.category.toLowerCase()] || "❓"}
                </div>
                <div>
                  <div className={styles.title}>{txn.title}</div>
                  <div className={styles.date}>
                    {new Date(txn.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.transactionRight}>
                <div className={styles.amount}>₹{txn.price}</div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(txn.id)}
                >
                  <MdDelete />
                </button>
                <button className={styles.editBtn} onClick={() => onEdit(txn.id)}>
                  <MdEdit />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noTransaction}>No Transactions!</div>
        )}
        {transactions?.length > 0 && (
          <div className={styles.pagination}>
            <button onClick={handlePrevPageChange} disabled={currentPage === 1}>
              ←
            </button>
            <span>{currentPage}</span>
            <button
              onClick={handleNextPageChange}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Transaction;
