import axios from "axios";

export class Sanity {
  private projectId: string;
  private token: string;

  constructor() {
    this.projectId = "krawj3va";
    this.token =
      "skWedoYlxFd07JqCc4neqEHBdh19N4ZXgwLcDzwcaAOw0NusLyvA53m8hZ5sWTAvG1f4iFFYpcaAsVX5WOd0JevmvypqMjEq5bGq17gBpChUN7ekOfnDDzIkm70xtyRKKnlvoDPloDPHCj0tNTTGBZZlSJJpm5JkaB29XCkwCiJvrjUGWTzN"; // Corrected token assignment
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
      console.log("Record created successfully!");
      return resp;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
