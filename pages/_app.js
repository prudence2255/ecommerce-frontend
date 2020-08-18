import 'styles/w3.css';
import 'styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {wrapper} from '../store/store'



 const App = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
     
    )
  }

  export default wrapper.withRedux(App)