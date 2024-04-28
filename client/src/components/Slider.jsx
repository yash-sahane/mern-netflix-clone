import React from 'react'
import CardSlider from './CardSlider'

const Slider = ({ movies }) => {
    const sliceMoviesFromTo = (from, to) => {
        return movies.slice(from, to);
    }

    return (
        <>
            <CardSlider title='Trending Now' data={sliceMoviesFromTo(0, 10)} />
            <CardSlider title='New Releases' data={sliceMoviesFromTo(10, 20)} />
            <CardSlider title='Blockbuster movies' data={sliceMoviesFromTo(20, 30)} />
            <CardSlider title='Popular On Netflix' data={sliceMoviesFromTo(30, 40)} />
            <CardSlider title='Action Movies' data={sliceMoviesFromTo(40, 50)} />
            <CardSlider title='Epics' data={sliceMoviesFromTo(50, 60)} />
        </>
    )
}

export default Slider