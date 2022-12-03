import { forwardRef, useImperativeHandle, useState } from 'react'

const Toggleable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibilty = () => setVisibility(!visibility)

  useImperativeHandle(refs, () => {
    return { toggleVisibilty }
  })

  return (
    <div>
      <button onClick={() => setVisibility(!visibility)}>
        {visibility ? 'cancel' : props.label}
      </button>
      <div style={{ display: `${visibility ? '' : 'none'}` }}>
        {props.children}
      </div>
    </div>
  )
})

export default Toggleable
