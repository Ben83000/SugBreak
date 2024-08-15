import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import PublicRoute from '@/components/routes/PublicRoute';
import HomePage from '@/components/pages/Home/HomePage';
import OrderingPage from '@/components/pages/Ordering/OrderingPage';
import RegistrationPage from '@/components/pages/Profile/RegistrationPage';
import RegistrationConfirmPage from '@/components/pages/Profile/RegistrationConfirmPage';
import RegisteredPage from '@/components/pages/Profile/RegisteredPage';
import LoginPage from '@/components/pages/Profile/LoginPage';
import ProfilePage from '@/components/pages/Profile/ProfilePage';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SecondaryLayout from '@/components/layouts/Secondary/SecondaryLayout';
import DashboardPage from '@/components/pages/DashboardAdmin/DashboardPage';
import Modal from '@/components/Modal/Modal';
import CheckoutPage from '@/components/pages/Checkout/CheckoutPage';
import { DeliveryContextProvider } from '@/contexts/deliveryContext';
import { CartContextProvider } from '@/contexts/cartContext';
import { AdminContextProvider } from '@/contexts/adminContext';
import { ConfirmationContextProvider } from '@/contexts/confirmationContext';
import { ModalContextProvider } from '@/contexts/modalContext';
import { AuthContextProvider } from '@/contexts/authContext';
import { ProductContextProvider } from '@/contexts/productContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Completion from './components/pages/Checkout/CheckoutForm/Completion';
import OrdersPage from './components/pages/Orders/OrdersPage';
import { OrderContextProvider } from './contexts/orderContext';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="680774226357-6t375lbg1o9i0pc3ittmqffaab7uc1ui.apps.googleusercontent.com">
        <AuthContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <ProductContextProvider>
                <ModalContextProvider>
                  <ConfirmationContextProvider>
                    <AdminContextProvider>
                      <DeliveryContextProvider>
                        <Modal />

                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route
                            path="/online-ordering"
                            element={
                              <MainLayout>
                                <OrderingPage />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/registration"
                            element={
                              <PublicRoute redirectTo="/profile">
                                <SecondaryLayout>
                                  <RegistrationPage />
                                </SecondaryLayout>
                              </PublicRoute>
                            }
                          />
                          <Route
                            path="/registration/confirm"
                            element={
                              <PublicRoute redirectTo="/profile">
                                <SecondaryLayout>
                                  <RegistrationConfirmPage />
                                </SecondaryLayout>
                              </PublicRoute>
                            }
                          />
                          <Route
                            path="/registered"
                            element={
                              <SecondaryLayout>
                                <RegisteredPage />
                              </SecondaryLayout>
                            }
                          />
                          <Route
                            path="/login"
                            element={
                              <PublicRoute redirectTo="/profile">
                                <SecondaryLayout>
                                  <LoginPage />
                                </SecondaryLayout>
                              </PublicRoute>
                            }
                          />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute redirectTo="/login">
                                <MainLayout>
                                  <ProfilePage />
                                </MainLayout>
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/dashboard"
                            element={
                              <ProtectedRoute redirectTo="/">
                                <MainLayout>
                                  <DashboardPage />
                                </MainLayout>
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route
                            path="/completion"
                            element={
                              <MainLayout>
                                <Completion />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/orders"
                            element={
                              <ProtectedRoute redirectTo="/">
                                <MainLayout>
                                  <OrdersPage />
                                </MainLayout>
                              </ProtectedRoute>
                            }
                          />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      </DeliveryContextProvider>
                    </AdminContextProvider>
                  </ConfirmationContextProvider>
                </ModalContextProvider>
              </ProductContextProvider>
            </OrderContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
