import * as A from 'components/adminImports';
import * as yup from "yup";
const schema = yup.object().shape({
  search: yup.string().required()
});
const Search = () => {

  const {register, reset, handleSubmit, errors } = A.useForm({
      resolver: A.yupResolver(schema),   
    })
const router = A.useRouter();
  const onHandleSearch = (data) => {
      router.push({
          pathname: '/ads',
          query: {
              ...data,
          }
      }) 
  }
    return (
        <>
<div className="col-md-6 mx-auto">
        <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="What are you looking for?" 
  name="search" ref={register}
   />
    <div className="input-group-append">
    <button className="btn search-btn" type="button" onClick={handleSubmit(onHandleSearch)}>Search</button>
    </div>
  </div>
      </div>
      <style jsx>
          {`
          .search-btn{
       background-color: #228B22!important;
       color: #f6f6fd;
     }

     input, button{
      height: 50px;
     }`}
      </style>
        </>
    )
}

export default Search;