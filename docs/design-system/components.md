# Danh Mục Thành Phần Giao Diện (Component Library Specs)

Tài liệu đặc tả các UI Component cốt lõi theo phong cách **Soft Bento Minimalism**, tích hợp sẵn Tailwind CSS & Framer Motion.

---

## 1. Top Navbar / Header Bar
* **Vị trí:** Tích hợp trực tiếp bên trong cạnh trên của khối Hero card (`rounded-[40px]`).
* **Thành phần:**
  * **Email & Quick Actions (Trái):**
    * Text email: `contact@vinguyen.id.vn`
    * Nút `Copy` (sao chép vào clipboard kèm Toast checkmark).
    * Nút `CV` (mở / tải resume PDF).
  * **Social Navigation (Phải):**
    * Các link tối giản: `GitHub` / `LinkedIn` / `Email`.
* **State & Motion:**
  * Pill buttons sử dụng `pillButtonVariants` từ `@/lib/motion`.

---

## 2. Hero Section
* **Khối Avatar & Floating Badge:**
  * Avatar hình tròn (kích thước `w-16 h-16 md:w-20 md:h-20`), bo viền xám mềm `border-2 border-zinc-100`.
  * Sticker Badge nổi góc: `Vi Nguyen 👋` hoặc `Available for work 🟢`, sử dụng `floatingBadgeAnimation` để bập bồng nhẹ.
* **Tiêu đề chính (H1):**
  * Typography: `text-3xl md:text-5xl font-bold tracking-tight text-zinc-950 text-center max-w-2xl mx-auto`.
  * Nội dung: *"Building robust backend architectures, high-performance APIs, and modern systems."*
* **Nút hành động chính (Primary CTA):**
  * Nút viên thuốc màu đen: `Explore Projects ↗` (`bg-zinc-900 text-white rounded-full px-6 py-3`).

---

## 3. Tech Stack Marquee (Dải Công Nghệ Vô Tận)
* **Vị trí:** Nằm ngay dưới Hero card hoặc phân cách giữa Hero và Capabilities.
* **Cách hoạt động:** Dải logo trượt ngang vô tận (CSS infinite marquee hoặc Framer Motion x transition).
* **Danh sách công nghệ:**
  * Backend: `NestJS`, `Spring Boot`, `Node.js`, `Express`
  * Database & Cache: `PostgreSQL`, `MySQL`, `Redis`
  * Frontend & Cloud: `Next.js 15`, `TypeScript`, `Tailwind CSS`, `Docker`

---

## 4. Capabilities / Services Grid (Lưới 4 Trụ Cột)
* **Bố cục:** Lưới 4 cột trên desktop (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`).
* **Mỗi Card thành phần:**
  * Icon viền nét tối giản (sử dụng `lucide-react`: `Server`, `Database`, `Layers`, `ShieldCheck`).
  * Tiêu đề trụ cột (`font-semibold text-zinc-900 text-base`).
  * Đoạn mô tả năng lực 2-3 dòng (`text-xs md:text-sm text-zinc-500 leading-relaxed`).
* **Motion:** Hover nhấc nhẹ (`y: -3px`) với hiệu ứng `cardHoverVariants`.

---

## 5. Featured Projects Bento Showcase
* **Bố cục:** Thẻ dạng Bento Box bo góc lớn `rounded-3xl` có độ tương phản mềm:
  * **StudyMate LMS:** Khối lớn nổi bật (Hero feature).
  * **VietSneaker & HCMC Metro:** 2 khối ngang kế bên.
  * **Slack Realtime:** Khối tính năng công nghệ chuyên sâu.
* **Mỗi Card dự án gồm:**
  * Tag phân loại công nghệ (Pill tags: e.g. `NestJS`, `PostgreSQL`, `Clerk`).
  * Tên dự án & 1 câu tóm tắt giá trị.
  * Ảnh chụp giao diện hoặc sơ đồ kiến trúc thu nhỏ.
  * Nút xem chi tiết Case Study (`View Case Study ↗`).

---

## 6. Contact & Action Bento Card
* **Bố cục:** Thẻ riêng biệt ở đáy trang (`bg-white rounded-[40px] p-8 md:p-14 text-center border border-zinc-200/60`).
* **Thành phần:**
  * Biểu tượng bàn tay bắt tay hoặc icon tin nhắn (`🤝`).
  * Tiêu đề: *"Tell me about your next project or role"*
  * Lời ngỏ: Sẵn sàng trao đổi cơ hội việc làm Backend / Full-stack Developer.
  * Nhóm nút liên hệ:
    * `Email Me` (Nút đen nổi bật).
    * `LinkedIn` / `GitHub` (Nút trắng viền mảnh).

---

## 7. Minimal Footer
* Dải 1 hàng tinh tế:
  * Trái: `© 2026 Vi Nguyen. All rights reserved.`
  * Phải: Navigation liên kết nhanh.
