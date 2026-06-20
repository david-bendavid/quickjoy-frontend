// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} QuickJoy — זמן איכות יצירתי במינימום קליקים. 😊
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #EAEAEA',
    marginTop: 'auto', // מבטיח שהפוטר יידחף תמיד לתחתית המסך
    width: '100%'
  },
  text: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#666'
  }
};