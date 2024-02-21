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
