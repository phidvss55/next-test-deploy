import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "@/database/actions/postController";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const res = await getAllPosts(searchParams);

  return NextResponse.json(res, { status: 200 });
};

export const POST = async (req: Request) => {
  const data = await req.json();
  const res = await createPost(data);

  return NextResponse.json({ msg: "POST", data: res }, { status: 200 });
};

export const PUT = async (req: Request) => {
  const dataDto = await req.json();
  const res = await updatePost(dataDto);

  return NextResponse.json(res, { status: 200 });
};

export const DELETE = async (req: Request) => {
  // const res = await deletePost()
  return NextResponse.json({ msg: "DELETE" }, { status: 200 });
};
