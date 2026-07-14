// src/Components/ClientPicker.tsx
import { useMemo, useState } from "react"
import { useLeadsTable } from "@/hooks/useLeadsTable"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import type { Lead } from "@/types/leads"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ArrowDown01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

interface ClientPickerProps {
    value: string | null   // lead_id terpilih
    onSelect: (lead: Lead) => void
}

export function ClientPicker({ value, onSelect }: ClientPickerProps) {
    const { data: leads } = useLeadsTable()
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    const wonLeads = useMemo(
        () => leads.filter((l) => l.status === 'closed' && l.close_reason === 'won'),
        [leads]
    )
    // Filter secara manual — kita nonaktifkan filter bawaan Base UI pakai filter={null}
    const filteredLeads = useMemo(() => {
        if (!query.trim()) return wonLeads
        const q = query.toLowerCase()
        return wonLeads.filter(l =>
            l.name.toLowerCase().includes(q) ||
            l.company.toLowerCase().includes(q)
        )
    }, [wonLeads, query])

    const selectedLead = wonLeads.find((l) => l.id === value)

    const handleSelect = (lead: Lead) => {
        onSelect(lead)
        setOpen(false)
        setQuery('')
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between font-normal"
                >
                    <span className={selectedLead ? "" : "text-muted-foreground"}>
                        {selectedLead ? `${selectedLead.name} — ${selectedLead.company}` : "Cari nama client (closed - won)..."}
                    </span>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <div className="p-2 border-b border-neutral-800 w-full">
                    <Input
                        autoFocus
                        placeholder="Ketik nama atau company..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="h-8"
                    />
                </div>
                <div className="max-h-64 overflow-y-auto p-1">
                    {filteredLeads.length === 0 ? (
                        <p className="text-sm text-neutral-500 text-center py-4">
                            Tidak ada client dengan status Closed (Won).
                        </p>
                    ) : (
                        filteredLeads.map((lead) => (
                            <button
                                key={lead.id}
                                type="button"
                                onClick={() => handleSelect(lead)}
                                className="w-full flex items-center justify-between gap-2 px-2 py-2 text-sm rounded-md hover:bg-neutral-800 cursor-pointer text-left"
                            >
                                <div className="flex flex-col min-w-0">
                                    <span className="text-neutral-200 truncate">{lead.name}</span>
                                    <span className="text-xs text-neutral-500 truncate">{lead.company}</span>
                                </div>
                                {lead.id === value && (
                                    <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-4 h-4 text-[#E8FF5A] shrink-0" />
                                )}
                            </button>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}