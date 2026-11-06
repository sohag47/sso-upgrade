type TError = {
  error: Error & { digest?: string }
  reset: () => void
}
