import React from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <FeatureProducts/>  
    </>
  )
}
