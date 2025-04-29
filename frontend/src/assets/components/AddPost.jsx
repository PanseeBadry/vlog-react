import React, { useEffect } from 'react'
import { Image} from 'lucide-react';
import { useLocation } from 'react-router';
import axios from 'axios';

export default function AddPost(props) {
  const {postForm,setPostForm, handleAddPost,handleChange,handleEditPost} = props
  const location = useLocation();
  const isEdit = location.state?.isEdit;
  const postData = location.state?.postData;


  useEffect(() => {
    if (isEdit && postData) {
      setPostForm({
        title: postData.title || '',
        body: postData.body || '',
        image: postData.image || ''
      });
    } else {
      setPostForm({
        title: '',
        body: '',
        image: ''
      });
    }
  }, [isEdit, postData]);
  


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isEdit) {
      handleEditPost(postData._id, postForm);
    } else {
      handleAddPost(postForm);
    }
  
    setPostForm({
      title: '',
      body: '',
      image: ''
    });
  };
const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);
  const apiKey = 'a92532ee4e136be66af8c7d01d6a5e28';

  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    const imageUrl = response.data.data.url;
    setPostForm((prev) => ({ ...prev, image: imageUrl }));
  } catch (error) {
    console.error("Image upload error:", error);
  }
};


  return (
    <div className="w-[50%] mx-auto mt-[140px] ml-[400px] p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">{isEdit ? "Edit Post" : "Add New Post"}</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
  <div>
    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      type="text"
      id="title"
      name="title"
      value={postForm.title}
      onChange={handleChange}
      placeholder="Enter Post Title"
      required
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
      Body
    </label>
    <textarea
      id="body"
      name="body"
      value={postForm.body}
      onChange={handleChange}
      rows="5"
      required
      placeholder="Enter Post Body . . . . "
      className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex items-center gap-2">
    <Image size={18} />
    <input
      type="file"
      name="image"
      id="image"
      accept="image/*"
      onChange={handleImageChange}
    />
  </div>

  <div className="text-center">
    <button
      type="submit"
      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
    >
      {isEdit ? "Save Changes" : "Add Post"}
    </button>
  </div>
</form>

    </div>
  )
}
