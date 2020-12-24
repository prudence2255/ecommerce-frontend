import Router from 'next/router';
import 'styles/w3.css';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {wrapper} from '../store/store';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";


Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

 const App = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
     
    )
  }

  export default wrapper.withRedux(App)