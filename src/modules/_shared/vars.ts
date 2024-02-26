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

export const itemsPerPageOptions = [
  { label: ItemsPerPage._15, query: ItemsPerPage._15 },
  { label: ItemsPerPage._30, query: ItemsPerPage._30 },
  { label: ItemsPerPage._60, query: ItemsPerPage._60 },
];

export enum Unit {
  G = 'g',
  Kg = 'kg',
  Ml = 'ml',
  L = 'l',
  Unit = 'unit',
}