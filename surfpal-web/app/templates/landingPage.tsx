
import React from 'react'
import Hero from '../shared/components/hero'
import MainFeatures from '../shared/components/mainFeature'
import UseCase from '../shared/components/useCase'
import Video from '../shared/components/video'
import Footer from '../shared/components/footer'

const LandingPage = () => {
  return (
        <>
        <Hero/>
        <Video/>
        <MainFeatures/>
        <UseCase/>
        <Footer/>
        </>
    )
}

export default LandingPage