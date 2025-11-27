import * as FormData from 'form-data';

export function transformToArray(value: any | any[]): any[] {
  if (!value) return value;
  if (Array.isArray(value)) {
    return value;
  } else if (typeof value == 'string' && value[0] === '[') {
    try {
      const array = JSON.parse(value);
      return Array.isArray(array) ? array : [array];
    } catch {
      return [value];
    }
  } else {
    return [value];
  }
}

export function transformToBoolean(value: any): boolean {
  if (value === undefined) return value;
  if (typeof value != 'boolean') {
    return value === 'true';
  } else {
    return value;
  }
}

export function transformToDate(value: any): Date {
  if (!value) return value;
  return new Date(decodeURIComponent(value));
}

export function compareAccountNumbers(
  accountNumberSlip: string,
  accountNumberDeposit: string,
): boolean {
  const sanitizedAccount = accountNumberSlip.replaceAll('-', '').toLowerCase();

  if (sanitizedAccount?.length !== accountNumberDeposit?.length) return false;

  for (let i = 0; i < sanitizedAccount?.length; i++) {
    if (
      sanitizedAccount[i] !== 'x' &&
      sanitizedAccount[i] !== accountNumberDeposit[i]
    ) {
      return false;
    }
  }

  return true;
}

export function objectToFormData(dto: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(dto).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value.toString());
    }
  });

  return formData;
}

export const objectToUrlEncoded = (data: Record<string, any>): string => {
  const form = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      form.append(key, value.toString());
    }
  });

  return form.toString();
};

export function slugify(value: string): string {
  if (!value) {
    return 'category';
  }

  const normalized = value
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  return normalized || 'category';
}

