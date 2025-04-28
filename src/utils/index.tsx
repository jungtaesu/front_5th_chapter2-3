export const highlightText = (text: string, highlight: string) => {
  if (!text) return null
  if (!highlight.trim()) {
    return <span>{ text } </span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => {
        if(regex.test(part)) {
          return <mark key={i}>{part}</mark>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}