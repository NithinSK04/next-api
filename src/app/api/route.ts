import axios from "axios";
import { NextResponse } from "next/server";

let data = { record: { email: "nithin@nighthack.in" } };
// Handles GET requests to /api
export async function GET(request: Request) {
  //   // ...
  //   let url = "https://e8jy05dj.api.sanity.io/v2022-03-07/data/mutate/production";
  //   let token =
  //     "skjTzDOpoZFejZHz7PUnkQxAjhYF4XZtWgn8FsGqI3svHGN1G7b8j8DJeLmsp7CaC3HtyMr5jhjWui1jMG03dqel9wXhADtvQdlnZ5PfKNOUPI1NmlMCTIyMIRlgxtCN7P1guyP5aUN45j4AdkxiRUo5crLeNgp26Cu0LJb4GzSsnlNs4gjM";
  //   let postData = {
  //     mutations: [
  //       {
  //         create: {
  //           _id: crypto.randomUUID(),
  //           _type: "quiz",
  //           question:
  //             "new1 What aggregate evidence quality is assigned to randomized controlled trials that fail to show clinically important advantages of surgery over observation alone?",
  //           option1: "Grade A",
  //           option2: "Grade B",
  //           option3: "Grade C",
  //           correct: "Grade A",
  //         },
  //       },
  //     ],
  //   };

  //   // Set up the Axios request configuration
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   // Send the POST request using Axios
  //   axios
  //     .post(url, postData, config)
  //     .then((response) => {
  //       // Handle success
  //       console.log("Response:", response.data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(
  //         "Error:",
  //         error.response ? error.response.data : error.message
  //       );
  //     });
  return NextResponse.json({ message: "Hello World", data });
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  const req = await request.json();
  data = req;
  return NextResponse.json({ message: "Hello World" });
}
