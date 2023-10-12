'use client'
type NavProfileMenuTypeProps = {
   isOpen: boolean,
   setIsOpen: (isOpen: boolean) => void,
}

export function NavProfileMenu({ isOpen, setIsOpen }: NavProfileMenuTypeProps) {
   return (
      <div onMouseLeave={() => setIsOpen(false)} className={` ${isOpen ? `transform opacity-100 scale-100 transition ease-out duration-100` :
         `transform opacity-0 scale-95 transition ease-in duration-75`}
               absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 
               shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" 
               aria-orientation="vertical" aria-labelledby="user-menu-button`} >
         <a href={`/profile/${1}`} className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Your Profile</a>
         <a href="/settings" className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">Settings</a>
         <a href="#" className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Sign out</a>
      </div>
   )
}