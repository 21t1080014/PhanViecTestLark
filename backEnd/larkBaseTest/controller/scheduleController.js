const scheduleService = require("../service/scheduleService"); // Đảm bảo đúng tên thư mục 'service' của bạn

const scheduleController = {
  async handleLarkWebhook(req, res) {
    try {
      const larkData = req.body;
      console.log("📥 Thêm mới record:", larkData);
      res.status(200).json({
        message: "Đã nhận thêm mới thành công!",
        receivedData: larkData,
      });
    } catch (error) {
      console.error("❌ Lỗi POST:", error);
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  },

  async handleLarkUpdate(req, res) {
    try {
      const larkData = req.body;
      console.log("✏️ Cập nhật record:", larkData);
      res.status(200).json({
        message: "Đã nhận cập nhật thành công!",
        receivedData: larkData,
      });
    } catch (error) {
      console.error("❌ Lỗi PUT:", error);
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  },

  async handleLarkDelete(req, res) {
    try {
      const larkData = req.body;
      console.log("🗑️ Xóa record:", larkData);
      res.status(200).json({
        message: "Đã nhận xóa thành công!",
        receivedData: larkData,
      });
    } catch (error) {
      console.error("❌ Lỗi DELETE:", error);
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  },
};

module.exports = scheduleController;
