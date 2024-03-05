import axios from "axios";
import { NextResponse } from "next/server";

let resp = {};
export async function GET(request: Request) {
  return NextResponse.json({ message: "success", data: resp || [] });
}

// Handles POST requests to /api
export async function POST(request: Request) {
  const req = await request.json();
  let url = "https://krawj3va.api.sanity.io/v2022-03-07/data/mutate/production";
  let token =
    "skWedoYlxFd07JqCc4neqEHBdh19N4ZXgwLcDzwcaAOw0NusLyvA53m8hZ5sWTAvG1f4iFFYpcaAsVX5WOd0JevmvypqMjEq5bGq17gBpChUN7ekOfnDDzIkm70xtyRKKnlvoDPloDPHCj0tNTTGBZZlSJJpm5JkaB29XCkwCiJvrjUGWTzN";
  let data = {
    mutations: [
      {
        create: {
          _id: req.record.id,
          _type: "requests",
          response: [req.record.response],
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

  await axios
    .post(url, data, config)
    .then((response: any) => {
      // Handle success
      resp = {
        response: response,
        record: req.record,
      };
    })
    .catch((error) => {
      // Handle error
      resp = {
        error: error.response ? error.response.data : error.message,
      };
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });

  return NextResponse.json({ message: "success", data: resp });
}