# Dopefolio Design System

Hệ thống thiết kế giao diện (Design System) của Portfolio **Nguyễn Đức Vĩ**, xây dựng theo ngôn ngữ **Soft Bento Minimalism** với các khối thẻ bo cong lớn, màu sắc ấm tinh tế và vi tương tác lò xo tự nhiên (Spring micro-interactions).

---

## Cấu Trúc Tài Liệu

| Tài liệu | Nội dung chính |
| :--- | :--- |
| **[tokens.md](./tokens.md)** | Bảng màu (Color Tokens), kiểu chữ (Typography), bán kính bo góc (Radii), đổ bóng (Shadows) |
| **[components.md](./components.md)** | Đặc tả chi tiết từng thành phần: Header, Hero, Pill Buttons, Bento Grid, Tech Marquee, Contact Card |
| **[animation.md](./animation.md)** | Thông số vật lý lò xo (Spring Physics), kịch bản Stagger Reveal, code mẫu Framer Motion |

---

## Công Nghệ Sử Dụng

* **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
* **Styling:** Tailwind CSS
* **Animation & Motion:** `framer-motion` (presets tập trung tại `@/lib/motion.ts`)
* **Icons:** `lucide-react`
* **CMS:** Sanity CMS
