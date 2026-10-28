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

### CMS & Quản trị Nội dung Toàn diện (Sanity.io Cloud CMS)
* **Tài khoản cá nhân chính thức:** Đã kết nối với dự án Sanity cá nhân:
  * **Project ID:** `in94orx5`
  * **Dataset:** `production`
  * **Studio URL:** `/studio` (nhúng trực tiếp bên trong ứng dụng Next.js tại `http://localhost:3000/studio`)
  * **Gói dịch vụ & Chi phí:** Sanity tự động tặng 30 ngày dùng thử Growth (Trial) không yêu cầu thẻ tín dụng; sau 30 ngày tự động chuyển về **Gói Free vĩnh viễn (0 VNĐ)** với hạn mức 100,000 API requests/tháng, 10 GB CDN bandwidth, 20 users — hoàn toàn đủ cho website portfolio cá nhân.
  * **Đồng bộ dữ liệu tự động (Automated Seeding):**
    * Đã thực thi script [`scripts/seed-sanity.mjs`](file:///home/levi/Desktop/Projects/Dopefolio/scripts/seed-sanity.mjs) đưa toàn bộ 4 dự án (`Slack Chat Platform`, `Metro HCMC`, `VietSneaker`, `StudyMate`) và hồ sơ cá nhân `profile-main` lên Sanity Cloud.
    * Tải trực tiếp 22 ảnh chụp màn hình dự án và avatar lên Sanity Asset CDN (`cdn.sanity.io`).
  * **Toàn quyền biên tập 100% nội dung:**
    * Mọi nội dung trên website (Slogan Hero, Bio giới thiệu, 4 trụ cột Capabilities, Dải chạy công nghệ Marquee, Bộ kỹ năng Skills, Thông tin & Link liên hệ Contact, Thư viện ảnh Screenshot Gallery) đều được quản lý động qua Sanity Studio.
    * Cơ chế Fallback an toàn vào [`lib/defaultData.ts`](file:///home/levi/Desktop/Projects/Dopefolio/lib/defaultData.ts) đảm bảo website luôn hiển thị đẹp mắt kể cả khi ngoại tuyến hoặc chưa publish dữ liệu mới.
  * **Tối ưu giao diện Studio:** Tích hợp tỉ lệ hiển thị mặc định `zoom: 1.35` tại [`app/studio/[[...tool]]/page.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/app/studio/[[...tool]]/page.tsx) giúp chữ và form nhập liệu to rõ, dễ thao tác trên màn hình lớn/độ phân giải cao mà không cần ấn `Ctrl + +`.
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
  * Đã tích hợp thư viện **`lenis` (Lenis Smooth Scroll)** theo chuẩn kiến trúc từ `benjaminsharvell` qua [`components/SmoothScrollProvider.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/SmoothScrollProvider.tsx) với thông số vật lý đầm chắc (`lerp: 0.08`, `duration: 1.4`, `wheelMultiplier: 0.85`), mang lại cảm giác cuộn có sức nặng, quán tính và độ đầm tay cao cấp trên toàn bộ trang. Đã cô lập route `/studio` để không gây xung đột cuộn trong trang quản trị Sanity.
  * Đã khắc phục triệt để cảnh báo deprecation của Dart Sass trong terminal thông qua cấu hình `silenceDeprecations: ['legacy-js-api', 'import']` tại [`next.config.mjs`](file:///home/levi/Desktop/Projects/Dopefolio/next.config.mjs).
  * Đã triển khai xong **Bước 4**: Component [`components/StackingProjectsSection.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/StackingProjectsSection.tsx):
    * **Hiệu ứng xòe thẻ chéo sang phải (Diagonal Stepped Deck Fan)**: Kết hợp `xOffset = index * 14px` và độ xoay nhẹ `rotateDeg = index * 0.6deg` với tâm xoay `origin-top-left`, giúp các thẻ phía sau (`03`, `02`, `01`) nhô chéo sang phía trên-phải tự nhiên như một bộ bài thực tế mà không bị che khuất hay đơn điệu.
    * Đặt bước nhảy cố định `topOffset = 48px + index * 32px` với `zIndex` tăng dần, cố định 100% bề ngang thẻ để toàn bộ 4 vòm cong bậc thang phía sau luôn lộ diện sắc nét.
    * Xóa bỏ khoảng trống giả lập khổng lồ (`pb-[80vh]`), đưa nhịp nối giữa Featured Work và Background & Mindset về tự nhiên, liền mạch, không còn khoảng xám trống trải.
    * Sửa nút **Code** và **Live Demo** có padding rộng rãi (`px-5 py-3 text-sm sm:text-base`) cân xứng với nút **Case Study**, không còn bị hẹp hay chật chội.
  * Đã bổ sung tài liệu kỹ thuật **Cuộn Quán Tính & Thẻ Xếp Lớp (Heavy Inertia Scroll & Sticky Deck - Cảm hứng từ Benjamin Sharvell)** vào tài liệu hệ thống tại [`docs/design-system/animation.md`](file:///home/levi/Desktop/Projects/Dopefolio/docs/design-system/animation.md).
  * Đã hoàn tất nâng cấp **Trang Chi Tiết Dự Án ([`/projects/[slug]`](file:///home/levi/Desktop/Projects/Dopefolio/app/projects/[slug]/page.tsx))** sang toàn bộ ngôn ngữ **Soft Bento**:
    * **Thanh Header kính mờ (Glassmorphic Floating Nav)**: Tinh tế, bo tròn viên thuốc (`rounded-full bg-white/90 backdrop-blur-md`), tích hợp nút lùi về danh sách dự án.
    * **Hero Bento Card dự án**: Tiêu đề lớn, tóm tắt kiến trúc, cụm nút Live Demo / Backend Repo / Frontend Repo đồng bộ chuẩn Soft Bento.
    * **Khung Mockup Preview tương tác**: Kích thước lớn, bo cong viền mềm mại, hỗ trợ click xem toàn màn hình qua Lightbox cao cấp.
    * **Cấu trúc Bento 2 cột (Architecture Narrative & Specifications)**: Cột trái trình bày chi tiết kiến trúc và giải pháp kỹ thuật; Cột phải hiển thị danh mục công nghệ (`Tools & Technologies`) và liên kết truy cập nhanh.
    * **Bento Thư viện ảnh chụp thực tế (Screenshot Gallery)**:
      * Lưới ảnh sắc nét trên Desktop và **iOS-style Touch/Drag Swipeable Carousel** trên điện thoại di động (vuốt trượt ảnh mượt mà kèm thanh pagination dots).
      * Lightbox Modal toàn màn hình có hiệu ứng làm mờ nền sâu (`backdrop-blur-xl`), nút đóng tinh tế và hỗ trợ phím `ESC`.
    * **Thẻ chuyển tiếp dự án kế tiếp (Next Project Bento Card)**: Cho phép chuyển trang mượt mà liên tục.
    * Tích hợp [`components/MinimalFooter.tsx`](file:///home/levi/Desktop/Projects/Dopefolio/components/MinimalFooter.tsx) đồng bộ toàn trang.
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

- [x] **Theo dõi duyệt hồ sơ tên miền:** Hồ sơ `Bản Khai` trên [id.matbao.net](https://id.matbao.net) đã được phê duyệt chính thức (`Đã duyệt`).
- [x] **Cấu hình DNS Tên miền:**
  * Đã tạo bản ghi `A` (`@` ➔ `76.76.21.21`) và `CNAME` (`www` ➔ `cname.vercel-dns.com`) trên Mắt Bão.
  * Tên miền đã phân giải DNS thành công qua Anycast toàn cầu.
- [x] **Triển khai Portfolio lên Vercel:**
  * Dự án đã được deploy chính thức tại **`https://vinguyen.id.vn`** (và `https://www.vinguyen.id.vn`).
  * Chứng chỉ bảo mật SSL/HTTPS tự động kích hoạt bởi Vercel (`HTTP/2 200 OK`).
  * Tích hợp CI/CD tự động: mỗi khi push code lên GitHub, Vercel tự động build và deploy bản mới nhất.
- [ ] **Cấu hình Email tên miền (Tùy chọn):**
  * Tạo các hòm thư chính như `contact@vinguyen.id.vn` hoặc `me@vinguyen.id.vn` trên cổng Email Pro v4 của Mắt Bão nếu cần.
