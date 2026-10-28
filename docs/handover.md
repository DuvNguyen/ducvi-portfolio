# Bàn Giao & Tiến Độ Dự Án (Project Handover)

> **Cập nhật ngày:** 28/10/2026  
> **Chủ sở hữu:** Nguyễn Đức Vĩ  
> **Dự án:** Dopefolio Portfolio & Domain Setup  

---

## 🎯 Triết lý & Tầm nhìn (Vision & Guiding Principle)

> *"Make your portfolio reflect your best vision for our future. Always be thinking ahead. Be optimistic. Think about the world that you want to create, because sure enough your dollars and mine, our capital, is helping shape the world."*

---

## 1. Trạng thái Tên miền & Hạ tầng (Domain & Infrastructure)

### Thông tin Tên miền
* **Tên miền:** `vinguyen.id.vn`
* **Nhà đăng ký:** Mắt Bão ([id.matbao.net](https://id.matbao.net))
* **Mã khách hàng / ID:** `MB21909528`
* **Chương trình:** Hỗ trợ tên miền quốc gia cho công dân 18–23 tuổi theo Thông tư 20/2023/TT-BTC.
* **Thời hạn hiệu lực:** **28/10/2026 → 28/10/2028** (Miễn phí 100% trong 2 năm, chi phí 0 VNĐ).
* **Gia hạn tự động:** `Đang tắt` *(Không có rủi ro tự trừ phí).*

### Dịch vụ đi kèm
* **Email Pro v4:** Gói `EmailProv4-HKD` miễn phí 2 năm theo tên miền (đang trỏ tại `s129d209.emailserver.vn`).
* **Web thông báo:** Miễn phí 0 VNĐ.

### Tình trạng Hồ sơ & Bản khai
* **Tình trạng dịch vụ:** `Đang sử dụng` (Active).
* **Bản khai pháp lý / eKYC:** `Chờ duyệt`.
  * *Tiến độ:* Đã ký và gửi hồ sơ điện tử (eKYC) lên Mắt Bão / VNNIC.
  * *Chờ xử lý:* Mắt Bão hoàn tất hậu kiểm hồ sơ danh tính trong giờ làm việc.

---

## 2. Trạng thái Mã nguồn Dự án (Codebase Status)

* **Repository:** `Dopefolio`
* **Git Branch hiện tại:** `next-sanity-migration`
* **Tiến trình kỹ thuật:**
  * Đã cài đặt `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion` và cấu hình tại [`tailwind.config.js`](file:///home/levi/Desktop/Projects/Dopefolio/tailwind.config.js) cùng [`app/globals.css`](file:///home/levi/Desktop/Projects/Dopefolio/app/globals.css).
  * Đã tạo preset chuyển động lò xo tại [`lib/motion.ts`](file:///home/levi/Desktop/Projects/Dopefolio/lib/motion.ts).
  * Đã triển khai xong **Bước 1**: Component [`components/HeroBentoSection.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/HeroBentoSection.tsx) căn chỉnh lại tỉ lệ hài hòa (golden ratio: heading gọn gàng 3 dòng, avatar 96px, top nav cân xứng), tuân thủ nguyên tắc không spam emoji/icon.
  * Đã triển khai xong **Bước 2**: Component [`components/TechMarquee.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/TechMarquee.tsx) dải công nghệ chạy vô tận monochrome tối giản.
  * Đã triển khai xong **Bước 3**: Component [`components/CapabilitiesSection.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/CapabilitiesSection.tsx) lưới 4 trụ cột năng lực (Backend Architecture, Database & Caching, Full-Stack Engineering, Security & Integrations) với micro-interactions hover nhấc nhẹ.
  * Đã tích hợp thư viện **`lenis` (Lenis Smooth Scroll)** theo chuẩn kiến trúc từ `benjaminsharvell` qua [`components/SmoothScrollProvider.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/SmoothScrollProvider.tsx) với thông số vật lý đầm chắc (`lerp: 0.08`, `duration: 1.4`, `wheelMultiplier: 0.85`), mang lại cảm giác cuộn có sức nặng, quán tính và độ đầm tay cao cấp trên toàn bộ trang.
  * Đã triển khai xong **Bước 4**: Component [`components/StackingProjectsSection.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/StackingProjectsSection.tsx):
    * Đặt bước nhảy cố định `topOffset = 48px + index * 32px` với `zIndex` tăng dần, cố định 100% bề ngang thẻ để toàn bộ 4 vòm cong bậc thang phía sau luôn lộ diện sắc nét.
    * Xóa bỏ khoảng trống giả lập khổng lồ (`pb-[80vh]`), đưa nhịp nối giữa Featured Work và Background & Mindset về tự nhiên, liền mạch, không còn khoảng xám trống trải.
  * Đã điều chỉnh **Hệ thống tỉ lệ Typography & Kích thước phân cấp (Visual Hierarchy)** trên toàn bộ website:
    * **Avatar cá nhân**: Tăng từ 96px lên `w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36` (112px–144px) kèm badge tên sắc nét, tạo điểm nhấn cân xứng với tiêu đề chính.
    * **Thanh Header / Top Bar**: Tăng cỡ chữ email lên `text-base`, các nút hành động (Copy, CV) lên `px-4 py-1.5 text-xs sm:text-sm`, và cụm link mạng xã hội lên `text-base` rõ ràng, thanh thoát.
    * **Nội dung Thẻ Dự án (Projects Card)**: Nâng cấp đoạn mô tả dự án từ `text-sm` lên `text-base sm:text-lg text-zinc-600` thoáng mắt, các tag công nghệ lên `text-xs sm:text-sm px-3 py-1.5`, nút hành động (Case Study, Code, Demo) lớn hơn và cân đối hoàn hảo với khối ảnh mockup bên phải.
    * **Các khu vực Capabilities, About & Contact**: Đồng bộ kích thước font chữ nội dung (`text-base sm:text-lg`) và khoảng đệm để hệ thống đạt tỉ lệ đồng đều, không còn cảm giác heading quá to lấn át nội dung quá bé.
  * Đã triển khai xong **Bước 5**:
    * Component [`components/AboutBentoSection.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/AboutBentoSection.tsx) trình bày câu chuyện kỹ thuật và danh mục kỹ năng cốt lõi theo phong cách Bento box 2 cột.
    * Component [`components/ContactBentoSection.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/ContactBentoSection.tsx) thẻ bắt tay liên hệ với tiêu đề lớn *"Tell me about your next project or role"* kèm các nút hành động viên thuốc `Email Me`, `LinkedIn`, `GitHub`.
    * Component [`components/MinimalFooter.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/MinimalFooter.tsx) dải chân trang 1 hàng tối giản.
  * Đã đồng bộ hoàn chỉnh toàn bộ trang chủ [`app/page.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/app/page.tsx) theo ngôn ngữ thiết kế Soft Bento Minimalism và vượt qua kiểm thử build Next.js 100%.
  * Đã tổ chức hệ thống tài liệu thiết kế & chuyển động chuyên biệt tại thư mục [`docs/design-system/`](file:///home/levi/Desktop/Projects/Dopefolio/docs/design-system/README.md).
  * Các file case study dự án trong `docs/`: `Studymate.md`, `metro.md`, `slack.md`, `Vietsneaker.md`, `info.md` và [`docs/system-design/`](file:///home/levi/Desktop/Projects/Dopefolio/docs/system-design/README.md).

---

## 3. Các bước tiếp theo (Next Steps / To-do)

- [ ] **Theo dõi duyệt hồ sơ tên miền:** Kiểm tra trạng thái `Bản Khai` trên [id.matbao.net](https://id.matbao.net) chuyển từ `Chờ duyệt` sang `Đã duyệt`.
- [ ] **Cấu hình DNS Tên miền:**
  * Truy cập `Quản lý tên miền` > `Chi tiết dịch vụ` > `Quản lý DNS` trên Mắt Bão.
  * Thêm bản ghi `A` và `CNAME` để trỏ `vinguyen.id.vn` về dịch vụ hosting (Vercel / GitHub Pages / Cloudflare).
- [ ] **Triển khai Portfolio:**
  * Hoàn thiện migration trên branch `next-sanity-migration`.
  * Deploy dự án lên Vercel và gán custom domain `vinguyen.id.vn`.
- [ ] **Cấu hình Email tên miền:**
  * Tạo các hòm thư chính như `contact@vinguyen.id.vn` hoặc `me@vinguyen.id.vn` trên cổng Email Pro v4 của Mắt Bão.
