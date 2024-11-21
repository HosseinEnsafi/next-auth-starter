export const renderError = (error: unknown): { error: string } => {
  return {
    error: error instanceof Error ? error.message : "An error occurred",
  }
}
