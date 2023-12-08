"use client"

import { useState } from "react";
import { Modal } from "../modal/Modal";
import { updateUser } from "../../../lib/actions/user.actions";
import { useRouter } from "next/navigation";

type SettingsPropsType = {
   email: string | undefined
}

export function Settings({ email }: SettingsPropsType) {

   const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="text-sm">
         <button className="pl-4 leading-6" onClick={() => setIsOpen(true)}>{'Настроить отображение датчиков >>'}</button>
         <Modal active={isOpen} setActive={setIsOpen}>
            <button onClick={() => {
               updateUser({ userId: '656f70e66c327de48fbf8ced', username: 'Updated with _id', name: 'UserName' });

               // getUser('')
               //    .then(res => console.log(res))

               router.push('/review')
            }}>click</button>
         </Modal>
      </div>
   )
}