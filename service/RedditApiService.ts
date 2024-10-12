// reddit api service
class RedditApiService {
  auth_token: string;
  constructor(auth_token: string) {
    this.auth_token = auth_token;
  }
  generateHeader() {
    return {
      Authorization: `bearer ${this.auth_token}`,
    };
  }
}
