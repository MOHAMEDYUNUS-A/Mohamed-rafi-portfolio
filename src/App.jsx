import React from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechnicalSkills from './components/TechnicalSkills'
import Services from './components/Services'
import Projects from './components/Projects'
import BusinessGallery from './components/BusinessGallery'
import ProfessionalExperience from './components/ProfessionalExperience'
import Milestones from './components/Milestones'
import ContentCreator from './components/ContentCreator'
import ConferencesAwards from './components/ConferencesAwards'
import SoftSkills from './components/SoftSkills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import RecruiterBot from './components/RecruiterBot'

function App() {
  return (
    <PortfolioProvider>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <TechnicalSkills />
      <Services />
      <ProfessionalExperience />
      <BusinessGallery />
      <Projects />
      <Milestones />
      <ContentCreator />
      <ConferencesAwards />
      <SoftSkills />
      <Contact />
      <Footer />
      <RecruiterBot />
    </PortfolioProvider>
  )
}

export default App
