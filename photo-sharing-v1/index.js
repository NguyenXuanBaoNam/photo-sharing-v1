const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./db/userModel");
const Photo = require("./db/photoModel");

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB - thay đổi connection string theo MongoDB Atlas của bạn
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/photo-sharing";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Đã kết nối MongoDB"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// API: /user/list - Trả về danh sách users (chỉ _id, first_name, last_name)
app.get("/user/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name").lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách users" });
  }
});

// API: /user/:id - Trả về thông tin chi tiết của user
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(400).json({ error: "Không tìm thấy user với id này" });
    }
    // Chỉ trả về các trường cần thiết
    const userData = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      location: user.location,
      description: user.description,
      occupation: user.occupation,
    };
    res.json(userData);
  } catch (error) {
    res.status(400).json({ error: "Lỗi khi lấy thông tin user" });
  }
});

// API: /photosOfUser/:id - Trả về photos của user với comments
app.get("/photosOfUser/:id", async (req, res) => {
  try {
    // Kiểm tra user có tồn tại không
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "Không tìm thấy user với id này" });
    }

    // Lấy photos của user
    const photos = await Photo.find({ user_id: req.params.id }).lean();

    // Format lại dữ liệu để match với API spec
    const photosData = photos.map((photo) => {
      const photoData = {
        _id: photo._id,
        user_id: photo.user_id,
        file_name: photo.file_name,
        date_time: photo.date_time,
        comments: [],
      };

      // Format comments với chỉ thông tin tối thiểu của user
      if (photo.comments && photo.comments.length > 0) {
        photoData.comments = photo.comments.map((comment) => ({
          _id: comment._id,
          date_time: comment.date_time,
          comment: comment.comment,
          user: {
            _id: comment.user._id,
            first_name: comment.user.first_name,
            last_name: comment.user.last_name,
          },
        }));
      }

      return photoData;
    });

    res.json(photosData);
  } catch (error) {
    res.status(400).json({ error: "Lỗi khi lấy photos của user" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});

