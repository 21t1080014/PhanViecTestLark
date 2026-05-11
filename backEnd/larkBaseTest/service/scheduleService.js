const scheduleRepo = require("../repositories/scheduleRepo");

const scheduleService = {
  // Xem danh sách ca làm
  async getAllSchedules() {
    console.log("Đang tải dữ liệu từ Lark Base...");
    const records = await scheduleRepo.getRecords();

    if (records.length === 0) {
      console.log("📭 Hiện tại chưa có ca làm việc nào.");
      return;
    }

    console.log("\n--- DANH SÁCH CA LÀM VIỆC ---");
    records.forEach((record) => {
      const id = record.record_id;
      // Lưu ý: Cần sửa 'Name', 'Status' cho đúng tên cột trong bảng Lark Base của bạn
      const name = record.fields.Name || "Chưa có tên";
      const status = record.fields.Status || "N/A";

      // Lark Base lưu Date dưới dạng mili giây (Timestamp)
      const dateVal = record.fields.Date;
      let dateStr = "Không rõ";
      if (dateVal) {
        dateStr = new Date(parseInt(dateVal)).toLocaleDateString("vi-VN");
      }

      console.log(
        `[ID: ${id}] | Nhân viên: ${name} | Ngày: ${dateStr} | Trạng thái: ${status}`,
      );
    });
    console.log("-----------------------------\n");
  },

  // Thêm ca làm mới
  async addSchedule(name, status) {
    console.log(`Đang phân ca cho ${name}...`);
    try {
      const newRecord = await scheduleRepo.createRecord({
        Name: name,
        Status: status,
        Date: Date.now(), // Tự động lấy ngày giờ hiện tại
      });
      console.log(`✅ Đã thêm thành công! ID: ${newRecord.record_id}`);
    } catch (error) {
      console.error("❌ Thêm thất bại:", error.message);
    }
  },

  // Xóa ca làm
  async deleteSchedule(recordId) {
    console.log(`Đang xóa bản ghi ${recordId}...`);
    try {
      await scheduleRepo.deleteRecord(recordId);
      console.log("🗑️ Đã xóa thành công!");
    } catch (error) {
      console.error(
        "❌ Xóa thất bại. Vui lòng kiểm tra lại ID.",
        error.message,
      );
    }
  },
};

module.exports = scheduleService;
