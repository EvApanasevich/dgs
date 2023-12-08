import React from "react"
import "./Modal.css"

type PropsType = {
   active: boolean
   setActive: (active: boolean) => void
   children?: React.ReactNode
}

export const Modal: React.FC<PropsType> = (props) => {
   const { active, setActive, children } = props

   return (
      <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
         <div className={active ? "modal_content active" : "modal_content"}
            onClick={(e) => e.stopPropagation()}>
               {children}
         </div>
      </div>
   )
}