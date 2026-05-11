const express = require("express");
const scheduleController = require("./controller/scheduleController");

// Khởi tạo ứng dụng Express
const app = express();

// Cho phép Server đọc được dữ liệu JSON (Rất quan trọng để nhận Webhook)
app.use(express.json());

// ----------------------------------------------------
// ĐỊNH TUYẾN (ROUTER) - Tương đương @RestController
// ----------------------------------------------------

// Mở một "cổng API" để Lark Base bắn tín hiệu (Webhook) vào đây
app.post("/api/webhook/lark", scheduleController.handleLarkWebhook);
app.put("/api/webhook/lark", scheduleController.handleLarkUpdate); // Cập nhật
app.delete("/api/webhook/lark", scheduleController.handleLarkDelete); // Xóa
// ----------------------------------------------------
// KHỞI ĐỘNG SERVER
// ----------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log("========================================");
  console.log(`🚀 HỆ THỐNG BACKEND NODE.JS ĐÃ KHỞI ĐỘNG!`);
  console.log(`📡 Server đang chạy tại cổng: ${PORT}`);
  console.log(
    `⏳ Đang lắng nghe tín hiệu từ Lark Base tại: http://localhost:${PORT}/api/webhook/lark`,
  );
  console.log("========================================");
});
module.exports = app;
