import { RedditApiService } from "../../../service/RedditApiService";
export const dynamic = "force-dynamic"; // defaults to auto
export const runtime = "edge";
const USER_AGENT = "HackHarvard";
const AUTH_TOKEN = process.env.AUTH_TOKEN;
export async function GET(request: Request) {
  if (!AUTH_TOKEN) {
    return new Response("No auth token found", { status: 401 });
  }
  const REDDIT_SERVICE = new RedditApiService(AUTH_TOKEN, USER_AGENT);
  return new Response(
    JSON.stringify(await REDDIT_SERVICE.getSubredditPostsData("sibo"))
  );
}
