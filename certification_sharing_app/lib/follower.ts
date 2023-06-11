import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { Follower } from "../type/Follower.type";
import { sendRequest } from "./common";

export async function getFollowUsers(follow_id: string): Promise<Follower[]> {
  const param = {
    "follow_user": follow_id
  }

  const query = new URLSearchParams(param);

  const followers = await sendRequest<Follower[]>(`api/followers/?${query}`, "GET", false)
  return followers;
}

export async function getFollowedUsers(followed_id: string): Promise<Follower[]> {
  const param = {
    "followed_user": followed_id
  }

  const query = new URLSearchParams(param);

  const followers = await sendRequest<Follower[]>(`api/followers/?${query}`, "GET", false);
  return followers;
}

export async function getOwnFollowUsers(follow_id?: number, followed_id?: string): Promise<Follower[]> {
  const param = {
    "follow_user": follow_id,
    "followed_user": followed_id
  }

  const query = new URLSearchParams(param);

  const followers = await sendRequest<Follower[]>(`api/followers/?${query}`, "GET", false);
  return followers;
}

export async function addFollowUser(follow_id?: number, followed_id?: number) {
  const body = {
    body: JSON.stringify({
      "follow_user": follow_id,
      "followed_user": followed_id
    })
  }

  const followers = await sendRequest(`api/followers/`, "POST", true, body);
  return followers;
}

export async function deleteFollowUser(id: number) {
  const followers = await sendRequest(`api/followers/${id}`, "DELETE", true);
  return followers;
}