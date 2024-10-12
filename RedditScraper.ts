import axios from 'axios'

export class RedditScraper {
    private accessToken: string;
    private userAgent: string;

    constructor(accessToken: string, userAgent: string) {
        this.accessToken = accessToken;
        this.userAgent = userAgent;
    }

    async getSubredditPosts(subreddit: string, limit: number = 10): Promise<any[]> {
        try {
            const response = await axios.get(
                `https://oauth.reddit.com/r/${subreddit}/hot?limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                        'User-Agent': this.userAgent
                    },
                    params: {limit}
                }
            );
            return response.data.data.children;
        } catch (error) {
            console.error('Error fetching subreddit posts', error);
            return [];
        }
    }

    extractPostData(rawPosts: any[]): RedditPost[] {
        return rawPosts.map(post => ({
          id: post.data.id,
          title: post.data.title,
          author: post.data.author,
          score: post.data.score,
          num_comments: post.data.num_comments,
          created_utc: post.data.created_utc,
          url: post.data.url,
          selftext: post.data.selftext
        }));
    }

    async getSubredditPostsData(subreddit: string, limit: number = 10): Promise<RedditPost[]> {
        const rawPosts = await this.getSubredditPosts(subreddit, limit);
        return this.extractPostData(rawPosts);
    }
}

export interface RedditPost {
    id: string;
    title: string;
    author: string;
    score: number;
    num_comments: number;
    created_utc: number;
    url: string;
    selftext: string;
}