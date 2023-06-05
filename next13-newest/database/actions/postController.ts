import { revalidatePath } from "next/cache";
import { connectDB } from "../mongodb";
import Post from "@/models/post";

connectDB();

export const createPost = async (data: any) => {
  try {
    const post = new Post(data);
    post.save();

    return {
      ...post._doc,
      _id: post._id.toString(),
    };
  } catch (err) {
    console.log("errorrrrrrrrrrrrrrrrrrrr", err);
    return {
      err,
    };
  }
};

export const getAllPosts = async (query: URLSearchParams) => {
  try {
    const conditions: any = {};

    const pageNumber = parseInt(query.get("page") as string) || 1;
    const pageSize = parseInt(query.get("limit") as string) || 10;

    if (query.has("title")) {
      conditions.title = {
        $regex: new RegExp(query.get("title") as string, "i"),
      };
    }

    if (query.has("status")) {
      conditions.status = query.get("status");
    }

    const totalItems = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);

    const posts = await Post.find(conditions)
      .sort({ createdAt: "asc" })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const resData = posts.map((post: any) => {
      return {
        ...post._doc,
        _id: post._doc._id.toString(),
      };
    });

    return {
      msg: "Get all posts successfully",
      total: totalPages,
      data: resData,
    };
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const getDetailPost = async (data: any) => {
  try {
    const data = await Post.find();
    return {
      data,
    };
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const updatePost = async (data: any) => {
  try {
    const { id } = data;
    delete data["id"];

    const res = await Post.findByIdAndUpdate(id, data, { new: true });

    revalidatePath("/");

    return {
      msg: "Updated successful",
      success: true,
      data: res,
    };
  } catch (err) {
    console.log("err", err);
    return {
      msg: "Updated failed",
      data: [],
      success: false,
    };
  }
};

export const deletePost = async (id: any) => {
  try {
    await Post.findByIdAndDelete(id);
    return {
      success: true,
      message: "Post was deleted",
    };
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};
