import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  if (!res.ok) throw new Error('Fetch thất bại')
  return await res.json()
})

const initialState = { items: [], status: 'idle', error: null }

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(fetchPosts.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
      .addCase(fetchPosts.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message })
  },
})

export const selectPosts = (state) => state.posts
export default postsSlice.reducer
