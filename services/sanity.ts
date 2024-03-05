import axios from "axios";

export class Sanity {
  private projectId: string;
  private token: string;

  constructor() {
    this.projectId = "krawj3va";
    this.token =
      "skWedoYlxFd07JqCc4neqEHBdh19N4ZXgwLcDzwcaAOw0NusLyvA53m8hZ5sWTAvG1f4iFFYpcaAsVX5WOd0JevmvypqMjEq5bGq17gBpChUN7ekOfnDDzIkm70xtyRKKnlvoDPloDPHCj0tNTTGBZZlSJJpm5JkaB29XCkwCiJvrjUGWTzN";
  }

  config() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    };
  }

  async createRecord(data: any) {
    try {
      const resp = await axios.post(
        `https://${this.projectId}.api.sanity.io/v2022-03-07/data/mutate/production`,
        data,
        this.config()
      );
      console.log(`Record created successfully with ID: ${resp.data.results[0].id}`);
      return resp;
    } catch (error: any) {
      if (error.response) {
        console.error(`Failed to create record: ${error.response.status} ${error.response.statusText}`);
        console.error(`Error details: ${error.response.data}`);
      } else {
        console.error(`Failed to create record: ${error.message}`);
      }
      throw error;
    }
  }
}