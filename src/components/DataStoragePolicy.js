import React from 'react';

const DataStoragePolicy = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Data Storage Policy</h2>
      <p><strong>1. Data Collected:</strong></p>
      <ul>
        <li>Username</li>
        <li>Password (encrypted and irretrievable)</li>
        <li>Email</li>
        <li>Phone number</li>
        <li>Car details and pictures</li>
      </ul>
      <p><strong>2. Access and Security:</strong></p>
      <ul>
        <li>Passwords are securely encrypted and cannot be reproduced.</li>
        <li>Other data is accessible only to authenticated and authorized users.</li>
      </ul>
      <p><strong>3. Data Retention:</strong></p>
      <ul>
        <li>Data is retained for 5 years unless the user requests otherwise.</li>
      </ul>
      <p><strong>4. User Agreement:</strong></p>
      <ul>
        <li>By signing up, users agree to these policies.</li>
      </ul>
    </div>
  );
};

export default DataStoragePolicy;
