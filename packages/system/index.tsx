import type { ReactNode } from "react"
import * as React from "react"

export function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details>
      <summary>{label}</summary>
      <p>{children}</p>
    </details>
  )
}
