import Layout from 'components/admin/layout';
import Link from 'next/link';
import * as A from 'components/adminImports';

 function Users() {
    return(
        <>
        <Layout>
            <div>
            
    <div className="card">
  <div className="card-header w3-blue">
    <h5 className="text-center ">Users</h5>
  </div>
  <table className="w3-table w3-bordered text-capitalize">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col"># of ads</th>
      <th scope="col">dashboard</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>123456</td>
      <td>Otto anoom</td>
      <td>otto@gmail.com</td>
      <td>5</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>view</a></Link>
      </td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>123456</td>
      <td>Otto anoom</td>
      <td>otto@gmail.com</td>
      <td>5</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>view</a></Link>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>123456</td>
      <td>Otto anoom</td>
      <td>otto@gmail.com</td>
      <td>5</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>view</a></Link>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>123456</td>
      <td>Otto anoom</td>
      <td>otto@gmail.com</td>
      <td>5</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>view</a></Link>
      </td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>123456</td>
      <td>Otto anoom</td>
      <td>otto@gmail.com</td>
      <td>5</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>view</a></Link>
      </td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>123456</td>
      <td>Otto anoom</td>
      <td>otto@gmail.com</td>
      <td>5</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>view</a></Link>
      </td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>123456</td>
      <td>Otto anoom</td>
      <td>otto@gmail.com</td>
      <td>5</td>
      <td>
      <Link href="/admin-dashboard/[slug]"><a>view</a></Link>
      </td>
    </tr>
     </tbody>
    </table>
</div>
            </div>
        </Layout>
        </>
    )
}

export default A.AuthRoute(Users)