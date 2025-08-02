// Helper functions
const getUsers = () => {
  const users = localStorage.getItem('dummyUsers');
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem('dummyUsers', JSON.stringify(users));
};

// Initialize dummy data
const initializeDummyData = () => {
  if (!localStorage.getItem('dummyUsers')) {
    const initialUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'password123',
        token: 'fake-jwt-token-1'
      }
    ];
    saveUsers(initialUsers);
  }
};
initializeDummyData();

// Login function
export async function loginUser(email, password) {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) throw new Error('User not found');
    if (user.password !== password) throw new Error('Invalid password');
    
    const { password: _, ...userData } = user;
    return userData;
  } catch (ex) {
    console.error('Login error:', ex);
    throw ex;
  }
}

// Register function
export async function registerUser(firstName, lastName, email, phone, password) {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = getUsers();
    
    if (users.some(user => user.email === email)) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      phone,
      password,
      token: `fake-jwt-token-${users.length + 1}`
    };
    
    users.push(newUser);
    saveUsers(users);
    
    const { password: _, ...userData } = newUser;
    return userData;
  } catch (ex) {
    console.error('Registration error:', ex);
    throw ex;
  }
}

export default {
  registerUser,
  loginUser,
};
