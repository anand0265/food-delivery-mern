


import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [loadingMessage, setLoadingMessage] = useState("Verifying your payment...");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

      if (response.data.success) {
        setLoadingMessage("Payment successful! ");
        setTimeout(() => navigate("/myorders"), 2000);
      } else {
        setLoadingMessage("Payment failed or ");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setLoadingMessage("Something went wrong. Redirecting to home...");
      setTimeout(() => navigate("/"), 3000);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
      <p className="verify-message">{loadingMessage}</p>
    </div>
  );
};

export default Verify;
