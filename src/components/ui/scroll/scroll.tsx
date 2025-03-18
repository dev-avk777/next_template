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
          <ScrollArea.Viewport className="w-full h-full" style={{ maxHeight }}>
            {children}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="touch-none select-none flex max-w-full max-h-full bg-dark-300 rounded-[2px] transition-colors"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-grow relative cursor-pointer bg-light-300 rounded-[2px] transition-colors hover:bg-light-300/90" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="touch-none select-none flex max-w-full max-h-full bg-dark-300 rounded-[2px] transition-colors"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="flex-grow relative cursor-pointer bg-light-300 rounded-[2px] transition-colors hover:bg-light-300/90" />
          </ScrollArea.Scrollbar>
        </div>
      </ScrollArea.Root>
    )
  }
)

Scroll.displayName = 'Scroll'
