import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faPencilAlt);
library.add(faTimes);

export function Review ({reviews, removeReview, openEditModal}) {

  return reviews.map((review, index) => (
    <tr key={index}>
      <th>{ index + 1 }</th>
      <th>{ review.title }</th>
      <th>{ review.score }</th>
      <th>{ review.body }</th>
      <th>{ review.reviewer }</th>
      <th>
        <div className="is-flex">
          <button onClick={() => openEditModal(review.id)} className="button"><FontAwesomeIcon icon="pencil-alt" /></button>
          <button onClick={() => removeReview(review.id)} className="button"><FontAwesomeIcon icon="times" /></button>
        </div>
      </th>
    </tr>
  ));
}

// named exportとdefault exportの違いを意識しよう
// 10/30日次はapiをfetchするaxiosを使っていいhttpクライアントが必要

