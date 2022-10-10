import React from 'react';
import { CategoryForm } from './CategoryForm';
import { CertificatesForm } from './CertificatesForm';

export const PaymentForm = ({ btnAdd, btnPay, cartTotal, getPrice, setAdd }) => {
  return (
    <div className="payment__form-wrapper">
      <CategoryForm setAdd={setAdd} but={btnAdd} cartTotal={cartTotal} getPrice={getPrice} />
      <hr />
      <CertificatesForm but={btnPay} cartTotal={cartTotal} />
    </div>
  );
};
