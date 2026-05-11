const axios = require("axios");
require("dotenv").config();

const { LARK_APP_ID, LARK_APP_SECRET, BASE_TOKEN, TABLE_ID } = process.env;

let cachedToken = null;
let tokenExpiration = null;

const getValidToken = async () => {
  const now = Date.now();
  // Nếu token cũ vẫn còn hạn (dự phòng 5 phút trước khi hết), thì dùng lại luôn
  if (cachedToken && tokenExpiration && now < tokenExpiration - 300000) {
    return cachedToken;
  }

  try {
    const response = await axios.post(
      "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal",
      {
        app_id: LARK_APP_ID,
        app_secret: LARK_APP_SECRET,
      },
    );
    cachedToken = response.data.tenant_access_token;
    // Đổi thời gian sống (expire) từ giây sang mili giây
    tokenExpiration = now + response.data.expire * 1000;
    return cachedToken;
  } catch (error) {
    console.error("Lỗi cấp Token:", error.response?.data || error.message);
    throw error;
  }
};

// Xuất các biến và hàm để file khác dùng được
module.exports = { getValidToken, BASE_TOKEN, TABLE_ID };
