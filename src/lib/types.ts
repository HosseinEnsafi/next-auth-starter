// Login function
export type ActionResponse =
  | { error: string; success?: undefined }
  | { success: string; error?: undefined }
