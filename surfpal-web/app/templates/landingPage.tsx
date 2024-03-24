
import React from 'react'
import Hero from '../shared/components/hero'
import MainFeatures from '../shared/components/mainFeature'
import UseCase from '../shared/components/useCase'
import CarouselComponent from '../shared/components/carousel'
import Footer from '../shared/components/footer'

const LandingPage = () => {
  return (
        <>
        <Hero/>
        <CarouselComponent/>
        <MainFeatures/>
        <UseCase/>
        <Footer/>
        </>
    )
}

export default LandingPage