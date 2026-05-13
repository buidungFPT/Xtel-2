# Cách dùng CSS đã tách

1. Copy thư mục `styles` vào trong `src/`.
2. Thay nội dung file `src/App.css` bằng nội dung trong file `App.split.css`.
3. Giữ dòng import trong `App.jsx`:

```jsx
import "./App.css";
```

Cấu trúc sau khi copy:

```txt
src/
├── App.css
└── styles/
    ├── global.css
    ├── user.css
    ├── product.css
    ├── cart.css
    ├── admin-layout.css
    ├── dashboard.css
    ├── admin-product.css
    ├── auth.css
    ├── myorder.css
    └── responsive.css
```
