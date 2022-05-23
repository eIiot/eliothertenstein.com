/* Disable a bunch of stuff because this isn't a react element, it's a function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { RenderFn } from 'editorjs-blocks-react-renderer'

const LinkRenderer: RenderFn<{
  link: string
  meta: {
    title: string
    description: string
    image: string
  }
}> = ({ data }) => {
  return (
    <a
      className="flex h-fit flex-col rounded-lg border-neutral-600 bg-white text-left text-black transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-neutral-100"
      data-testid="container"
      href={data.link}
      rel="noreferrer"
      target="_blank"
    >
      <div
        className="h-[30vh] w-full rounded-t-lg bg-cover bg-center bg-no-repeat"
        data-testid="image-container"
        style={{
          backgroundImage: `url("${data.meta.image}"), url("https://i.imgur.com/UeDNBNQ.jpeg")`,
        }}
      />
      <div className="p-3">
        <h3 className="mt-0 mb-3 text-black" data-testid="title">
          {data.meta.title}
        </h3>
        <div className="hidden text-black lg:block">
          {data.meta.description}
        </div>
        <div className=" text-neutral-500">
          {data.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </div>
      </div>
    </a>
    // <LinkPreview
    //   className={className}
    //   explicitImageSrc={data.meta.image}
    //   url={data.link}
    // />
  )
}

export default LinkRenderer
