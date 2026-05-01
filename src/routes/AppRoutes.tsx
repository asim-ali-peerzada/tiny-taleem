import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../screens/Home';
import { Learning } from '../screens/Learning';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn/:mode" element={<Learning />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
