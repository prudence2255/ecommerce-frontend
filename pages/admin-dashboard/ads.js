import Layout from 'components/admin/layout';
import Link from 'next/link';
import * as A from 'components/adminImports';

 function Ads() {
    return(
        <>
        <Layout>
<div>  
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Ads</h5>
  </div>
  <table className="w3-table w3-bordered">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">image</th>
      <th scope="col">category</th>
      <th scope="col">poster</th>
      <th scope="col">details</th>
      <th scope="col">status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>123456</td>
      <td><img src="/32.jpg" style={{width: '60px', height: '60px'}}/></td>
      <td>mobile phones</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>Alidu Latif</a></Link>
      </td>
      <td><button className="w3-btn w3-blue">View</button></td>
      <td><span className="w3-green p-1">published</span></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>123456</td>
      <td><img src="/32.jpg" style={{width: '60px', height: '60px'}}/></td>
      <td>mobile phones</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>Alidu Latif</a></Link>
      </td>
      <td><button className="w3-btn w3-blue">View</button></td>
      <td><span className="w3-green p-1">published</span></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>123456</td>
      <td><img src="/32.jpg" style={{width: '60px', height: '60px'}}/></td>
      <td>mobile phones</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>Alidu Latif</a></Link>
      </td>
      <td><button className="w3-btn w3-blue">View</button></td>
      <td><span className="w3-green p-1">published</span></td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>123456</td>
      <td><img src="/32.jpg" style={{width: '60px', height: '60px'}}/></td>
      <td>mobile phones</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>Alidu Latif</a></Link>
      </td>
      <td><button className="w3-btn w3-blue">View</button></td>
      <td><span className="w3-green p-1">published</span></td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>123456</td>
      <td><img src="/32.jpg" style={{width: '60px', height: '60px'}}/></td>
      <td>mobile phones</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>Alidu Latif</a></Link>
      </td>
      <td><button className="w3-btn w3-blue">View</button></td>
      <td><span className="w3-yellow p-1">published</span></td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>123456</td>
      <td><img src="/32.jpg" style={{width: '60px', height: '60px'}}/></td>
      <td>mobile phones</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>Alidu Latif</a></Link>
      </td>
      <td><button className="w3-btn w3-blue">View</button></td>
      <td><span className="w3-green p-1">published</span></td>
    </tr>
    <tr>
      <th scope="row">7</th>
      <td>123456</td>
      <td><img src="/32.jpg" style={{width: '60px', height: '60px'}}/></td>
      <td>mobile phones</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>Alidu Latif</a></Link>
      </td>
      <td><button className="w3-btn w3-blue">View</button></td>
      <td><span className="w3-yellow p-1">published</span></td>
    </tr>
     </tbody>
    </table>
    </div>
    </div>
    </Layout>
        </>
    )
}

export default A.AuthRoute(Ads)