import { MegaDropdown } from "./Megadropdown";
import { MegaDropdownCard } from "./MegadropdownCard";
import { MegaDropdownListItem } from "./MegadropdownListItem";
import type {
    MegaDropdownProps,
} from "./Megadropdown";
import type {
    MegaDropdownCardProps,
} from "./MegadropdownCard";
import type {
    MegaDropdownListItemProps,
} from "./MegadropdownListItem";

type CardItem = Omit<MegaDropdownCardProps, "onNavigate" | "className">;
type AsideItem = Omit<MegaDropdownListItemProps, "onNavigate" | "className">;

export interface CardMenuData {
    id: string;
    label: string;
    columns?: MegaDropdownProps["columns"];
    cards: CardItem[];
    aside?: AsideItem[];
}

interface CardMegaMenuProps {
    open: boolean;
    menu: CardMenuData;
    onNavigate?: () => void;
}

export function CardMegaMenu({ open, menu, onNavigate }: CardMegaMenuProps) {
    const { id, label, columns, cards, aside } = menu;

    return (
        <MegaDropdown
            open={open}
            id={id}
            label={label}
            columns={columns}
            aside={aside?.map((item) => (
                <MegaDropdownListItem key={item.title} {...item} onNavigate={onNavigate} />
            ))}
        >
            {cards.map((card) => (
                <MegaDropdownCard key={card.title} {...card} onNavigate={onNavigate} />
            ))}
        </MegaDropdown>
    );
}