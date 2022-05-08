import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
export const CodeBlock = ({
  text,
  language,
  ...rest
}: {
  text: string
  language: string
  [key: string]: any
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      showLineNumbers={false}
      useInlineStyles={false}
      wrapLongLines
      {...rest}
    >
      {text}
    </SyntaxHighlighter>
  )
}
