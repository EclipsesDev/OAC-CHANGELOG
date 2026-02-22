export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const response = await fetch(
      "https://api.github.com/repos/EclipsesDev/ECLIPSES_API/contents/changelog.txt",
      {
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw"
        }
      }
    );

    if (!response.ok) {
      return new Response("Failed to fetch changelog", { status: 500 });
    }

    const text = await response.text();

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};