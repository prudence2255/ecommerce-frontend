

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