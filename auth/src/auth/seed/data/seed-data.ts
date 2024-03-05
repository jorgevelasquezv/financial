interface SeedData {
  users: SeedUser[];
}

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'pperez@financial.com',
      fullName: 'Pedro Perez',
      password: 'Abc123456',
      roles: ['admin'],
    },
    {
      email: 'ccastro@financial.com',
      fullName: 'Carlos Castro',
      password: 'Abc123456',
      roles: ['user'],
    },
    {
      email: 'front@financial.com',
      fullName: 'Front Page',
      password: 'Abc123456',
      roles: ['user'],
    },
  ],
};
