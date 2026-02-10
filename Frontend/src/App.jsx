import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateListing from './pages/CreateListing.jsx';
import UpdateListing from './pages/UpdateListing.jsx';
import Listing from './pages/Listing.jsx'
import ContactDetails from './pages/ContactDetails.jsx';
import Footer from './components/Footer.jsx'
import Search from './pages/Search.jsx';
import FAQ from './pages/FAQ.jsx';
import ContactSupport from './pages/ContactSupport.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
 
function App() {

  return <BrowserRouter>
  <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<Search />} />
      <Route path="/listing/:id" element={<Listing />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path='/contact' element={<ContactSupport />} />
      <Route path='/privacy' element={<PrivacyPolicy />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/update-listing/:id" element={<UpdateListing />} />
        <Route path="/contact-details/:id" element={<ContactDetails />} />
      </Route>
    </Routes>
  <Footer />
  </BrowserRouter>
}

export default App; 
