export interface BadgeListProps {
  items: string[];
  default: string;
}

export interface BadgeListEmits {
  select: [value: string];
}
