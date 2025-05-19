import PostCard from './PostCard'

const PostList = ({ posts }) => {
  console.log("POSTS RECIBIDOS:", posts)

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostList
