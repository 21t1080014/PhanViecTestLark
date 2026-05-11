const scheduleService = require("../service/scheduleService"); // Đảm bảo đúng tên thư mục 'service' của bạn

const scheduleController = {
  // Hàm này chuyên đứng đợi Lark Base gọi sang (Webhook)
  async handleLarkWebhook(req, res) {
    try {
      // Dữ liệu từ Lark Base Automation gửi sang sẽ nằm trong req.body
      const larkData = req.body;
      console.log("📥 Đã nhận được tín hiệu từ Lark Base:", larkData);

      // Ví dụ: Lấy tên và trạng thái từ dữ liệu Lark gửi sang để xử lý logic
      // (Sau này chúng ta sẽ bóc tách dữ liệu chuẩn xác khi biết cấu trúc Lark gửi)
      // const { name, status } = larkData;
      // await scheduleService.addSchedule(name, status);

      // Bắt buộc phải phản hồi về cho Lark biết là "Tôi đã nhận được" (Status 200)
      res.status(200).json({
        message: "Node.js đã nhận thông tin thành công!",
        receivedData: larkData,
      });
    } catch (error) {
      console.error("❌ Lỗi khi xử lý webhook:", error);
      res.status(500).json({ error: "Lỗi hệ thống Node.js" });
    }
  },
};

module.exports = scheduleController;
