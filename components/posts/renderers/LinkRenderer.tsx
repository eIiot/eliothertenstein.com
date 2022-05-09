/* Disable a bunch of stuff because this isn't a react element, it's a function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { RenderFn } from 'editorjs-blocks-react-renderer'
import Image from 'next/image'
import { useState } from 'react'

const LinkRenderer: RenderFn<{}> = ({ data, className = '' }) => {
  const [ratio, setRatio] = useState(16 / 9) // default to 16:9o

  return (
    <>
      <div className="rounded-lg shadow-lg">
        <a
          className="flex w-full flex-row"
          href={data.link}
          key={data.link}
          title={data.meta.title}
        >
          <Image
            alt={data.meta.title}
            className="flex-none rounded-lg"
            height={200 / ratio}
            layout="fixed"
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio(naturalWidth / naturalHeight)
            } // you can use "responsive", "fill" or the default "intrinsic"
            src={'/api/imageProxy/' + encodeURIComponent(data.meta.image)}
            width={200}
          />
          <div className="ml-3 flex flex-1 flex-col">
            <h3 className="text-xl font-bold text-gray-900">
              {data.meta.title}
            </h3>
            <p className="text-gray-700">{data.meta.description}</p>
          </div>
        </a>
      </div>
    </>
  )
}

export default LinkRenderer
