import PostCard from './PostCard'

const PostList = ({ posts }) => {
  console.log("POSTS RECIBIDOS:", posts)

  return (
    <div className="container mt-4">
      <div className="row">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>

  )
}

export default PostList
