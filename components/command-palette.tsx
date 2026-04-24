"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  Building2,
  Compass,
  DollarSign,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  SEARCH_ENTRY_KIND_LABELS,
  SEARCH_ENTRY_KIND_ORDER,
  searchIndex,
} from "@/lib/search-index"
import { searchEntries } from "@/lib/search"
import type { SearchEntry, SearchEntryKind } from "@/lib/search"
import { CONTACT_EMAIL, CONTACT_PHONE, whatsappLink } from "@/lib/site-config"
import { cn } from "@/lib/utils"

interface CommandPaletteContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null)

/**
 * Reads the `open`/`setOpen` handles from the CommandPaletteProvider.
 *
 * Throws if called outside the provider — a developer-time mistake, not a
 * runtime concern. Keeps the API tiny: any component that wants to open
 * the palette just calls `useCommandPalette().setOpen(true)`.
 */
export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = useContext(CommandPaletteContext)
  if (!ctx) {
    throw new Error("useCommandPalette must be used inside <CommandPaletteProvider>")
  }
  return ctx
}

const KIND_ICONS: Record<SearchEntryKind, LucideIcon> = {
  program: GraduationCap,
  opportunity: DollarSign,
  business: Building2,
  page: Compass,
  action: Sparkles,
}

const KIND_ACCENT: Record<SearchEntryKind, string> = {
  program: "text-turquoise-600 bg-turquoise-50",
  opportunity: "text-green-600 bg-green-50",
  business: "text-coral-600 bg-coral-50",
  page: "text-amber-600 bg-amber-50",
  action: "text-purple-600 bg-purple-50",
}

const ACTION_ICONS: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  call: Phone,
  email: Mail,
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen((prev) => !prev), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
        return
      }
      // Slash opens the palette — a widely-used web pattern (GitHub, Linear).
      // Skip when the user is already typing in an input/textarea/select.
      if (event.key === "/") {
        const target = event.target as HTMLElement | null
        const tag = target?.tagName
        const editable = target?.isContentEditable
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || editable) {
          return
        }
        event.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle])

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandPaletteDialog open={open} onOpenChange={setOpen} />
    </CommandPaletteContext.Provider>
  )
}

function CommandPaletteDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (next: boolean) => void
}) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const grouped = useMemo(() => searchEntries(searchIndex, query, 6), [query])
  const hasResults = grouped.size > 0

  const handleSelect = useCallback(
    (entry: SearchEntry) => {
      onOpenChange(false)
      if (entry.href) {
        // Internal routes + hash anchors both go through next/router so the
        // back button behaves correctly even when navigating within the
        // homepage sections.
        router.push(entry.href)
        return
      }
      if (entry.action === "whatsapp") {
        window.open(whatsappLink(), "_blank", "noopener,noreferrer")
        return
      }
      if (entry.action === "call") {
        window.location.href = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`
        return
      }
      if (entry.action === "email") {
        window.location.href = `mailto:${CONTACT_EMAIL}`
      }
    },
    [onOpenChange, router],
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command
        // cmdk provides its own substring matcher, but it runs before our
        // accent-insensitive normalizer. Disabling it and supplying our own
        // ranked list keeps "microcreditos" and "microcréditos" equivalent.
        shouldFilter={false}
        label="Buscar en la plataforma"
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Busca un programa, convocatoria, municipio o acción…"
        />
        <CommandList className="max-h-[min(70vh,480px)]">
          {!hasResults && (
            <CommandEmpty>
              <div className="py-8 px-4 text-center">
                <Search className="h-8 w-8 mx-auto text-amber-400 mb-3" aria-hidden />
                <p className="text-sm font-medium text-amber-900">
                  No encontramos resultados para "{query}"
                </p>
                <p className="text-xs text-amber-600 mt-1.5">
                  Intenta con otra palabra o escríbenos por WhatsApp.
                </p>
              </div>
            </CommandEmpty>
          )}

          {SEARCH_ENTRY_KIND_ORDER.map((kind, index) => {
            const entries = grouped.get(kind)
            if (!entries || entries.length === 0) return null
            return (
              <div key={kind}>
                {index > 0 && <CommandSeparator />}
                <CommandGroup heading={SEARCH_ENTRY_KIND_LABELS[kind]}>
                  {entries.map((entry) => (
                    <ResultItem
                      key={entry.id}
                      entry={entry}
                      onSelect={() => handleSelect(entry)}
                    />
                  ))}
                </CommandGroup>
              </div>
            )
          })}
        </CommandList>

        <PaletteFooter />
      </Command>
    </CommandDialog>
  )
}

function ResultItem({
  entry,
  onSelect,
}: {
  entry: SearchEntry
  onSelect: () => void
}) {
  const KindIcon = KIND_ICONS[entry.kind]
  const ActionIcon = entry.action ? ACTION_ICONS[entry.action] : null
  const Icon = ActionIcon ?? KindIcon
  const accent = KIND_ACCENT[entry.kind]

  return (
    <CommandItem
      // `value` drives cmdk's focus/keyboard semantics even with filtering
      // disabled — it still needs a unique identifier per item.
      value={entry.id}
      onSelect={onSelect}
      className="gap-3 py-2.5"
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg shrink-0",
          accent,
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-amber-900 truncate">{entry.title}</p>
        {entry.subtitle && (
          <p className="text-xs text-amber-700 truncate">{entry.subtitle}</p>
        )}
      </div>
      {entry.meta && (
        <span className="shrink-0 text-[11px] font-medium text-amber-600 uppercase tracking-wide">
          {entry.meta}
        </span>
      )}
      {entry.href && (
        <ArrowUpRight
          className="h-3.5 w-3.5 text-amber-400 shrink-0"
          aria-hidden
        />
      )}
    </CommandItem>
  )
}

function PaletteFooter() {
  return (
    <div className="border-t bg-amber-50/40 px-3 py-2 flex items-center justify-between text-[11px] text-amber-700">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <span>navegar</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <Kbd>↵</Kbd>
          <span>abrir</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1">
          <Kbd>Esc</Kbd>
          <span>cerrar</span>
        </span>
      </div>
      <span className="hidden sm:inline text-amber-500">
        Consejo: escribe un municipio o categoría
      </span>
    </div>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center rounded border border-amber-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 shadow-sm min-w-[20px]">
      {children}
    </kbd>
  )
}

/**
 * Inline trigger button for the navigation bar.
 *
 * Reuses the provider's state, so the same component works as the opener
 * on desktop (a wide search-input-looking button with a ⌘K hint) and on
 * mobile (a compact icon-only affordance).
 */
export function CommandPaletteTrigger({
  variant = "input",
  theme = "light",
  className,
}: {
  variant?: "input" | "icon"
  theme?: "light" | "dark"
  className?: string
}) {
  const { setOpen } = useCommandPalette()
  const [shortcutLabel, setShortcutLabel] = useState<string | null>(null)

  useEffect(() => {
    if (typeof navigator === "undefined") return
    const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
    setShortcutLabel(isMac ? "⌘K" : "Ctrl K")
  }, [])

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar en la plataforma"
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors min-h-[44px] min-w-[44px]",
          theme === "dark"
            ? "text-white/90 hover:text-white hover:bg-white/10"
            : "text-foreground hover:text-primary hover:bg-muted",
          className,
        )}
      >
        <Search className="h-5 w-5" aria-hidden />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Buscar en la plataforma"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors min-h-[40px]",
        theme === "dark"
          ? "border-white/30 bg-white/10 text-white/90 hover:bg-white/20 hover:border-white/50"
          : "border-amber-200 bg-white/80 text-amber-700 hover:border-turquoise-400 hover:text-turquoise-700 hover:bg-white",
        className,
      )}
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden />
      <span className="hidden lg:inline pr-6">Buscar…</span>
      {shortcutLabel && (
        <kbd
          className={cn(
            "hidden lg:inline-flex items-center justify-center rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide",
            theme === "dark"
              ? "border-white/40 bg-white/10 text-white/80"
              : "border-amber-200 bg-amber-50 text-amber-800",
          )}
          aria-hidden
        >
          {shortcutLabel}
        </kbd>
      )}
    </button>
  )
}
