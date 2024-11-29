import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyAccount } from '../../../api/auth.service';

export default function EmailConfirmation() {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setIsLoading(true);
        await verifyAccount(token);
        setVerificationStatus('success');
        const intervalId = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(intervalId);
              navigate('/login');
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        setVerificationStatus('error');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={styles.container}>
      <h1>Email Verification</h1>
      {isLoading ? (
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={styles.progress}></div>
          </div>
          <p>Verifying your email, please wait...</p>
        </div>
      ) : verificationStatus === 'success' ? (
        <div style={styles.successMessage}>
          <h2>✅ Email Verified Successfully!</h2>
          <p>
            You will be redirected to the login page in{' '}
            <strong>{countdown}</strong> seconds...
          </p>
        </div>
      ) : (
        <div style={styles.errorMessage}>
          <h2>❌ Email Verification Failed</h2>
          <p>Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
}

// Styles for the component
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  progressContainer: {
    margin: '20px auto',
    width: '50%',
  },
  progressBar: {
    background: '#f3f3f3',
    borderRadius: '25px',
    height: '20px',
    overflow: 'hidden',
    position: 'relative',
  },
  progress: {
    background: '#4caf50',
    height: '100%',
    width: '100%',
    animation: 'progress-animation 2s linear infinite',
  },
  successMessage: {
    color: '#4caf50',
  },
  errorMessage: {
    color: '#f44336',
  },
};

// CSS animation
document.head.insertAdjacentHTML(
  'beforeend',
  `<style>
    @keyframes progress-animation {
      0% { width: 0%; }
      100% { width: 100%; }
    }
  </style>`
);
