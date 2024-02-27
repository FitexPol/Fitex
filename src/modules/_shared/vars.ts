import { $t } from './utils/$t';

const _tShared = $t('_shared');

export enum HxRequestHeader {
  CurrentUrl = 'HX-Current-Url',
}

export enum HxResponseHeader {
  Location = 'HX-Location',
  Retarget = 'HX-Retarget',
  Reswap = 'HX-Reswap',
  TriggerAfterSwap = 'HX-Trigger-After-Swap',
}

export enum HxEvent {
  ShowModal = 'showModal',
  CloseModal = 'closeModal',
}

export enum SortQuery {
  NameAsc = 'name-asc',
  NameDesc = 'name-desc',
  CreationDateAsc = 'creationDate-asc',
  CreationDateDesc = 'creationDate-desc',
}

export const sortOptions = [
  { label: _tShared('_shared.sortLabels.nameAsc'), query: SortQuery.NameAsc },
  { label: _tShared('_shared.sortLabels.nameDesc'), query: SortQuery.NameDesc },
  { label: _tShared('_shared.sortLabels.creationDateAsc'), query: SortQuery.CreationDateAsc },
  { label: _tShared('_shared.sortLabels.creationDateDesc'), query: SortQuery.CreationDateDesc },
];

export enum ItemsPerPage {
  _15 = '15',
  _30 = '30',
  _60 = '60',
}

export const itemsPerPageOptions = Object.values(ItemsPerPage).map((value) => ({
  label: value,
  query: value,
}));

export enum Unit {
  Unit = '',
  G = 'g',
  Kg = 'kg',
  Ml = 'ml',
  L = 'l',
}
