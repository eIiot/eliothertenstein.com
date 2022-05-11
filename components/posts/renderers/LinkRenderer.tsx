/* Disable a bunch of stuff because this isn't a react element, it's a function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { RenderFn } from 'editorjs-blocks-react-renderer'

const LinkRenderer: RenderFn<{}> = ({ data, className = '' }) => {
  return (
    <a
      className="Container border-neutral-600 bg-white"
      data-testid="container"
      href={data.link}
      rel="noreferrer"
      target="_blank"
    >
      <div
        className="Image"
        data-testid="image-container"
        style={{
          backgroundImage: `url("${data.meta.image}"), url("https://i.imgur.com/UeDNBNQ.jpeg")`,
        }}
      />
      <div className="LowerContainer">
        <h3 className="Title text-black" data-testid="title">
          {data.meta.title}
        </h3>
        <div className="Description text-black">{data.meta.description}</div>
        <div className="Secondary SiteDetails text-gray-500">
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
