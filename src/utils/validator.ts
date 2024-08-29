interface errorType {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  country?: string;
  state?: string;
  address?: string;
  phone?: string;
  companyName?: string;
  companyId?: string;
  vehicleId?: string;
  password?: string;
  confirmPassword?: string;
  isValidPassword?: string;
  isPrivacyChecked?: string;
}

export class ValidatorClass {
  static instance = null;
  error: errorType = {};
  hasError: boolean = false;

  constructor() {}

  name(name: string): this {
    if (name.length < 3) {
      this.error.name = "Name is required and must be atleast 3 length";
      this.hasError = true;
    }
    return this;
  }

  firstName(name: string): this {
    if (name.length < 3) {
      this.error.firstName = "First Name is required and must be atleast 3 length";
      this.hasError = true;
    }
    return this;
  }

  lastName(name: string): this {
    if (name.length < 3) {
      this.error.lastName = "Last Name is required and must be atleast 3 length";
      this.hasError = true;
    }
    return this;
  }

  email(email: string): this {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
      this.error.email = "Invalid email";
    }
    return this;
  }

  password(password: string): this {
    if (!(password.length >= 8)) {
      this.error.password = "Password is invalid";
      this.hasError = true;
    }

    return this;
  }

  isValidPassword(input: string): boolean {
    // Regular expression for checking if the string contains at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input);

    // Regular expression for checking if the string contains at least one number
    const hasNumber = /\d/.test(input);

    // Regular expression for checking if the string contains at least one alphabet character
    const hasAlphabet = /[a-zA-Z]/.test(input);

    // Check length of the string
    const hasMinLength = input.length >= 8;

    // Return true if all conditions are met
    return hasSpecialChar && hasNumber && hasAlphabet && hasMinLength;
  }

  address(address: string): this {
    if (!address) {
      this.error.address = "Invalid address";
      this.hasError = true;
    }

    return this;
  }

  country(country: string): this {
    if (!country) {
      this.error.country = "Invalid country selected";
      this.hasError = true;
    }

    return this;
  }

  state(state: string): this {
    if (!state) {
      this.error.state = "Invalid state selected";
      this.hasError = true;
    }

    return this;
  }

  phone(phone: string): this {
    if (phone.length < 1) {
      this.error.phone = "Invalid state selected";
      this.hasError = true;
    }

    return this;
  }

  companyId(id: string): this {
    if (id.length < 1) {
      this.error.companyId = "Invalid company Id provided";
      this.hasError = true;
    }
    return this;
  }

  companyName(name: string): this {
    if (name.length < 3) {
      this.error.companyName = "Invalid company Id provided";
      this.hasError = true;
    }
    return this;
  }

  vehicleId(id: string): this {
    if (id.length < 1) {
      this.error.vehicleId = "Invalid vehicle Id provided";
      this.hasError = true;
    }
    return this;
  }

  isPrivacyChecked(value: boolean): this {
    if (!value) {
      this.error.isPrivacyChecked = "You must accept privacy policy";
      this.hasError = true;
    }
    return this;
  }

  confirmPassword(password: string, confirmPassword: string): this {
    if (password !== confirmPassword || confirmPassword.length < 1) {
      this.error.confirmPassword = "Password and confirm password must be equal";
      this.hasError = true;
    }
    return this;
  }

  validateTypeSafety(schema: any, data: any) {
    const typeResult = schema.safeParse(data);
    if (typeResult.success) {
      return data;
    } else {
      throw typeResult;
    }
  }
}

export const validatorInstance = new ValidatorClass();

export const checkZodTypeSafety = (schema: any, data: any) => {
  const typeResult = schema.safeParse(data);
  if (typeResult.success) {
    return data;
  } else {
    throw { message: "Response type does not match" };
  }
};
