import Link from 'next/link';
import Layout from 'components/home/layout';

export default function Custom404() {
    return (
        <Layout>
        <div className="container">
            <div className="error-container">
                <div>
                <h2>Page Not Found!</h2>
                <h3>404</h3>
                <Link href="/">
                    <a>
                        Go Home
                    </a>
                </Link>
                </div>
            </div>

            <style jsx>
      {`
      .error-container{
        display: flex;
        justify-content: center;
        align-items: center;


      }

      .error-container div{
        background: white;
        padding: 20px;
        text-align: center;
       
      }
      `}
     </style>
        </div>
        </Layout>
    )
  }