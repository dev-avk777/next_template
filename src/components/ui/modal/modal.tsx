import { Close } from '@/assets'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, forwardRef } from 'react'

export const ModalRoot = Dialog.Root

export type ModalContentProps = {
  children: ReactNode
  className?: string
  onCloseHandler?: () => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>

export const ModalContent = forwardRef<ElementRef<typeof Dialog.Content>, ModalContentProps>(
  ({ children, className, onCloseHandler, ...restProps }: ModalContentProps, ref) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fadeIn fixed inset-0 bg-white" />

        <Dialog.Content
          className={clsx(
            'animate-fadeIn fixed inset-0 z-50 flex flex-col items-center bg-white py-8',
            className
          )}
          {...restProps}
          ref={ref}
        >
          <Dialog.Title className="sr-only">Modal Title</Dialog.Title>
          <div className="relative flex w-full max-w-[28rem] flex-grow flex-col items-center justify-between px-6 text-center">
            <Dialog.Close
              aria-label="Close"
              className="absolute right-[40px] top-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={onCloseHandler}
            >
              <Close height={17.5} width={17.5} />
            </Dialog.Close>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    )
  }
)

ModalContent.displayName = 'ModalContent'

type ModalTriggerProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<typeof Dialog.DialogTrigger>

export const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <Dialog.DialogTrigger ref={ref} {...restProps} className="focus:outline-none">
        {children}
      </Dialog.DialogTrigger>
    )
  }
)
ModalTrigger.displayName = 'ModalTrigger'
