# Lab 3: Appserver and Database

## Hướng dẫn cài đặt và chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình MongoDB

Cập nhật connection string MongoDB trong các file:
- `index.js` (dòng 8): `MONGODB_URI`
- `db/dbLoad.js` (dòng 7): `MONGODB_URI`

Hoặc set biến môi trường:
```bash
export MONGODB_URI="mongodb://localhost:27017/photo-sharing"
# hoặc cho MongoDB Atlas:
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/photo-sharing"
```

### 3. Load dữ liệu vào database

```bash
node ./db/dbLoad.js
```

### 4. Chạy backend server

```bash
node index.js
```

Server sẽ chạy tại `http://localhost:3001`

### 5. Chạy frontend

Trong terminal khác:

```bash
npm start
```

Frontend sẽ chạy tại `http://localhost:3000`

### 6. Cấu hình API URL (nếu cần)

Nếu backend chạy ở port khác, cập nhật trong các component:
- `src/components/UserList/index.jsx`
- `src/components/UserDetail/index.jsx`
- `src/components/UserPhotos/index.jsx`

Hoặc set biến môi trường:
```bash
export REACT_APP_API_URL="http://localhost:3001"
```

## API Endpoints

- `GET /user/list` - Lấy danh sách users (chỉ _id, first_name, last_name)
- `GET /user/:id` - Lấy thông tin chi tiết của user
- `GET /photosOfUser/:id` - Lấy photos của user kèm comments

