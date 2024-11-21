import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const salt = "6f30fe2f285f82dae28f5d2294e12ee3"

export function hashPassword(password: string) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return hash
}

export function comparePassword(password: string, storedHash: string) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return hash === storedHash
}
