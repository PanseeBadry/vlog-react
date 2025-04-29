import {
    Heart,
    MessageCircle,
    Share2,
    MoreVertical,
    Pencil,
    Trash,
  } from "lucide-react";
  import { useContext } from "react";
  import { useNavigate } from "react-router";
  import { AuthContext } from "../contexts/authContext";
  
  export default function Post({ post, user, handleDeletePost, displayToast }) {
    const { loggedInUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100  transition-all hover:shadow-md">
        <div className="flex justify-between p-4">
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <div className="font-semibold text-gray-800">{user?.name}</div>
              <div className="text-gray-500 text-sm flex items-center gap-3">
                <span className="text-indigo-500">@{user?.username}</span>
                <span className="text-gray-400 text-xs">{post.time}</span>
              </div>
            </div>
          </div>
  
          <div>
            <div className="dropdown">
              <div tabIndex={0} className="m-1 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                <MoreVertical size={20} className="text-gray-500" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-lg z-10 w-48 p-3 shadow-lg border border-gray-100"
              >
                <li className="mb-1">
                  <button
                    className="flex items-center p-2 rounded-md hover:bg-gray-50 text-gray-700"
                    onClick={() => {
                      if (user._id === loggedInUser._id) {
                        console.log('post', post);
                        navigate('/add-post', { state: { isEdit: true, postData: post } });
                      } else {
                        displayToast("You Are Not allowed to edit this post");
                      }
                    }}
                  >
                    <Pencil size={16} className="text-indigo-500 mr-2" />
                    Edit Post
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center p-2 rounded-md hover:bg-gray-50 text-gray-700"
                    onClick={() => {
                      if (user._id === loggedInUser._id) {
                        handleDeletePost(post._id);
                      } else {
                        displayToast("You Are Not allowed to delete this post");
                      }
                    }}
                  >
                    <Trash size={16} className="text-red-500 mr-2" />
                    Delete Post
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div className="px-5 pb-3">
          <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{post.body}</p>
        </div>
  
        {post.image && (
          <div className="p-3">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-[400px] object-cover "
            />
          </div>
        )}
  
        <div className="px-5 py-3 border-t border-gray-100">
          <div className="flex text-gray-500 text-sm">
            <div className="mr-6 font-medium text-indigo-500">
              {post.likes} likes
            </div>
            <div className="mr-6 hover:text-gray-700 transition-colors">
              {post.comments} comments
            </div>
            <div className="hover:text-gray-700 transition-colors">
              {post.shares} shares
            </div>
          </div>
        </div>
  
        <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <button className="flex items-center justify-center px-4 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer">
            <Heart size={18} className="mr-2 text-gray-500" />
            <span className="font-medium text-gray-700">Like</span>
          </button>
          <button className="flex items-center justify-center px-4 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer">
            <MessageCircle size={18} className="mr-2 text-gray-500" />
            <span className="font-medium text-gray-700">Comment</span>
          </button>
          <button className="flex items-center justify-center px-4 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer">
            <Share2 size={18} className="mr-2 text-gray-500" />
            <span className="font-medium text-gray-700">Share</span>
          </button>
        </div>
      </div>
    );
  }