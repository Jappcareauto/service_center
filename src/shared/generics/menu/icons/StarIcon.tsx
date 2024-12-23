import React from 'react'

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4395 2.8695L12.906 5.82675C13.106 6.23841 13.6393 6.63326 14.0893 6.70887L16.7473 7.15414C18.4471 7.43979 18.8471 8.68318 17.6222 9.90976L15.5558 11.9933C15.2058 12.3461 15.0142 13.0266 15.1224 13.5139L15.7141 16.0931C16.1807 18.1346 15.1058 18.9243 13.3143 17.8573L10.8229 16.3703C10.373 16.1015 9.63142 16.1015 9.17309 16.3703L6.68173 17.8573C4.89859 18.9243 3.81538 18.1262 4.28199 16.0931L4.87359 13.5139C4.98191 13.0266 4.79027 12.3461 4.4403 11.9933L2.37387 9.90976C1.15734 8.68318 1.54896 7.43979 3.24877 7.15414L5.90681 6.70887C6.34843 6.63326 6.8817 6.23841 7.08168 5.82675L8.54817 2.8695C9.34809 1.26486 10.6479 1.26486 11.4395 2.8695Z" fill="#FB7C37" />
    </svg>

  )
}

export default StarIcon