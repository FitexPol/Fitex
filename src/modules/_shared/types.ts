import { type TObject } from '@sinclair/typebox/build/require/type/object';
import { type TOptional } from '@sinclair/typebox/build/require/type/optional';
import { type TString } from '@sinclair/typebox/build/require/type/string';
import { type t } from 'elysia';
import type { Document, HydratedDocument, PopulatedDoc, Types } from 'mongoose';

import { type ProductDoc } from './models/product';

export type Populated<T> = PopulatedDoc<Document<Types.ObjectId> & T>;
export type Entity = HydratedDocument<{ name: string; products: ProductDoc[]; isVisible: boolean }>;

export type PropsWithClass<T = unknown> = { class?: string } & T;

export type SortOption<T> = {
  label: string;
  value: T;
};

export type Datalist = {
  id: string;
  options: string[];
};

export type Tab = {
  href: string;
  label: string;
  component: JSX.Element;
};

export type BasePath = 'meals' | 'shopping-lists';

export type DTOField = TString | TOptional<TString>;
export type DTO = TObject<Record<string, DTOField>>;
export type Query<T extends DTO> = Partial<Record<keyof T['properties'], string>>;
export type TStringOptions = Parameters<typeof t.String>[0];

export type FormControlProps<T extends DTO> = {
  dto: T;
  name: keyof T['properties'];
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
};

export type FormErrors<T extends DTO> = Partial<Record<keyof T['properties'], string>>;
