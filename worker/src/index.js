export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/chat") {
      try {
        const { user_message } = await request.json();
        // Gọi AutoRAG API (giả lập, cần thay thế endpoint thực tế)
        const aiRes = await fetch("https://api.cloudflare.com/autorag/aisearch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: user_message })
        });
        const aiData = await aiRes.json();
        return new Response(JSON.stringify({ answer: aiData.answer || "(Không có phản hồi từ AI)" }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ answer: "Đã xảy ra lỗi khi truy vấn AI." }), {
          headers: { "Content-Type": "application/json" },
          status: 500
        });
      }
    }
    return new Response("Not found", { status: 404 });
  }
};