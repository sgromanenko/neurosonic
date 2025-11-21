import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import Player from './components/Player';
import { AuthForm } from './components/AuthForm';
import Library from './components/Library';
import BottomNav from './components/BottomNav';
import Explore from './components/Explore';
import Profile from './components/Profile';

// Mock auth state for now - in a real app this would come from context/store
const isAuthenticated = true;

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full min-h-screen"
    >
        {children}
    </motion.div>
);

function App() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/login" element={
                        <PageTransition>
                            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black">
                                <AuthForm
                                    type="login"
                                    onSubmit={async () => { }}
                                    onToggleMode={() => { }}
                                    isLoading={false}
                                    error={null}
                                />
                            </div>
                        </PageTransition>
                    } />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <PageTransition>
                                    <Dashboard />
                                </PageTransition>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/library"
                        element={
                            <PrivateRoute>
                                <PageTransition>
                                    <Library />
                                </PageTransition>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/explore"
                        element={
                            <PrivateRoute>
                                <PageTransition>
                                    <Explore />
                                </PageTransition>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <PageTransition>
                                    <Profile />
                                </PageTransition>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/player/:mode"
                        element={
                            <PrivateRoute>
                                <PageTransition>
                                    <Player />
                                </PageTransition>
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AnimatePresence>

            {isAuthenticated && <BottomNav />}
        </div>
    );
}

export default App;
