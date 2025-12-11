import type { ReactNode } from "react"

interface ContainerProps {
    children: ReactNode
}

// const Container = ({ children }: ContainerProps) => {
//     return (
//         <div className="w-full max-w-screen-2xl mx-auto px-3 lg:px-6 pt-32 md:pt-20 lg:pt-20 pb-12">
//             {children}
//         </div>
//     )
// }

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="
      w-full
      mx-auto
      px-3 lg:px-6
      pt-32 md:pt-20 lg:pt-20 pb-12
      max-w-7xl
    ">
      {children}
    </div>
  );
};

export default Container

// 2xl:min-w-7xl   /* = 1280px (7xl equivalent) */
//       2xl:max-w-none
