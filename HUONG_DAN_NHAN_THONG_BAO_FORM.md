# HƯỚNG DẪN CẤU HÌNH NHẬN DỮ LIỆU TỪ FORM TƯ VẤN - 68DIGITAL

Để nhận được thông tin khách hàng (Họ tên, SĐT, Dịch vụ, Ngân sách, Lời nhắn) ngay khi họ điền form trên website gửi về **Email** hoặc **Google Sheets**, bạn có thể chọn 1 trong 2 cách miễn phí 100% dưới đây:

---

## ⚡ CÁCH 1: Dùng Web3Forms (Khuyên dùng - Nhanh nhất, chỉ mất 30 giây)

Dịch vụ này hoàn toàn miễn phí (250 lượt đăng ký/tháng), không cần tạo tài khoản mật khẩu, dữ liệu gửi thẳng vào hộp thư **`dtrdat.work@gmail.com`**.

### Các bước thực hiện:
1. Truy cập vào trang web: **[https://web3forms.com](https://web3forms.com)**
2. Nhập email của bạn: **`dtrdat.work@gmail.com`** vào ô *"Enter your email"* rồi bấm nút **Create Access Key**.
3. Mở hòm thư Gmail của bạn, bạn sẽ thấy 1 email từ Web3Forms gửi chuỗi **Access Key** (có dạng: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).
4. Mở file [**`js/main.js`**](file:///d:/1.%20Work/1.%20D%E1%BB%B1%20%C3%A1n%20%C4%91ang%20l%C3%A0m/Ph%C3%A1t%20%C4%90%E1%BA%A1t%20Digital/js/main.js), tìm đến dòng `web3formsAccessKey`:
   ```javascript
   const CONTACT_CONFIG = {
     hotline: '0835886635',
     email: 'dtrdat.work@gmail.com',
     ...
     web3formsAccessKey: 'DÁN_ACCESS_KEY_CỦA_BẠN_VÀO_ĐÂY',
   ```
5. Lưu file lại. **XONG!** Từ lúc này, mỗi khi có khách gửi form, điện thoại bạn sẽ có thông báo email mới ngay lập tức.

---

## 📊 CÁCH 2: Lưu tự động vào Google Sheets + Bắn Email (Miễn phí vĩnh viễn, không giới hạn)

Cách này giúp bạn quản lý danh sách khách hàng như một file Excel trên Google Drive, đồng thời Google tự động gửi email thông báo về Gmail cho bạn.

### Các bước thực hiện:
1. Đăng nhập Google Drive -> Tạo 1 file **Google Trang tính (Google Sheets)** mới đặt tên: `Khách Hàng 68DIGITAL`.
2. Tại **Hàng 1**, tạo tiêu đề các cột:
   - **Cột A**: Thời Gian
   - **Cột B**: Họ Tên
   - **Cột C**: Số Điện Thoại
   - **Cột D**: Dịch Vụ Quan Tâm
   - **Cột E**: Ngân Sách
   - **Cột F**: Lời Nhắn
3. Trên thanh menu, chọn: **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.
4. Xóa hết code mặc định trong đó, mở file [**`google-apps-script.js`**](file:///d:/1.%20Work/1.%20D%E1%BB%B1%20%C3%A1n%20%C4%91ang%20l%C3%A0m/Ph%C3%A1t%20%C4%90%E1%BA%A1t%20Digital/google-apps-script.js) trong dự án này, copy toàn bộ và dán vào Apps Script.
5. Nhấn nút **Triển khai (Deploy)** ở góc trên bên phải ➔ Chọn **Triển khai mới (New deployment)**.
   - Chọn loại: **Ứng dụng web (Web app)**.
   - Thực thi dưới dạng: **Tôi (Me / dtrdat.work@gmail.com)**.
   - Ai có quyền truy cập: **Bất kỳ ai (Anyone)**.
6. Nhấn nút **Triển khai** ➔ Cấp quyền truy cập Google Account khi được hỏi.
7. Copy đường dẫn **URL ứng dụng web** (có dạng `https://script.google.com/macros/s/.../exec`).
8. Mở file [**`js/main.js`**](file:///d:/1.%20Work/1.%20D%E1%BB%B1%20%C3%A1n%20%C4%91ang%20l%C3%A0m/Ph%C3%A1t%20%C4%90%E1%BA%A1t%20Digital/js/main.js) và dán vào:
   ```javascript
   googleSheetWebhookUrl: 'DÁN_LINK_WEB_APP_GOOGLE_SCRIPT_VÀO_ĐÂY',
   ```

---

## 💬 TÍNH NĂNG KẾT NỐI ZALO TỨC THÌ (ĐÃ ĐƯỢC TÍCH HỢP SẴN)

Ngay cả khi bạn chưa kịp lấy Key hay cấu hình Webhook:
* Ngay sau khi khách hàng bấm **"Gửi Yêu Cầu Tư Vấn Ngay"**, hệ thống sẽ lập tức hiển thị thông báo gửi thành công và nút:
  > **[💬 Nhấn vào đây để Chat Zalo ngay với 68DIGITAL]**
* Khách bấm vào nút này sẽ tự động mở cửa sổ chat Zalo với số điện thoại **`0835 886 635`** kèm theo tin nhắn đã được điền sẵn:
  > *"Chào 68DIGITAL, tôi là [Họ Tên] (SĐT: [Số ĐT]). Tôi vừa gửi form đăng ký tư vấn dịch vụ [Dịch Vụ]. Nhờ bạn tư vấn giúp tôi nhé!"*
* Điều này giúp khách hàng có thể liên hệ trực tiếp với bạn ngay lập tức mà bạn không lo bị thất lạc thông tin!
