import axios from "axios";
import { NextResponse } from "next/server";

let resp = {};
export async function GET(request: Request) {
  return NextResponse.json({ message: "success", data: resp });
}
// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  const req = await request.json();
  //   data = req;
  //   if (req.old_record.up_vote) {
  //     return;
  //   }
  let url = "https://e8jy05dj.api.sanity.io/v2022-03-07/data/mutate/production";
  let token =
    "skjTzDOpoZFejZHz7PUnkQxAjhYF4XZtWgn8FsGqI3svHGN1G7b8j8DJeLmsp7CaC3HtyMr5jhjWui1jMG03dqel9wXhADtvQdlnZ5PfKNOUPI1NmlMCTIyMIRlgxtCN7P1guyP5aUN45j4AdkxiRUo5crLeNgp26Cu0LJb4GzSsnlNs4gjM";
  let data = {
    mutations: [
      {
        create: {
          _id: req.record.id,
          _type: "requests",
          response: req.record.response,
          request: req.record.request,
        },
      },
    ],
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  axios
    .post(url, data, config)
    .then((response: any) => {
      // Handle success
      resp = {
        response: response,
        record: req.record,
      };

      //       console.log("Response:", response.data);
    })
    .catch((error) => {
      resp = {
        error: error,
      };
    });

  return NextResponse.json({ message: "success" });
}
