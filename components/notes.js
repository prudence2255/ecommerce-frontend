

//accessing env variables

//{API_URL} = process.env



// export const selectAllPosts = state => state.posts

// export const selectPostById = (state, postId) =>
//   state.posts.find(post => post.id === postId)
// const posts = useSelector(selectAllPosts)
// const post = useSelector(state => selectPostById(state, postId))



// const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//       postAdded(state, action) {
//         state.push(action.payload)
//       },
//       postUpdated(state, action) {
//         const { id, title, content } = action.payload
//         const existingPost = state.find(post => post.id === id)
//         if (existingPost) {
//           existingPost.title = title
//           existingPost.content = content
//         }
//       }
//     }
//   })
  
//   export const { postAdded, postUpdated } = postsSlice.actions
  
//   export default postsSlice.reducer




// postAdded: {
//     reducer(state, action) {
//       state.push(action.payload)
//     },
//     prepare(title, content, userId) {
//       return {
//         payload: {
//           id: nanoid(),
//           date: new Date().toISOString(),
//           title,
//           content,
//           user: userId,
//         },
//       }
//     },
//   },




// const postsSlice = createSlice(/* omit slice code*/)

// export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// export default postsSlice.reducer

// export const selectAllPosts = state => state.posts

// export const selectPostById = (state, postId) =>
//   state.posts.find(post => post.id === postId)



// omit imports
// import { selectPostById } from './postsSlice'

// export const SinglePostPage = ({ match }) => {
//   const { postId } = match.params

//   const post = useSelector(state => selectPostById(state, postId))
//   // omit component logic
// }


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { client } from '../../api/client'

// const initialState = []

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await client.get('/fakeApi/users')
//   return response.users
// })

// const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [fetchUsers.fulfilled]: (state, action) => {
//       return action.payload
//     }
//   }
// })

// export default usersSlice.reducer



// const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
// }
// if(loggedIn()) {
//  headers['Authorization'] = `Bearer ${getToken()}`;
// }
// return Axios({
// ...options,
// headers,  
// });







{/* <A.Controller
        control={control}
        name="region"
        render={({onChange, value}) => (
          <Select
            onChange={(e) => {
              onChange(e.value)
              handleRegions(e.value)
            }}
        options={regions}
        instanceId="regions"
        isSearchable
        isClearable
        placeholder="Search regions..."
          />
        )}
      /> */}


      {/* {parentLocations && parentLocations.map((location, i) => (
          <div className="col-md-12 " key={i}>
          <div>
              <div className="row">
             <div className="col-md-12 link" onClick={() => handleChildren(location.id)}>
             <div className=" w3-left" >
            {location.name} 
            </div>
             <div className="w3-right">
            <RightIcon />
             </div>
             </div>
              </div>
          </div>
          <hr />
          </div>
          ))}
          
       </div>
        </div>
        <div className="col-md-6">
        <div>
                <div className="row">
                    <div className="col-md-12 link">
                    <div className=" w3-left" onClick={() => handleLocation(parentLocation.slug)}>
                    {Object.keys(parentLocation).length > 0 && `All ${parentLocation.name}`}
                    </div>
                    </div>
                </div>
                <hr />
        </div>
            <div className="row">
            {children.map((location, i) => (
                <div className="col-md-12 "  key={i}>
               <div>
                <div className="row">
                    <div className="col-md-12 link">
                    <div className=" w3-left" onClick={() => handleLocation(location.slug)}>
                    {location.name}
                    </div>
                    </div>
                </div>
                <hr />
               </div>
                </div>
                ))} */}