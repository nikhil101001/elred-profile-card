import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const res = await axios.post(
      "https://dev.elred.io/noSessionProfileDetails?userCode=66961e8dcc9a8155d09b8c9b"
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
  }
}
