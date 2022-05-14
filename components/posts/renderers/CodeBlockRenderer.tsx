/* Disable a bunch of stuff because this isn't a react element, it's a function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { RenderFn } from 'editorjs-blocks-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark'

const CodeBlockRenderer: RenderFn<{}> = ({ data, className = '' }) => {
  return (
    <Highlight
      {...defaultProps}
      code={data.code}
      language={data.language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlockRenderer
