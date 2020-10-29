import 'styles/w3.css';
import 'styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {wrapper} from '../store/store'



 const App = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
     
    )
  }

  export default wrapper.withRedux(App)