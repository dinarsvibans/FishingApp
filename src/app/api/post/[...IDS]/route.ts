import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDb } from '../../../../../lib/mongodb';
import Fish from '../../../../../models/fishes';
import User from '../../../../../models/user';

interface Params {
  params: {
    IDS: string[];
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectMongoDb();
    console.log('params', params);

    const [singlePostUser, singlePost] = params.IDS; 

    const fish = await Fish.findById(singlePost);
    const user = await User.findById(singlePostUser);

    console.log('user', user)
    console.log('fish', fish)

    return NextResponse.json({ user, fish });
  } catch (error) {
    console.log(error);
  }
}
