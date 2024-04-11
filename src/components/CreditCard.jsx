import React from "react";

const CreditCard = () => {
  return (
    <div class="d-flex justify-content-center container text-black mt-5">
      <div class="card p-2 px-3 py-3">
        <div class="d-flex justify-content-between align-items-center">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/20f92d145330209.629cc2402c577.gif"
            width="70"
            height="70"
            alt="card"
          />
          <img src="https://i.imgur.com/SsTSozr.png" width="40" alt="card" />
        </div>
        <div class="mt-3">
          <span class="me-2">4098</span>
          <span class="me-2">5844</span>
          <span class="me-2">5094</span>
          <span class="me-2">5512</span>
        </div>
        <div class="d-flex justify-content-between card-details mt-3 mb-3">
          <div class="d-flex flex-column">
            <span class="text-muted">
              Leobank <span class="text-end text-danger">-38 ₼</span>
            </span>
            <span>Anar Asgarli</span>
          </div>
          <div class="d-flex flex-row">
            <div class="d-flex flex-column ms-3">
              <span class="light">Expired</span>
              <span>07/26</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
