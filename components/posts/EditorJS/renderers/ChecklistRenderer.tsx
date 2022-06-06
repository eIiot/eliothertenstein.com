/* Disable a bunch of stuff because this isn't a react element, it's a function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { RenderFn } from 'editorjs-blocks-react-renderer'
import parse from 'html-react-parser'

const ChecklistRenderer: RenderFn<{
  items: { text: string; checked: boolean }[]
}> = ({ data, className = '' }) => {
  return (
    <>
      <p className={className}>
        {data?.items.map((item, i) => (
          // disable no-index-key because I don't have another option
          // eslint-disable-next-line react/no-array-index-key
          <label className="block" key={i}>
            <input checked={item.checked} readOnly type="checkbox" />{' '}
            {parse(item.text)}
          </label>
        ))}
      </p>
    </>
  )
}

export default ChecklistRenderer
