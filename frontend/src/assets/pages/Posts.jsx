import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/authContext";
import Post from "../components/Post";


export default function Posts(props) {
  const { posts, users, handleDeletePost, displayToast } = props;
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className=" p-6 w-full bg-gray-50">
      <div className="w-[90%] max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Latest Posts</h1>
          <button
            onClick={() => {
              if (loggedInUser) {
                console.log("user logged in: ", loggedInUser);
                navigate("/add-post");
              } else {
                displayToast("You must login to add a post.");
              }
            }}
            className="px-5 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-200 flex items-center shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Post
          </button>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div className="text-gray-500 text-lg font-medium">No posts yet</div>
              <p className="text-gray-400 mt-2">Start by creating your first post</p>
            </div>
          ) : (
            posts.map((post, index) => {
              const user = users.find((user) => user._id == post.userId);
              return (
                <Post 
                  key={index}
                  post={post}
                  user={user}
                  handleDeletePost={handleDeletePost}
                  displayToast={displayToast}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}