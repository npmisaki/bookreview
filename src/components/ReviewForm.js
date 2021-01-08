import React, { useState } from "react";
import axios from "axios";

export function ReviewForm(props) {
  const { id } = props.editableReview;
  const [errorTitleMessage, setErrorTitleMessage] = useState("");
  const [errorScoreMessage, setErrorScoreMessage] = useState("");
  const [errorBodyMessage, setErrorBodyMessage] = useState("");
  const [errorReviewerMessage, setErrorReviewerMessage] = useState("");
  const [formData, setFormData] = useState(
    id
      ? props.editableReview
      : {
          title: "",
          score: 1,
          body: "",
          reviewer: "",
        }
  );
  const actionText = id ? "レビューを編集する" : "レビューを登録する";

  function handleChange({ target }) {
    const value = target.value;
    console.log(value);
    setFormData({
      ...formData,
      [target.name]: value,
    });
  }

  // async関数にしてあげる　updateReviewをawaitするために
  async function handleSubmit(event) {
    event.preventDefault(); // 画面遷移してしまわないように必要
    console.log(formData);
    if (validate(formData)) {
      if (id) {
        await updateReview(id);
      } else {
        postReview();
      }
    }
    props.closeModal();
  }

  function validate({ title, score, body, reviewer }) {
    if (title && title.length <= 255) {
      setErrorTitleMessage("");
    } else {
      setErrorTitleMessage("Title is invalid");
    }

    if (score && 0 < score <= 5) {
      setErrorScoreMessage("");
    } else {
      setErrorScoreMessage("Score is invalid");
    }

    if (body && body.length <= 255) {
      setErrorBodyMessage("");
    } else {
      setErrorBodyMessage("Body is invalid");
    }

    if (reviewer && reviewer.length <= 255) {
      setErrorReviewerMessage("");
    } else {
      setErrorReviewerMessage("Reviewer is invalid");
    }

    if (
      !(
        errorTitleMessage &&
        errorScoreMessage &&
        setErrorBodyMessage &&
        errorReviewerMessage
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function postReview() {
    console.log(formData);
    const { title, score, body, reviewer } = formData;
    await axios.post("https://bookreview-ten.vercel.app/api/reviews", {
      title,
      score,
      body,
      reviewer,
    });
    props.updateList(formData);
  }

  async function updateReview(id) {
    console.log(formData);
    const { title, score, body, reviewer } = formData;
    await axios.put(`https://bookreview-ten.vercel.app/api/reviews/${id}`, {
      title,
      score,
      body,
      reviewer,
    });
    props.updateList(formData);
  }

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{actionText}</p>
        <button onClick={props.closeModal} className="delete">
          ❌
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="modal-card-body">
          <div className="section-inner">
            <label>title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input is-hovered"
              type="text"
              maxLength="255"
            />
            <p className="error">{errorTitleMessage}</p>
          </div>
          <div className="section-inner">
            <label>score</label>
            <input
              name="score"
              value={formData.score}
              onChange={handleChange}
              className="input is-hovered"
              type="number"
              min="1"
              max="5"
            />
            <p className="error">{errorScoreMessage}</p>
          </div>
          <div className="section-inner">
            <label>body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="input is-hovered"
              type="textarea"
              maxLength="255"
            />
            <p className="error">{errorBodyMessage}</p>
          </div>
          <div className="section-inner">
            <label>reviewer</label>
            <input
              name="reviewer"
              value={formData.reviewer}
              onChange={handleChange}
              className="input is-hovered"
              type="text"
              maxLength="255"
            />
            <p className="error">{errorReviewerMessage}</p>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-link" type="submit">
            submit
          </button>
        </footer>
      </form>
    </div>
  );
}
