import React, { type SVGProps, type Ref, forwardRef, memo } from 'react'

const SvgTemplate = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
): React.ReactElement => (
  <svg ref={ref} fill="none" height="36" viewBox="0 0 36 36" width="36" {...props}>
    <path
      d="M18 3C9.716 3 3 9.716 3 18s6.716 15 15 15 15-6.716 15-15S26.284 3 18 3zm0 27c-6.627 0-12-5.373-12-12S11.373 6 18 6s12 5.373 12 12-5.373 12-12 12z"
      fill="currentColor"
    />
  </svg>
)

const ForwardRef = forwardRef(SvgTemplate)
const Memo = memo(ForwardRef)

export default Memo
