import { Component } from 'react';
import Slider from 'react-slick';
import './herovideoslider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class HeroVideoSlider extends Component {
    render() {
        const settings = {
            dots: false,
            fade: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 6000,
            className: 'slider',
        };
        return (
            <Slider {...settings}>
                <video
                    autoPlay
                    controls={false}
                    src={require('../../assets/videos/Kitchen in a house.mp4')}
                    loop
                />

                <video
                    autoPlay
                    controls={false}
                    src={require('../../assets/videos/Ground floor of a house.mp4')}
                    loop
                />

                <video
                    autoPlay
                    controls={false}
                    src={require('../../assets/videos/House by a lake.mp4')}
                    loop
                />

                <video
                    autoPlay
                    controls={false}
                    src={require('../../assets/videos/A view of the coast.mp4')}
                    loop
                />
            </Slider>
        );
    }
}
