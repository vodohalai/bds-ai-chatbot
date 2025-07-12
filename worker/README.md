# Cloudflare Worker Backend

## Mục đích
Xử lý API chat, nhận câu hỏi từ frontend, gọi AutoRAG và trả về câu trả lời.

## Cấu trúc
- `src/index.js`: Entry point cho Worker
- `wrangler.toml`: Cấu hình triển khai Worker

## Triển khai
1. Cập nhật `account_id` trong `wrangler.toml`
2. Chạy lệnh `npx wrangler dev` để phát triển local
3. Chạy lệnh `npx wrangler publish` để deploy lên Cloudflare

## Lưu ý
- Thay thế endpoint AutoRAG thực tế trong `src/index.js` nếu cần.