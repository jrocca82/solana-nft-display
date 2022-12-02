import Link from "next/link"
import { ReactNode } from "react"

type ContentContainerProps = {
  children: ReactNode
}
const ContentContainer= ({children}: ContentContainerProps) => {
  return (
    <div className="flex-1 drawer h-52">
      {/* <div className="h-screen drawer drawer-mobile w-full"> */}
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" />
      <div className="items-center  drawer-content">{children}</div>

      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li>
            <h1>Menu</h1>
          </li>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/display">
              <a>Display NFT</a>
            </Link>
          </li>
          <li>
            <Link href="/candymachine">
              <a>Candy Machine</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContentContainer;
