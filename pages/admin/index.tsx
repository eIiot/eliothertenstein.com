import Link from 'next/link'
import { useState } from 'react'

const Admin = () => {
  // a simple editor with a textarea. Submit the text to the database

  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState({
    content: {
      id: null,
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = e.currentTarget.elements.text.value
    const title = e.currentTarget.elements.title.value
    const id = e.currentTarget.elements.id.value

    fetch(`/api/posts/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content: text,
        published: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.error) {
          setSubmitSuccess({
            content: {
              id: null,
            },
          })
          setSubmitError('Error: ' + res.error.code)
        } else {
          setSubmitSuccess(res)
          setSubmitError('')
        }
      })
  }

  return (
    <div className="container">
      <div className="flex w-full flex-col px-12 py-10">
        <form onSubmit={handleSubmit} className=" space-y-3">
          <textarea name="text" className="h-60 w-full rounded-lg shadow-lg" />
          <div className="justify-left flex flex-row space-x-3">
            <div>
              <input type="text" name="title" className="mr-3 rounded-lg" />
              <label htmlFor="text">Text</label>
            </div>

            <div>
              <input type="text" name="id" className="mr-3 rounded-lg" />
              <label htmlFor="id">Id</label>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-lg py-1.5  px-2 shadow-lg ring-1 ring-black"
          >
            Submit
          </button>
        </form>
        <div className="text-red-500">{submitError}</div>
        <div
          className={
            'text-green-500' + submitSuccess.content.id !== null
              ? ''
              : ' hidden'
          }
        >
          <Link href={'/projects/' + submitSuccess.content.id}>
            View the post!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Admin
