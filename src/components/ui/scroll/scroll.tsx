import * as ScrollArea from '@radix-ui/react-scroll-area'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

type ScrollbarType = ComponentPropsWithoutRef<typeof ScrollArea.Root> & {
  maxHeight?: number
}

export const Scroll = forwardRef<HTMLDivElement, ScrollbarType>(
  ({ children, type = 'auto', maxHeight, ...restProps }, ref) => {
    return (
      <ScrollArea.Root ref={ref} asChild type={type}>
        <div className="overflow-hidden" {...restProps}>
          <ScrollArea.Viewport className="h-full w-full" style={{ maxHeight }}>
            {children}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="bg-dark-300 flex max-h-full max-w-full touch-none select-none rounded-[2px] transition-colors"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-grow cursor-pointer rounded-[2px] bg-light-300 transition-colors hover:bg-light-300/90" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="bg-dark-300 flex max-h-full max-w-full touch-none select-none rounded-[2px] transition-colors"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="relative flex-grow cursor-pointer rounded-[2px] bg-light-300 transition-colors hover:bg-light-300/90" />
          </ScrollArea.Scrollbar>
        </div>
      </ScrollArea.Root>
    )
  }
)

Scroll.displayName = 'Scroll'
