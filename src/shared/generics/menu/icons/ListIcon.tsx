import React from 'react'

const ListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 14.5C2 14.2239 2.22386 14 2.5 14H12.5C12.7761 14 13 14.2239 13 14.5C13 14.7761 12.7761 15 12.5 15H2.5C2.22386 15 2 14.7761 2 14.5ZM2.5 9C2.22386 9 2 9.22386 2 9.5C2 9.77614 2.22386 10 2.5 10H17.5C17.7761 10 18 9.77614 18 9.5C18 9.22386 17.7761 9 17.5 9H2.5Z" fill="currentColor" />
    </svg>
  )
}

export default ListIcon
