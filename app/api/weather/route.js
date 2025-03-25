import axios from "axios";

export async function GET(req) {
  try {
    
    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      return new Response(
        JSON.stringify({ message: "City query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_OPENWEATHER_API_URL;

    if (!apiKey || !apiUrl) {
      return new Response(
        JSON.stringify({ message: "API key or URL is missing in environment variables." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

  
    const response = await axios.get(apiUrl, {
      params: {
        q: query,
        appid: apiKey,
        units: "metric",
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Weather API Error:", error?.response?.data || error.message);

    return new Response(
      JSON.stringify({
        message: error.response?.data?.message || "Error fetching weather data",
      }),
      { status: error.response?.status || 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
