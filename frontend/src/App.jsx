import axios from "axios";
// import './App.css'
import { Route, Routes, useNavigate } from "react-router";
import { AuthContext } from "./assets/contexts/authContext"; 
import NavBar from "./assets/components/NavBar";
import Posts from "./assets/pages/Posts";
import SideBar from "./assets/components/SideBar";
import AddPost from "./assets/components/AddPost";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
function App() {
  const baseUrl = "https://vlog-react-production.up.railway.app";

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postForm, setPostForm] = useState({
    title: "",
    body: "",
    image: "",
  });
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      const [posts, users] = await Promise.all([
        axios.get(`${baseUrl}/posts`),
        axios.get(`${baseUrl}/users`),
      ]);
      setPosts(posts.data.reverse());
      setUsers(users.data);
    };
    data();
  }, []);

  const handleChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const handleAddPost = async (postToAdd) => {
    try {
      // console.log("post to add", postToAdd);
      // console.log('post form',postForm)

      postToAdd = {
        userId: loggedInUser._id,
        title: postForm.title,
        body: postForm.body,
        image: postForm.image,
      };

      const { data } = await axios.post(`${baseUrl}/posts`, postToAdd);
      displayToast(data.message);
      const newPost = data.post || postToAdd;
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      navigate("/");
    } catch (error) {
      toast("Failed to add the post. Please try again.");
      console.error("Error adding post:", error);
    }
  };

  const handleEditPost = async (postId, formData) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/posts/${postId}`,
        formData
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, ...formData } : post
        )
      );
      navigate("/");
      displayToast(data.message);
      console.log(data.message);
    } catch (error) {
      displayToast("Failed to edit the post. Please try again.");
      console.error("Error editing post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const data = await axios.delete(`${baseUrl}/posts/${postId}`);

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      displayToast(data.data.message);
      console.log("Post deleted successfully");
    } catch (error) {
      displayToast("Failed to delete the post. Please try again.");
      console.error("Error deleting post:", error);
    }
  };

  const displayToast = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer />

      <NavBar />
      <SideBar />

      <div className="flex flex-row ">
        <Routes>
          <Route
            path="/"
            element={
              <Posts
                posts={posts}
                users={users}
                handleDeletePost={handleDeletePost}
                displayToast={displayToast}
              />
            }
          />
          <Route
            path="/add-post"
            element={
              <AddPost
                postForm={postForm}
                setPostForm={setPostForm}
                posts={posts}
                handleChange={handleChange}
                handleAddPost={handleAddPost}
                handleEditPost={handleEditPost}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
