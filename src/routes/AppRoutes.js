// src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Excel from "../pages/excel/components/ExcelWrapper";
import { isAuthenticated } from "../common/utils";
import ErrorBoundary from "../common/component/ErrorBoundary";
import NotFound from "../pages/NotFound";

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/"
                    element={
                        <ErrorBoundary>
                            <PrivateRoute>
                                <Excel />
                            </PrivateRoute>
                        </ErrorBoundary>} />
                <Route path="/*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
                <Route
                    path="/*"
                    element={
                        <ErrorBoundary>
                            <NotFound />
                        </ErrorBoundary>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
