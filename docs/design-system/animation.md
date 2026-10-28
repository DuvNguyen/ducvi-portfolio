# Hướng Dẫn Kỹ Thuật Animation & Micro-Interactions (Motion System)

> **Thư viện cốt lõi:** `framer-motion` (hoặc `motion/react`) + Tailwind CSS  
> **Triết lý chuyển động:** Tinh giản, nhanh gọn, tự nhiên dựa trên **Spring Physics (vật lý lò xo)** — không gây chóng mặt, chỉ nhấn mạnh vào độ nhạy tương tác.

---

## 1. Thông Số Chuyển Động Chuẩn (Spring Tokens)

| Loại Tương Tác | Type | Stiffness (Độ cứng) | Damping (Độ cản) | Mass | Cảm giác mang lại |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pill Button Hover/Tap** | `spring` | `400` | `25` | `1` | Nảy nhanh, dứt khoát khi click |
| **Card Lift / Hover** | `spring` | `250` | `20` | `1` | Nâng nhẹ tự nhiên như nổi trên bề mặt |
| **Page Entry / Reveal** | `spring` | `120` | `18` | `1` | Êm dịu, vào khung hình mượt mà |
| **Floating Sticker Badge** | `tween` | Dạng loop `ease: "easeInOut"` | `duration: 3s` | — | Bập bồng nhẹ nhàng vô tận |

---

## 2. Kịch Bản Chuyển Động Từng Khối (Motion Choreography)

### A. Xuất hiện khi tải trang (Hero & Staggered Reveal)
Khi người dùng vừa vào trang, các khối không xuất hiện đồng loạt mà xuất hiện so le (Staggered fade-up):
1. **Container chính:** Nở nhẹ từ scale `0.98` lên `1` + Fade in (`opacity: 1`).
2. **Avatar & Badge:** Nảy nhẹ lên từ dưới.
3. **Hero Title & Mô tả:** Trượt nhẹ lên 15px theo thứ tự cách nhau `0.08s`.
4. **Pill Buttons:** Fade in cuối cùng.

```tsx
// Variant mẫu cho Stagger Container
export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: [0.16, 1, 0.3, 1], // Custom cubic bezier chuẩn mượt
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
```

---

### B. Nút Bấm Viên Thuốc (Pill Buttons: Copy, CV, Explore)
Nút bấm phản hồi tức thì với thao tác chuột hoặc chạm trên điện thoại:

```tsx
import { motion } from 'framer-motion';

export function PillButton({ children, onClick, dark = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
        dark
          ? "bg-zinc-900 text-white hover:bg-zinc-800"
          : "bg-white text-zinc-900 border border-zinc-200/80 hover:bg-zinc-50"
      }`}
    >
      {children}
    </motion.button>
  );
}
```

---

### C. Nút Sao Chép Email 1-Click (Copy Email Micro-interaction)
Khi ấn **Copy**, trạng thái chuyển đổi mượt sang icon dấu tích xanh `✓ Copied!`:

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CopyEmailButton({ email = "contact@vinguyen.id.vn" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-800 shadow-2xs hover:bg-zinc-50"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="text-emerald-600 font-semibold"
          >
            ✓ Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
```

---

### D. Hiệu Ứng Sticker Nổi Bập Bồng (Avatar Floating Badge)
Huy hiệu `Vi Nguyen 👋` hoặc `Available for work 🟢` bập bồng nhẹ nhàng liên tục để tạo sự sống động:

```tsx
<motion.div
  animate={{
    y: [0, -6, 0],
    rotate: [0, 1.5, 0],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute -right-4 -top-2 rounded-full border border-zinc-100 bg-white/95 px-3 py-1 text-xs font-semibold shadow-md backdrop-blur-xs"
>
  Vi Nguyen 👋
</motion.div>
```

---

### E. Dải Logo Công Nghệ Trượt Vô Tận (Infinite Tech Marquee)
Dải tech stack logo (`NestJS`, `Spring Boot`, `PostgreSQL`, `Redis`, `Next.js`) trượt ngang êm ái:

```tsx
// Sử dụng Tailwind CSS Marquee Animation
// Trong tailwind.config:
// keyframes: { marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } } }
// animation: { marquee: 'marquee 25s linear infinite' }

<div className="relative flex overflow-x-hidden border-y border-zinc-100 py-6">
  <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-12">
    {techLogos.map((tech) => (
      <span key={tech.name} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
        {tech.icon}
      </span>
    ))}
  </div>
</div>
```

---

### F. Thẻ Dự Án Bento Hover Lift (Project Cards)
Khi rê chuột vào case study dự án:
* Khối thẻ nhấc nhẹ lên 4px (`y: -4px`).
* Viền chuyển từ mờ sang nét tinh tế.
* Ảnh thumbnail bên trong phóng to nhẹ (`scale: 1.025`).

```tsx
<motion.div
  whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.07)" }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="group relative overflow-hidden rounded-[28px] border border-zinc-200/70 bg-white p-6 transition-colors"
>
  {/* Content */}
</motion.div>
```

---

## 3. Checklist Cài Đặt Cho Dự Án Next.js

1. Cài đặt thư viện:
   ```bash
   npm install framer-motion lucide-react
   ```
2. Thêm file helper: `lib/motion.ts` để lưu toàn bộ các variant dùng chung.
3. Sử dụng directive `'use client'` trên các component tương tác có animation.
