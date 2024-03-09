import { $t } from './utils/$t';
import { getEnvSecure } from './utils/getEnvSecure';

const _tShared = $t('_shared');

export const mongoUri = `mongodb+srv://${getEnvSecure('DB_USER')}:${getEnvSecure('DB_PASSWORD')}@cluster0.vx4xlsk.mongodb.net/${getEnvSecure('DB_NAME')}?retryWrites=true&w=majority`;

export enum HxRequestHeader {
  CurrentUrl = 'HX-Current-Url',
}

export enum HxResponseHeader {
  Location = 'HX-Location',
  Retarget = 'HX-Retarget',
  Reswap = 'HX-Reswap',
  Trigger = 'HX-Trigger',
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
