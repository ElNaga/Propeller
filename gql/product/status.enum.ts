import { registerEnumType } from '@nestjs/graphql';

export enum Status {
    active = 'active',
    inactive = 'inactive',
}

registerEnumType(Status, {
    name: 'Status',
  });