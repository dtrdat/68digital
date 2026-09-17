# HƯỚNG DẪN DEPLOY WEBSITE 68DIGITAL LÊN AWS & CÁC NỀN TẢNG CLOUD

Website **68DIGITAL** được xây dựng dưới dạng **Static Web (HTML5/CSS3/Vanilla JS thuần)**:
- Không cần máy chủ backend đắt tiền (Node.js/PHP/Python server).
- Tốc độ tải trang siêu nhanh, bảo mật tuyệt đối (không lo bị hack database hay SQL injection).
- Chi phí vận hành gần như **0 VNĐ / tháng**.

---

## ⚠️ BƯỚC CHUẨN BỊ BẮT BUỘC TRƯỚC KHI DEPLOY

### 1. Đồng bộ ảnh Hero 3D số 68 vào thư mục local
Tại thư mục gốc dự án, hãy **nháy đúp chuột vào file**:
👉 [**`copy-hero-images.bat`**](file:///d:/1.%20Work/1.%20D%E1%BB%B1%20%C3%A1n%20%C4%91ang%20l%C3%A0m/Ph%C3%A1t%20%C4%90%E1%BA%A1t%20Digital/copy-hero-images.bat)
*Mục đích*: Tự động sao chép 2 ảnh 3D số 68 vào thẳng thư mục `assets/hero/` để khi đưa lên Hosting/Cloud, ảnh hiển thị hoàn hảo ở mọi nơi.

### 2. Không upload thư mục `_archive/`
Thư mục `_archive/` chứa file nén và tài nguyên cũ (~850MB). Khi deploy, **chỉ cần upload**:
- `index.html`
- Thư mục `css/`
- Thư mục `js/`
- Thư mục `assets/`

---

## CÁCH 1: DEPLOY BẰNG AWS (AMAZON WEB SERVICES)

Trên AWS có 2 phương pháp phổ biến nhất cho web tĩnh:

### Lựa chọn A: AWS Amplify Hosting (Khuyên dùng nhất trên AWS - Nhanh & Tự Động)
AWS Amplify là giải pháp hiện đại của AWS dành riêng cho website tĩnh và frontend:
1. Đăng nhập vào **[AWS Management Console](https://aws.amazon.com/console/)**.
2. Tìm kiếm dịch vụ: **AWS Amplify**.
3. Chọn **Deploy an app** ➔ Chọn nguồn mã nguồn:
   - **Cách 1 (Kéo thả)**: Chọn *"Deploy without Git provider"* ➔ Nén 4 mục (`index.html`, `css`, `js`, `assets`) thành file `website.zip` và kéo thả vào.
   - **Cách 2 (Khuyên dùng - Tự động CI/CD)**: Đẩy code lên GitHub ➔ Chọn GitHub ➔ Chọn Repository ➔ Nhấn **Deploy**.
4. AWS Amplify sẽ tự động:
   - Cung cấp đường link xem web trực tiếp dạng `https://main.xxxxxx.amplifyapp.com`.
   - Cấp chứng chỉ bảo mật SSL (HTTPS) miễn phí.
   - Cho phép kết nối tên miền riêng (ví dụ: `68digital.vn`) chỉ với vài cú click trong mục **Domain management**.

---

### Lựa chọn B: AWS S3 + CloudFront (Kiến trúc Cloud Chuẩn Doanh Nghiệp)
Dành cho bạn nếu muốn hiểu sâu về kiến trúc hạ tầng AWS (AWS Certified Solution Architect):
1. **Tạo S3 Bucket**:
   - Tên Bucket: Trùng tên domain (ví dụ: `68digital.vn`).
   - Bật tính năng **Static website hosting** (Index document: `index.html`).
   - Tải các file (`index.html`, `css/`, `js/`, `assets/`) lên S3.
2. **Cấu hình AWS CloudFront (CDN toàn cầu)**:
   - Tạo một **CloudFront Distribution**, chọn Origin trỏ về S3 Bucket.
   - Sử dụng **Origin Access Control (OAC)** để bảo mật Bucket (chặn truy cập trực tiếp vào S3, chỉ cho phép đi qua CloudFront).
3. **Cài đặt SSL miễn phí qua AWS Certificate Manager (ACM)**:
   - Yêu cầu chứng chỉ SSL miễn phí cho tên miền tại vùng `us-east-1 (N. Virginia)`.
4. **Trỏ tên miền (Route 53 hoặc Cloudflare)**:
   - Tạo bản ghi CNAME hoặc Alias A trỏ về link CloudFront (`dxxxxxx.cloudfront.net`).

*Ưu điểm*: Chi phí siêu rẻ (~$0.1 - $0.5/tháng), chịu tải hàng triệu lượt truy cập đồng thời không bao giờ sập.

---

## CÁCH 2: CÁC NỀN TẢNG MIỄN PHÍ TRỌN ĐỜI KHÁC (ĐỂ THAM KHẢO)

Nếu bạn muốn deploy trong vòng 60 giây mà không cần cấu hình thẻ tín dụng hay thiết lập phức tạp trên AWS:

1. **Vercel ([https://vercel.com](https://vercel.com))**:
   - Kéo thả cả thư mục dự án vào Dashboard hoặc liên kết qua GitHub.
   - Tốc độ mạng cực nhanh, hỗ trợ SSL tự động, đổi tên miền riêng trong 10 giây.
2. **Cloudflare Pages ([https://pages.cloudflare.com](https://pages.cloudflare.com))**:
   - Miễn phí băng thông không giới hạn (Unlimited Bandwidth).
   - Có Datacenter tại Hà Nội & TP. Hồ Chí Minh nên tốc độ mở web tại Việt Nam nhanh nhất hiện nay.
