import { ItemsPerPage } from '../../vars';

export function getItemsPerPageOption(queryParam: string): number {
  switch (queryParam) {
    case ItemsPerPage._30:
      return Number(ItemsPerPage._30);
    case ItemsPerPage._60:
      return Number(ItemsPerPage._60);
    default:
      return Number(ItemsPerPage._15);
  }
}
