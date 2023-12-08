"use server"

import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
   userId: string,
   username: string,
   name: string,
}

export async function updateUser({ userId, username, name }: Params): Promise<void> {
   connectToDB();

   await User.findOneAndUpdate(
      { name },
      {
         username: username.toLowerCase(),
         name,
      },
      { upsert: true }
   )
}

export async function getUser(userId: string) {
   try {
      connectToDB();

      return await User.findOne({ _id: userId })
   } catch (error: any) {
      throw new Error(`Failed: ${error.message}`)
   }
}