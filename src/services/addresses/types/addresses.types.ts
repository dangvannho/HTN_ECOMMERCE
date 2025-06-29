export interface IAddress {
  _id: string;
  userId?: string;
  fullname: string;
  phoneNumber: string;
  address: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  isDefault: boolean;
}

export interface IApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IAddressFormData {
  
  fullname: string;
  phoneNumber: string;
  address: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  isDefault: boolean;
}

export interface AddressCardProps {
  address: IAddress;
  onRefresh: () => void;
  onEdit: (address: IAddress) => void;
}

export interface AddressFormChangeEvent extends Omit<React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, 'target'> {
  target: {
      name: string;
      value: string | boolean;
  }
}

// Thêm interface mới để ép kiểu value thành boolean
export interface BooleanValueChangeEvent extends Omit<React.ChangeEvent<HTMLInputElement>, 'target'> {
  target: {
    name: string;
    value: boolean;
  }
}

// Hoặc tạo một utility type để tự động ép kiểu
export type TypedChangeEvent<T> = Omit<React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, 'target'> & {
  target: {
    name: string;
    value: T;
  }
}

// Sử dụng cho boolean
export type BooleanChangeEvent = TypedChangeEvent<boolean>;

// Sử dụng cho string  
export type StringChangeEvent = TypedChangeEvent<string>;

export interface AddressFormProps {
  formData: IAddressFormData;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBooleanChange?: (e: BooleanChangeEvent) => void; // Thêm prop mới cho boolean
  isEditing: boolean;
}

export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
}

export interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  wards: Ward[];
}

export interface Province {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    districts: District[];
}



export interface PopupdeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
