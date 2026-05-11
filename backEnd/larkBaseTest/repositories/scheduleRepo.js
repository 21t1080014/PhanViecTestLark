const axios = require("axios");
// Import hàm lấy token từ file config vừa viết ở trên
const { getValidToken, BASE_TOKEN, TABLE_ID } = require("../config/lark");

// Hàm phụ trợ tạo Header chứa Token
const getHeaders = async () => {
  const token = await getValidToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const scheduleRepo = {
  // 1. ĐỌC: Lấy danh sách lịch
  async getRecords() {
    const headers = await getHeaders();
    const response = await axios.get(
      `https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${TABLE_ID}/records`,
      { headers },
    );
    // Trả về mảng dữ liệu, nếu rỗng thì trả về mảng []
    return response.data.data.items || [];
  },

  // 2. THÊM: Tạo lịch mới
  async createRecord(fields) {
    const headers = await getHeaders();
    const response = await axios.post(
      `https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${TABLE_ID}/records`,
      { fields },
      { headers },
    );
    return response.data.data.record;
  },

  // 3. SỬA: Cập nhật lịch (cần ID của dòng đó)
  async updateRecord(recordId, fields) {
    const headers = await getHeaders();
    const response = await axios.put(
      `https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${TABLE_ID}/records/${recordId}`,
      { fields },
      { headers },
    );
    return response.data.data.record;
  },

  // 4. XÓA: Xóa cứng dữ liệu (cần ID của dòng đó)
  async deleteRecord(recordId) {
    const headers = await getHeaders();
    const response = await axios.delete(
      `https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${TABLE_ID}/records/${recordId}`,
      { headers },
    );
    return response.data;
  },
};

module.exports = scheduleRepo;
