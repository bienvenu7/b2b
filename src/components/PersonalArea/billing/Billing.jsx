import React from "react";
import PersonalAreaLayout from "../PersonalAreaLayout";

import "./Billing.scss";
import CardLine from "./CardLine";

import { billingInfo } from "../../../api/authRequest/authRequest-api";
import { useEffect, useState } from 'react';
import moment from "moment/moment";

const Billing = () => {

  const [someData, setSomeData] = useState({
    invoices: [],
  })
  var dataFixed = () => moment().format('DD/MM/YYYY')

  console.log(someData)

  useEffect(() => {
    billingInfo().then((r) => {
      setSomeData(r.data)
    })
  }, []);

  return (
    <div className="top">
      <PersonalAreaLayout>
        <div className="billing-container">
          <div className="billing-header">Payment History</div>
          <div className="billing-table">
            <div className="billing-table_header">
              <div className="billing-date">Date</div>
              <div className="billing-reference">reference</div>
              <div className="billing-method">Method</div>
              <div className="billing-price">price</div>
            </div>
            {someData.invoices.map((key, i) => (
              <div key={i} className="billing-table-cards">
                <CardLine date={dataFixed(key.createdAt)} reference={key.paymentSystemInvoiceId} method={key.paymentMethodId} price={key.amount} source={key.paymentSystemInvoiceLink} />
              </div>
            ))}
          </div>
        </div>
      </PersonalAreaLayout>
    </div>
  );
};
export default Billing;
