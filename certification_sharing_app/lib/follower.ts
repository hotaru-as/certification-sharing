import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { Follower } from "../type/Follower.type";
import { sendRequest } from "./common";

export async function getFollowUsers(follow_id: string): Promise<Follower[]> {
  const initValue: Follower[] = [{
    id: 0,
    followUser: 0,
    followedUser: 0,
    createdAt: ""
  }]

  const param = {
    "follow_user": follow_id
  }

  const query = new URLSearchParams(param);

  const followers = await sendRequest<Follower[]>(initValue, `api/followers/?${query}`, "GET", false)
  return followers;
}

export async function getFollowedUsers(followed_id: string): Promise<Follower[]> {
  const initValue: Follower[] = [{
    id: 0,
    followUser: 0,
    followedUser: 0,
    createdAt: ""
  }]

  const param = {
    "followed_user": followed_id
  }

  const query = new URLSearchParams(param);

  const followers = await sendRequest<Follower[]>(initValue, `api/followers/?${query}`, "GET", false);
  return followers;
}

export async function getOwnFollowUsers(follow_id: number, followed_id: number): Promise<Follower[]> {
  const initValue: Follower[] = [{
    id: 0,
    followUser: 0,
    followedUser: 0,
    createdAt: ""
  }]

  const param = {
    "follow_user": follow_id.toString(),
    "followed_user": followed_id.toString()
  }

  const query = new URLSearchParams(param);

  const followers = await sendRequest<Follower[]>(initValue, `api/followers/?${query}`, "GET", false);
  return followers;
}

export async function addFollowUser(follow_id?: number, followed_id?: number): Promise<Follower[]> {
  const initValue: Follower[] = [{
    id: 0,
    followUser: 0,
    followedUser: 0,
    createdAt: ""
  }]

  const body = {
    body: JSON.stringify({
      "follow_user": follow_id,
      "followed_user": followed_id
    })
  }

  const followers = await sendRequest<Follower[]>(initValue, `api/followers/`, "POST", true, body);
  return followers;
}

export async function deleteFollowUser(id: number): Promise<Follower> {
  const initValue: Follower = {
    id: 0,
    followUser: 0,
    followedUser: 0,
    createdAt: ""
  }

  const followers = await sendRequest<Follower>(initValue, `api/followers/${id}`, "DELETE", true);
  return followers;
}