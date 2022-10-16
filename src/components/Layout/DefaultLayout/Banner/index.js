import Carousel from 'react-bootstrap/Carousel';
import './banner.scss';

function IndividualIntervalsExample() {
    return (
        <Carousel className='carouselMain'>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100 slide"
                    src={require('~/assets/images/slide-1.jpg')}
                    style={{ maxHeight: '760px' }}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100 slide"
                    src={require('~/assets/images/slide-2.jpg')}
                    style={{ maxHeight: '760px' }}
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100 slide"
                    src={require('~/assets/images/slide-3.jpg')}
                    style={{ maxHeight: '760px' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 slide"
                    src={require('~/assets/images/slide-4.jpg')}
                    style={{ maxHeight: '760px' }}
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default IndividualIntervalsExample;