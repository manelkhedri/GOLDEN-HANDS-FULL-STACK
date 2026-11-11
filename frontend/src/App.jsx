
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from './features/productsSlice';

import {
  loginUser,
  registerUser,
  setGoogleToken,
  fetchCurrentUser,
  logout
} from './features/authSlice';

import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const { status: productsStatus, error: productsError } =
    useSelector((state) => state.products);

  const {
    token,
    isLoggedIn,
    user,
    status: authStatus,
    error: authError
  } = useSelector((state) => state.auth);

  const [authMode, setAuthMode] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const googleToken = params.get('token');

    if (googleToken) {
      dispatch(setGoogleToken(googleToken));

      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );

      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setSuccessMessage('');
  };

  const closeAuth = () => {
    setAuthMode(null);
    setSuccessMessage('');
  };

  const handleGoogleLogin = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000';

  window.location.href = `${API_BASE_URL}/api/auth/google`;
 };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      setEmail('');
      setPassword('');
      closeAuth();
      dispatch(fetchCurrentUser());
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (password !== confirmPassword || password.length < 8) {
      return;
    }

    const result = await dispatch(
      registerUser({ name, email, password })
    );

    if (registerUser.fulfilled.match(result)) {
      setSuccessMessage('Account created successfully! You can now log in.');
      setName('');
      setPassword('');
      setConfirmPassword('');
      setAuthMode('login');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    closeAuth();
  };

  return (
    <div className="app">
      <header className="store-header">
        <img
          src={`${import.meta.env.BASE_URL}logo.jpg`}
          alt="GOLDEN HANDS LOGO"
          className="store-logo"
        />

        <div className="header-text">
          <h1>GOLDEN HANDS</h1>
          <p>Handmade with love, crafted stitch by stitch.</p>
        </div>

        <div className="auth-section">
          {isLoggedIn ? (
            <div>
              <p>Welcome {user?.name || user?.email || 'User'} ✓</p>
              {user && (
                <p>{user.role === 'admin' ? 'Admin' : 'Customer'}</p>
              )}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-container">
              <div className="auth-buttons">
                <button onClick={() => openAuth('register')}>
                  Create Account
                </button>

                <button onClick={() => openAuth('login')}>
                  Login
                </button>

                <button onClick={handleGoogleLogin}>
                  Sign in with Google
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Right side authentication drawer */}
      {authMode && !isLoggedIn && (
        <>
          <div className="auth-overlay" onClick={closeAuth}></div>

          <aside className="auth-sidebar">
            <button
              type="button"
              className="auth-close"
              onClick={closeAuth}
              aria-label="Close"
            >
              ×
            </button>

            {authMode === 'register' && (
              <>
                <h2>Create Account</h2>

                <form onSubmit={handleRegister}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password (at least 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="auth-error">Passwords do not match.</p>
                  )}

                  {authError && (
                    <p className="auth-error">{authError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      authStatus === 'loading' ||
                      password !== confirmPassword ||
                      password.length < 8
                    }
                  >
                    {authStatus === 'loading'
                      ? 'Creating Account...'
                      : 'Create Account'}
                  </button>
                </form>

                <p>
                  Already have an account?{' '}
                  <button type="button" onClick={() => openAuth('login')}>
                    Login
                  </button>
                </p>
              </>
            )}

            {authMode === 'login' && (
              <>
                <h2>Welcome Back</h2>

                <form onSubmit={handleEmailLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {authError && (
                    <p className="auth-error">{authError}</p>
                  )}

                  {successMessage && (
                    <p className="auth-success">{successMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={authStatus === 'loading'}
                  >
                    {authStatus === 'loading' ? 'Logging in...' : 'Login'}
                  </button>
                </form>

                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => openAuth('register')}
                  >
                    Create Account
                  </button>
                </p>
              </>
            )}
          </aside>
        </>
      )}

      <main>
        <CartSummary />

        {productsStatus === 'loading' && <p>Loading products...</p>}

        {productsStatus === 'failed' && (
          <p>Error loading products: {productsError}</p>
        )}

        {productsStatus === 'succeeded' && <ProductList />}
      </main>
    </div>
  );
}

export default App;
