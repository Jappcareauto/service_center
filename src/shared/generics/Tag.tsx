import { FC } from "react"

type Props = {
  tagText?:string
}
const Tag:FC<Props> = ({tagText}) => {
  return (
    <div className={"text-sm rounded-2xl px-3 py-2 bg-primaryAccent whitespace-nowrap text-primary"}>
      {tagText}
    </div>
  )
}

export default Tag
