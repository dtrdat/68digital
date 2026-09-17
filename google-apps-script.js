/**
 * GOOGLE APPS SCRIPT CHO FORM LIÊN HỆ 68DIGITAL
 * 
 * Chức năng:
 * 1. Tự động thêm khách hàng mới vào 1 dòng trong Google Sheet.
 * 2. Tự động gửi email thông báo tức thì đến dtrdat.work@gmail.com khi có người điền form.
 * 
 * Hướng dẫn cài đặt trong 2 phút:
 * 1. Mở Google Drive -> Tạo 1 file Google Sheets mới (Ví dụ: "Khach_Hang_68DIGITAL").
 * 2. Đặt tiêu đề cho hàng 1:
 *    Cột A: Thời Gian | Cột B: Họ Tên | Cột C: Số Điện Thoại | Cột D: Dịch Vụ | Cột E: Ngân Sách | Cột F: Lời Nhắn
 * 3. Trên menu Google Sheet, chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 4. Xóa hết code cũ, dán toàn bộ đoạn code dưới đây vào.
 * 5. Bấm "Triển khai" (Deploy) -> "Triển khai mới" (New deployment).
 *    - Loại: Ứng dụng web (Web app)
 *    - Thực thi dưới dạng: Tôi (Me)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)
 * 6. Bấm "Triển khai", cấp quyền cho script, sau đó copy URL Web App được tạo ra.
 * 7. Dán URL đó vào biến `googleSheetWebhookUrl` trong file `js/main.js` của website!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    var timestamp = data.timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    var name = data.name || '';
    var phone = data.phone || '';
    var service = data.service || '';
    var budget = data.budget || '';
    var message = data.message || '';

    // 1. Thêm dòng mới vào Google Sheet
    sheet.appendRow([timestamp, name, phone, service, budget, message]);

    // 2. Gửi email thông báo tức thì về Gmail của bạn
    var recipientEmail = "dtrdat.work@gmail.com";
    var emailSubject = "🔥 [68DIGITAL] KHÁCH HÀNG MỚI: " + name + " - " + phone;
    var emailBody = "Bạn vừa nhận được một yêu cầu tư vấn mới từ website 68DIGITAL:\n\n" +
                    "-------------------------------------------\n" +
                    "👤 Họ và Tên: " + name + "\n" +
                    "📞 Số điện thoại: " + phone + "\n" +
                    "🎯 Dịch vụ quan tâm: " + service + "\n" +
                    "💰 Ngân sách: " + budget + "\n" +
                    "📝 Ghi chú: " + message + "\n" +
                    "⏰ Thời gian gửi: " + timestamp + "\n" +
                    "-------------------------------------------\n\n" +
                    "👉 Gọi ngay cho khách: " + phone + "\n" +
                    "👉 Hoặc mở Zalo để kết bạn: https://zalo.me/" + phone.replace(/[^0-9]/g, '');

    MailApp.sendEmail(recipientEmail, emailSubject, emailBody);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
