import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Handle GET request for a specific service center by its ID
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params; // Get the dynamic ID from the URL
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  try {
    const config = {
      method: 'get',
      url: `${process.env.API_URL}service-center/${id}`, // Append the `id` to the URL
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const sender = await axios(config);
    return new NextResponse(
      JSON.stringify(sender.data), { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(error), { status: 500 }
    );
  }
};

// Handle POST request for creating a new service center (already in your code)
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { ownerId, latitude, name, longitude, description, category } = body;
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  var data = JSON.stringify({
    "name": `${name}`,
    "ownerId": `${ownerId}`,
    "location": {
      "latitude": latitude,
      "longitude": longitude,
      "description": `${description}`,
    },
    "category": `${category}`,
  });

  try {
    var config = {
      method: 'POST',
      url: process.env.API_URL + 'service-center',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    };
    const sender = await axios(config);
    return new NextResponse(
      JSON.stringify(sender.data), { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(error), { status: 500 }
    );
  }
};
