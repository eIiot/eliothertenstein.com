interface SearchProps {
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = (props: SearchProps) => {
  const { onInput } = props
  return (
    <input
      className="z-10 mb-2 inline-block h-[52px] flex-1 rounded-md bg-transparent p-2 text-2xl outline-none ring-2 ring-neutral-100"
      onInput={onInput}
      type="text"
    />
  )
}

export default Search
