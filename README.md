# BDS AI Chatbot (Cloudflare)

## Mô tả
Chatbot AI với giao diện hiện đại, thân thiện, tối ưu trải nghiệm người dùng, triển khai toàn bộ trên Cloudflare. Người dùng nhập câu hỏi, hệ thống sử dụng AutoRAG để truy xuất thông tin và trả lời.

## Kiến trúc
- **Frontend**: React (UI giống ChatGPT, tối ưu đa người dùng)
- **Backend**: Cloudflare Worker (API nhận câu hỏi, gọi AutoRAG, trả lời)
- **Triển khai**: Toàn bộ trên Cloudflare (Pages + Workers)

## Khởi tạo dự án
1. Cài đặt [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
2. Cài đặt Node.js >= 18
3. Chạy lệnh `npm install` ở thư mục gốc

## Cấu trúc thư mục
- `/frontend`: React UI
- `/worker`: Cloudflare Worker backend

## Triển khai
- Xem hướng dẫn chi tiết trong từng thư mục.