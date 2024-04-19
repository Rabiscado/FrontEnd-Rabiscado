"use client";
type GetStorageInput = {
  key: string
}
export type GetStorage = <T = unknown>(input: GetStorageInput) => T

type SetStorageInput = {
  key: string
  value: unknown
}
export type SetStorage = (input: SetStorageInput) => void

type RemoveStorageInput = {
  key: string
}
export type RemoveStorage = (input: RemoveStorageInput) => void


export const get: GetStorage = ({ key }) => {
  if (typeof window === "undefined") {
    return;
  }
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

export const set: SetStorage = ({ key, value }) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove: RemoveStorage = ({ key }) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
};
