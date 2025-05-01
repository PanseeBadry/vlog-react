import express from 'express';
import cors from 'cors';
import { postModel } from './database/models/postModel.js';
import { userModel } from './database/models/userModel.js';
import { connection } from './database/dbConnection.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
connection();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY; 
const CLIENT_URL = process.env.CLIENT_URL; 
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.get('/posts', async (req, res) => {
  const posts = await postModel.find({});
  res.json(posts);
});

app.get('/users', async (req, res) => {
  const users = await userModel.find({});
  res.json(users);
});

app.get('/user', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    // console.log(token)
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      try {
        const user = await userModel.findById(decoded.id);
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching user data',error });
      }
    });
  });
  
  

app.post('/posts', async (req, res) => {
    try {
      const { userId, title, body, image } = req.body;
  
      if (!userId || !title || !body) {
        return res.status(400).json({ error: 'userId, title, and body are required.' });
      }
  
      const newPost = new postModel({
        userId,
        title,
        body,
        image,
        time: new Date().toLocaleString()  
      });
  
      const savedPost = await newPost.save();
  
      res.status(201).json({
        message: 'Post added successfully!',
        post: savedPost
      });
    } catch (error) {
      console.error('Error adding post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body, image } = req.body;
    
    try {
      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        { title, body, image },
        { new: true }   
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });

  app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPost = await postModel.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  
  
  



app.post('/register', async (req, res) => {
  const { username, email, password, name ,avatar} = req.body;

  if (!username || !email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await userModel.findOne({
    $or: [{ email }, { name }]
  });

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = new userModel({
    username,
    email,
    password,
    name,
    avatar
  });

  await newUser.save();

  return res.status(201).json({ message: 'User registered successfully', user: newUser });
});


app.post('/login', async (req, res) => {
    try {
    //   console.log("req.bodyyyyy", req.body);
      const { username, password } = req.body;
  
      const user = await userModel.findOne({ username, password });
      // console.log(user);
  
      if (user) {
        const token = jwt.sign(
          { id: user._id, username: user.username },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
  
        return res.status(200).json({
          message: 'Login successful!',
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error("Login error:", error);  
      res.status(500).json({ message: "Server error" });
    }
  });
  
  const PORT = process.env.PORT || 3000; 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
