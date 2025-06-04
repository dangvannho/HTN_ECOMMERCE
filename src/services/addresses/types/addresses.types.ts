export interface IAddress {
  _id?: string;
  userId?: string;
  fullname: string;
  phoneNumber: string;
  address: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  isDefault: boolean;
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
      value: string | boolean | undefined; // Cho phép value có thể là string hoặc boolean
  }
}
export interface AddressFormProps {
  formData: IAddressFormData;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isEditing: boolean;
}

export interface Province {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    districts: District[];
}

export interface District {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    wards: Ward[];
}

export interface Ward {
    name: string;
    code: number;
    division_type: string;
    codename: string;
}

export interface PopupdeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
