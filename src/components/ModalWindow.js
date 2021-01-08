import React from "react";
import Modal from "react-modal";
import { ReviewForm } from "./ReviewForm";

export function ModalWindow(props) {
  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="modal" data-testid="modal">
      <Modal
        isOpen={props.modalOpenFlag}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <ReviewForm
          closeModal={props.closeModal}
          editableReview={props.editableReview}
          updateList={props.updateList}
        />
      </Modal>
    </div>
  );
}

// メモ
// https://www.youtube.com/watch?v=PcrrJ0BOFGw
