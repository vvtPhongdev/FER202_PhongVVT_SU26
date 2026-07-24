import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Tự động mở trình duyệt khi chạy `npm start` / `npm run dev`.
    // Nếu không bật, Vite chỉ in URL ra terminal chứ không tự mở trang —
    // dễ khiến người dùng tưởng nhầm là "không hiển thị trang Login" dù
    // server đã chạy đúng, chỉ là chưa có tab trình duyệt nào mở tới nó.
    open: true,
  },
})
