export default {
  async fetch(request) {
    const str = "/";
    const url = new URL(request.url);
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    if (pathname === "/yiyan") {
      const yiyanJsonUrl = env.JSON_URL;

      try {
        const response = await fetch(yiyanJsonUrl, {});

        // 检查 fetch 是否成功
        if (!response.ok) {
          console.error(`Yiyan fetch error: ${response.status} ${response.statusText} for ${yiyanJsonUrl}`);
          return createResponse("Failed to fetch yiyan data.", 502, {}, "text/plain; charset=utf-8");
        }
        const yiyanData = await response.json();
        if (!Array.isArray(yiyanData) || yiyanData.length === 0) {
          console.error("Yiyan data is not a valid non-empty array.");
          return createResponse("Invalid or empty yiyan data.", 500, {}, "text/plain; charset=utf-8");
        }

        const randomIndex = Math.floor(Math.random() * yiyanData.length);
        const selectedYiyan = yiyanData[randomIndex];

        // 检查是否有 'content' 字段
        if (!selectedYiyan || typeof selectedYiyan.content === 'undefined') {
             console.error("Selected yiyan item is invalid or missing 'content'.", selectedYiyan);
             return createResponse("Invalid selected yiyan item.", 500, {}, "text/plain; charset=utf-8");
        }

        // 检查 URL 查询参数 type=text
        if (searchParams.get('type') === 'text') {
          return createResponse(selectedYiyan.content, 200, {}, "text/plain; charset=utf-8");
        } else {
          return createResponse(JSON.stringify(selectedYiyan), 200, {}, "application/json; charset=utf-8");
        }

      } catch (error) {
        console.error("Error processing /yiyan request:", error);
        return createResponse("Internal server error processing yiyan request.", 500, {}, "text/plain; charset=utf-8");
      }
    }

    function createResponse(body, status = 200, headers = {}, contentType = "text/html; charset=utf-8") {
      const responseHeaders = {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
        ...headers
      };
      return new Response(body, { status, headers: responseHeaders });
    }
    return new Response(null, { status: 404 });
  }
  
}