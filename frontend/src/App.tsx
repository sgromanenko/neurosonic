import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground relative">
                <Routes>
                    <Route path="/ login" element={
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black">
                            <AuthForm
                                type="login"
                                onSubmit={async () => { }}
                                onToggleMode={() => { }}
                                isLoading={false}
                                error={null}
                            />
                        </div>
                    } />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/library"
                        element={
                            <PrivateRoute>
                                <Library />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/explore"
                        element={
                            <PrivateRoute>
                                <Explore />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/player/:mode"
                        element={
                            <PrivateRoute>
                                <Player />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                {isAuthenticated && <BottomNav />}
            </div>
        </Router>
    );
}

export default App;
