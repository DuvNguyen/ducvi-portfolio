# Kiến Trúc Hệ Thống Các Dự Án (System Design & Architectures)

Tổng hợp kiến trúc hệ thống, mô hình dữ liệu và giải pháp kỹ thuật cho 4 dự án thực tế trong Portfolio của **Nguyễn Đức Vĩ**.

---

## 1. Danh Sách Các Dự Án

| Dự Án | Lĩnh Vực / Loại Hệ Thống | Tech Stack Chính | Case Study Chi Tiết |
| :--- | :--- | :--- | :--- |
| **StudyMate** | E-Learning Platform & Internal Wallet / LMS | NestJS, PostgreSQL, TypeORM, Redis, Clerk, Next.js 15 | [Studymate.md](../Studymate.md) |
| **VietSneaker** | E-Commerce Marketplace & AI Recommendation | Spring Boot, MySQL, Redis, JWT/OAuth2, DeepSeek AI | [Vietsneaker.md](../Vietsneaker.md) |
| **HCMC Metro** | Smart Transit, Automated Ticketing & AI Face Recognition | Node.js, Express, PostgreSQL, TensorFlow.js, PayOS | [metro.md](../metro.md) |
| **Slack Clone** | Real-time Messaging & Collaborative Workspace | Next.js, Node.js, WebSockets / Socket.io | [slack.md](../slack.md) |

---

## 2. Các Mẫu Thiết Kế & Nguyên Lý Áp Dụng (Architectural Patterns)

* **Layered Architecture (Kiến trúc phân tầng):** Tách biệt rạch ròi giữa Controller $\leftrightarrow$ Service $\leftrightarrow$ Repository/DAO, đảm bảo nguyên lý Single Responsibility (SOLID).
* **Role-Based Access Control (RBAC):** Phân quyền đa cấp độ (Admin, Instructor/Manager, Customer/Student) tích hợp cơ chế Guards/Interceptors (NestJS) và Filter Chain (Spring Security).
* **Caching & Performance Optimization:** Ứng dụng Redis để lưu session, cache kết quả truy vấn đắt đỏ và hỗ trợ giới hạn tần suất yêu cầu (Rate Limiting).
* **Webhook & Third-Party Integration:** Xử lý xác thực chữ ký số webhook (Svix, PayOS, Cloudinary) đảm bảo tính toàn vẹn và Idempotency khi thanh toán / đồng bộ người dùng.
