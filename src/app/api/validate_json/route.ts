import axios from "axios";
import { NextResponse } from "next/server";
import { Sanity } from "../../../../services/sanity";
import { v4 as uuidv4 } from "uuid";

let resp = {};
export async function GET(request: Request) {
  return NextResponse.json({ message: "success", data: resp || [] });
}

export async function POST(request: Request) {
  try {
    const sanity = new Sanity();
    const req = await request.json();
    if (req.record.status !== "FINISHED" || !req.record.json_content) {
      return NextResponse.json({
        message: "No content or status not finished",
      });
    }

    const entries = JSON.parse(req.record.json_content);
    if (!Array.isArray(entries)) {
      return NextResponse.json({ message: "Content is not an array" });
    }

    const promises = [];
    let payload;
    for (let i = 0; i < entries.length; i++) {
      if (req.record.type === "quiz" && entries[i]) {
        payload = {
          mutations: [
            {
              create: {
                _id: uuidv4(),
                _type: "quiz",
                question: entries[i].question,
                option1: entries[i].option1,
                option2: entries[i].option2,
                option3: entries[i].option3,
                option4: entries[i].option4,
                correct_answer: entries[i].correct_answer,
              },
            },
          ],
        };
      } else {
        payload = {
          mutations: [
            {
              create: {
                _id: uuidv4(),
                _type: "flashcards",
                title: entries[i].flashcard,
                description: entries[i].content,
              },
            },
          ],
        };
      }
      promises.push(sanity.createRecord(payload));
    }

    await Promise.all(promises);
    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error",
      error: error.message,
    });
  }
}