import { authenticate } from "@/lib/auth";

const baseUrl = "https://api.calendly.com";
const token = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzIxOTEzNDA1LCJqdGkiOiI5ZjdmZjJiNi1kZmUxLTQ5ZmYtODBhNy0zMzNkZjVlNGEyMGIiLCJ1c2VyX3V1aWQiOiJBQUFFUU9RUUpOU0lZUVJZIn0.WkcW3UekREfpnpcq7DepYmhUNYeBJ2-jSZ-11oTpeSA3Nc6VSx5I5Ot7qq38Vk1hCkCpZBC6XDUWTAP0ZVyOBQ'

export const POST = async (req: Request) => {
  try {
    const { user } = await authenticate();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { uri } = body;


    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}
};
