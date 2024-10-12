export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";

export async function POST(request: Request) {
  return new Response("Hello World");
}
