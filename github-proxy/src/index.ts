export default {
  async fetch(request: Request, env: any): Promise<Response> {
    try {
      const response = await fetch(
        "https://api.github.com/repos/EclipsesDev/ECLIPSES_API/contents/changelog.txt",
        {
          headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.raw",
            "User-Agent": "Cloudflare-Worker",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("GitHub error:", response.status, errorText);
        return new Response("Failed to fetch changelog", { status: 500 });
      }

      const text = await response.text();

      return new Response(text, {
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "https://eclipsesdev.my.id",
        },
      });
    } catch (err) {
      console.log("Worker crash:", err);
      return new Response("Server error", { status: 500 });
    }
  },
};